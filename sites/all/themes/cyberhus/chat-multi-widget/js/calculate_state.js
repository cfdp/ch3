/**
 * This script makes the wrapper multi widget reflect the states of the embedded
 * chat widgets.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */
(function ($) {
  var chatStates = {}, // Object holding the state of the embedded chat services
    validOrigins = ['https://aarhus.curachat.com', 'https://kbh.curachat.com', 'https://rksk.curachat.com'],
    opekaMultiWidgetState = 'chat-busy';

  function searchObject(needle) {
    for (var prop in chatStates) {
      if (chatStates.hasOwnProperty(prop)) {
        if (chatStates[prop] === needle) {
          return true;
        }
        else {
          return false;
        }
      }
    }
  }

  function calculateMultiWidgetState() {
    if (searchObject('Open')) {
      // We have an active chat
      opekaMultiWidgetState = 'chat-open';

    } else if (searchObject('Occupied')) {
      // We have occupied chats
      opekaMultiWidgetState = 'chat-busy';
    } else {
      // All chats are closed
      opekaMultiWidgetState = 'chat-closed';
    }
    $('body').removeClass('chat-closed chat-busy chat-open').addClass(opekaMultiWidgetState);
  }

  /**
   * Recieves status messages from the embedded chat services
   * @param {Object} event
   */
  function receiveMessage(event) {
    if (validOrigins.indexOf(event.origin) !== -1) {
      // Update status of the messaging chat
      chatStates[event.origin] = event.data;
      calculateMultiWidgetState();
    } else {
      // The origin is not valid
      console.log("Bad window");
      return;
    }
  }

  window.addEventListener("message", receiveMessage, false);
}(jQuery));
