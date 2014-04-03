<!DOCTYPE html>
<html lang="da">
<head>
<meta http-Equiv="Cache-Control" content="no-cache" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-Equiv="Pragma" content="no-cache" />
<meta http-Equiv="Expires" Content="0" />
<title>CfDP Chat</title>
<link href='css/chat.widget.css' rel='stylesheet' type='text/css'>
<script type="text/javascript" src="https://code.jquery.com/jquery-1.7.2.min.js"></script>

<script>
// Remember that you can't rely on jQuery or now.js being available from the start

// Getting the basic connection parameters from the URL
getURLParameter = function (name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

var baseURL = getURLParameter("base_url") || "http://ch.cfdpchat.dk";
var port = getURLParameter("port") || "3007";

var poll;
var timeout = 50; // 5 seconds timeout

/**
 * Testing if now.js script is being loaded - if not, stop trying
 */
poll = function() {
  setTimeout(function () {
    timeout--;
    if (typeof now !== 'undefined') {
      // External source now.js loaded, time to load the chat status
      var chatstatus_script = document.createElement("script");
      chatstatus_script.type = "text/javascript";
      chatstatus_script.src = "js/chatstatus.js";
      document.body.appendChild(chatstatus_script);
      return;
    }
    else if (timeout > 0) {
      poll();
      $('#join-pair-chat').html('Loading..').removeClass('chat-open').addClass('chat-busy');
    }
    else {
      // External source now.js failed to load, stop trying...
      $('#join-pair-chat').html('ERROR').removeClass('chat-open').addClass('chat-closed');
      window.stop();
      console.log("now.js could not be loaded. Check if the Node server is running and verify port number.")
      return;
    }
  }, 50);
};

poll();

// Appending the now.js script to the DOM
$(document).ready(function() {
  var now_script = document.createElement("script");
  now_script.type = "text/javascript";
  now_script.src = baseURL + ":" + port + "/nowjs/now.js";
  document.body.appendChild(now_script);
});
</script>

</head>
<body>

<?php

// Chat times
$json = '
[
  {
    "Mon":
    [
      { "start": "1300", "finish": "1600", "type": "single" }
    ],

    "Tue":
    [
      { "start": "1300", "finish": "1600", "type": "single" },
      { "start": "1800", "finish": "2100", "type": "single" },
      { "start": "1800", "finish": "2100", "type": "group" }
    ],

    "Wed":
    [
      { "start": "1300", "finish": "1600", "type": "single" },
      { "start": "1800", "finish": "2100", "type": "single" },
      { "start": "1800", "finish": "2100", "type": "kram" }
    ],

    "Thu":
    [
      { "start": "1300", "finish": "1600", "type": "single" },
      { "start": "1800", "finish": "2100", "type": "single" },
      { "start": "1800", "finish": "2100", "type": "group" }
    ],

    "Fri":
    [
      { "start": "1300", "finish": "1600", "type": "single" }
    ]
  }
]';

// Decode JSON
$arr = json_decode($json);


// Set timezone and store current day and time
date_default_timezone_set('Europe/Copenhagen'); // Needed?
$currentDay = date("D");
$currentTime = date("H i");

// TEST VARIABLES
// $currentDay = "Tue";
// $currentTime = "10 32";

$openChat = false;
$counterActive = false;

?>
  <div class="status-wrapper">
      <?php

// Loop through the chat sessions of the current day
for($i = 0; $i < count($arr[0]->{$currentDay}); $i++) {
  // Convert and store start time
  $start = $arr[0]->{$currentDay}[$i]->{"start"};
  $start = date('H i', strtotime("$start"));
  // Convert and store finish time
  $finish = $arr[0]->{$currentDay}[$i]->{"finish"};
  $finish = date('H i', strtotime("$finish"));
  // Store chat type
  $type = $arr[0]->{$currentDay}[$i]->{"type"};

  $currentTime = preg_replace('/\s+/', '', $currentTime);
  $openingTime = preg_replace('/\s+/', '', $start);

  // Calculate amount of hours until chat session
  $currentHours = intval(substr($currentTime,0,2));
  $openingHours = intval(substr($openingTime,0,2));
  $timerHours = $openingHours - $currentHours - 1;

  // Calculate amount of minutes until chat session
  $currentMinutes = intval(substr($currentTime,2,4));
  $openingMinutes = intval(substr($openingTime,2,4));
  if($currentMinutes == 0){
    $timerHours = $timerHours + 1;
  };
  $currentMinutes = $currentMinutes + $currentHours * 60;
  $openingMinutes = $openingMinutes + $openingHours * 60;
  $timerMinutes = ($openingMinutes - $currentMinutes) % 60;


      // Output chatbar if needed
      if($currentTime >= $openingTime && $currentTime <= $finish && $type == "single"){
        echo '
          <a id="join-pair-chat" class="btn pairchat inline chat-open" href="#">Start chat med r&aring;dgiver</a>
          <div class="info">
            1-1 chatten er &aring;ben nu.
            <a class="sec-action" href="/chat" target="_parent">L&aelig;s mere</a>.
          </div>
          ';

        $openChat = true;
      } else if($currentTime < $start && $openChat == false && $type == "single" && $counterActive == false){
        // Output countdown
        echo '<div class="info sch-countdown">';
        ?>
        <script>
        outputCountdown();
        function outputCountdown(){
          if('<?php echo $timerHours; ?>' == 0){
            document.write('1-1 chatten &aring;bner om ' + '<?php echo $timerMinutes; ?>' + ' minuter.</span>');
          } else {
            document.write('1-1 chatten &aring;bner om ' + '<?php echo $timerHours; ?>' + ' timer og ' + '<?php echo $timerMinutes; ?>' + ' minuter.</span>');
          }
          var chatbar = document.getElementById("chatBar");
          chatbar.style.background = "none";
        }
        </script>
        <?php
        $counterActive = true;

        echo'
          <a class="sec-action" href="/chat" target="_parent">L&aelig;s mere om chat</a>.
          </div> <!-- .info -->
        ';
      }
    }
    ?>
  </div>

</body>
</html>