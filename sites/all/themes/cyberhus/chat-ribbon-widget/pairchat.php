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
      $('#join-pair-chat').html('Alle r&aring;dgivere er optaget').removeClass('chat-open').addClass('chat-busy');
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
      <?php include_once "chatbar.php"; ?> 
  </div>
</body>
</html>