/**
 * Receive activate or deactive messages from the iframe
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */
(function ($) {
    window.addEventListener("message", receiveMessage, false);
    var opekaMultiWidgetState = "pending";
    function receiveMessage(event) {
      if (event.origin !== "https://dev.demo") {
        console.log("Bad window");
        return;
      }
      else {
        calculateWidgetState(event.data);
      }
    }
    
    function calculateWidgetState(stateShift) {
      if ( event.data == "Activate") {
        if (opekaMultiWidgetState == "pending" || opekaMultiWidgetState == "closed" ) {
          opekaMultiWidgetState = "available";
        }
      }
    }

}(jQuery));
