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
// $currentTime = "1032";

$openChat = false;
$counterActive = false;

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

  // Strip spaces from time
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
    <a id="join-pair-chat" class="btn pairchat inline" href="#">Alle r&aring;dgivere er optaget</a>
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
      if('<?php echo $timerHours; ?>' == 0){
        document.write('1-1 chatten &aring;bner om ' + '<?php echo $timerMinutes; ?>' + ' minuter.</span>');
      } else {
        document.write('1-1 chatten &aring;bner om ' + '<?php echo $timerHours; ?>' + ' timer og ' + '<?php echo $timerMinutes; ?>' + ' minuter.</span>');
      }
      var chatbar = document.getElementById("chatBar");
      chatbar.style.background = "none";
    </script>
    <?php
    $counterActive = true;

    echo'
      <a class="sec-action" href="/chat" target="_parent">L&aelig;s mere om chat</a>.
      </div> <!-- .info -->
    ';
  }
}