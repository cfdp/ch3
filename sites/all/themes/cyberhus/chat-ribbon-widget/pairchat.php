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
// $currentTime = "1430";

// Create chatbar wrapper
echo '<div id="chatBar">';

// Loop through the times of the current day

$openChat = false;
$counterActive = false;

for($i = 0; $i < count($arr[0]->{$currentDay}); $i++) {
  // Convert and store start time
  $start = $arr[0]->{$currentDay}[$i]->{"start"};
  $start = date('H i', strtotime("$start"));
  // Convert and store finish time
  $finish = $arr[0]->{$currentDay}[$i]->{"finish"};
  $finish = date('H i', strtotime("$finish"));
  // Store chat type
  $type = $arr[0]->{$currentDay}[$i]->{"type"};

  // JS timer
?>


<!DOCTYPE html>
<html lang="da">
<head>
<meta http-Equiv="Cache-Control" content="no-cache" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-Equiv="Pragma" content="no-cache" />
<meta http-Equiv="Expires" Content="0" />
<title>CfDP Chat</title>
<script type="text/javascript" src="https://code.jquery.com/jquery-1.7.2.min.js"></script>
<link href='css/chat.widget.css' rel='stylesheet' type='text/css'>

<script>
  // Countdown
  // Remove space and store current time and starting chat time
  var currentTime = '<?php echo $currentTime; ?>'.replace(/\s+/g, '');
  var openingTime = '<?php echo $start; ?>'.replace(/\s+/g, '');

  // Store hours
  var currentHours = parseInt(currentTime.substring(0,2));
  var openingHours = parseInt(openingTime.substring(0,2));
    // Calculate number of hours until chat session
  var timerHours = openingHours - currentHours - 1;

  // Store minutes
  var currentMinutes = parseInt(currentTime.substring(2,4));
  var openingMinutes = parseInt(openingTime.substring(2,4));
  // Exact hour fix
  if(currentMinutes == 0){
    timerHours = timerHours + 1;
  }
  // Calculate number of minutes until next chat session
    // Total amount of minutes of current hour
  currentMinutes = currentMinutes + currentHours * 60;
    // Total amount of minutes of chat hour
  openingMinutes = openingMinutes + openingHours * 60;
    // Calculate number of minutes until next chat session
  var timerMinutes = (openingMinutes - currentMinutes) % 60;
</script>

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
poll = function () {
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
      $('#join-pair-chat').html('Alle r&aring;dgivere er optaget').removeClass('chat-open').addClass('chat-closed');
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
  <div class="status-wrapper">
      <?php
      // Output chatbar if needed
      if($currentTime > $start && $currentTime < $finish && $type == "single"){
        echo '
          <a id="join-pair-chat" class="btn pairchat inline" href="#">Alle r&aring;dgivere er optaget</a>
          <div class="info">
            1-1 chatten er &aring;ben nu.
            <a target="_parent" class="sec-action" href="/chat">L&aelig;s mere</a>.
          </div>
          ';

        /*------------------------------------*/
          // CODE FOR MULTIPLE CHAT TYPES
          // echo '<div class="chatBar">';
          // if($type == "single"){
          //   echo 'Single chat is open';
          // } else if($type == "group"){
          // //   echo 'Group chat is open';
          // // } else if($type == "kram") {
          // //   echo 'KRAM chat is open';
          // // }
          // echo '</div>';
        /*------------------------------------*/

        $openChat = true;
      } else if($currentTime < $start && $openChat == false && $type == "single" && $counterActive == false){
        // Output countdown
        echo '<div class="info sch-countdown">';
        ?>
        <script>
          if(timerHours == 0){
            document.write('1-1 chatten &aring;bner om ' + timerMinutes + ' minuter.</span>');
          } else {
            document.write('1-1 chatten &aring;bner om ' + timerHours + ' timer og ' + timerMinutes + ' minuter.</span>');
          }
          var chatbar = document.getElementById("chatBar");
          chatbar.style.background = "none";
        </script>
        <?php
        $counterActive = true;

        echo'
          <a target="_parent" class="sec-action" href="/chat">L&aelig;s mere om chat</a>.
          </div> <!-- .info -->
        ';
      }
    }
    ?>
  </div>

</body>
</html>
