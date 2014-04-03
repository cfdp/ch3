/* This script is called when the connection to the chat server (now.js) has been established */
(function ($) {
  var chatStatus = {};

  // The following callback is called by the server in order to
  // advertise its status.
  now.updateStatus = function (attributes) {
    chatStatus = attributes;
    $(window).trigger('opekaChatStatusUpdate', [attributes]);
  };

  // When the DOM is ready, set up the widget.
  $(function () {
    var chatButton = $('#join-pair-chat.inline');

    // Updates the actual status text.
    var updateDisplay = function (attributes) {

     //For debugging...
      var debugchat = false;
      if (debugchat) {
        chatButton.hide();
        return;
      }

      // If chat is open and there are active one-to-one rooms (chat open).
      if (chatStatus.chatOpen && chatStatus.rooms && chatStatus.rooms.pair.active > 0) {
        chatButton.html('Start chat med r&aring;dgiver').removeClass('chat-busy chat-closed').addClass('chat-open');
      }
      // The chat app is not initialized yet
      else if ($.isEmptyObject(chatStatus)) {
        chatButton.html('Alle r&aring;dgivere er optaget').removeClass('chat-open chat-closed').addClass('chat-closed');
      }
      // If not, it might be busy? Check if chat app is turned on (chat busy).
      else if (chatStatus.chatOpen) {
        chatButton.html('Alle r&aring;dgivere er optaget').removeClass('chat-open chat-closed').addClass('chat-busy');
      }
      // The chat app not turned on or is not initialized / unreachable (no now.js).
      else if (chatStatus === 'undefined' || !chatStatus.chatOpen){
        chatButton.html('Alle r&aring;dgivere er optaget').removeClass('chat-open chat-busy').addClass('chat-closed');
        console.log('Chat app is not turned on or chatStatus is undefined, chatStatus: ', chatStatus);
      }
      else {
        chatButton.html('ERROR').removeClass('chat-open chat-busy').addClass('chat-closed');
        console.log('Error - chatStatus: ', chatStatus);
      }

     };

    // When the document is ready, update the status, and bind the event
    // to have it update automatically later.
    $(window).bind('opekaChatStatusUpdate', updateDisplay);

    // When the user clicks the button, ask the chat server to join a room.
    chatButton.click(function (e) {
      if (chatStatus.chatOpen && chatStatus.rooms && chatStatus.rooms.pair.active > 0) {

        if(!$.browser.opera){
          var w = open_window('_blank', baseURL+'/opeka', 600, 700);
        } else {
          window.parent.location = baseURL+'/chat-on-opera';
        }

        now.getDirectSignInURL('pair', function (signInURL) {
          if (!(chatStatus.rooms && chatStatus.rooms.pair.active > 0) && !(chatStatus.rooms && chatStatus.rooms.pair.full > 0)) {
            w.close();
            window.location = baseURL;
          }
          else {
            w.location = signInURL;
          }
        });

      }else{
        e.preventDefault();
      }

    });

    // Run updateDisplay once manually so we have the initial text
    // nailed down.
    updateDisplay();
  });
}(jQuery));

// Build pop-up window
function open_window(window_name,file_name,width,height) {
  parameters = 'width=' + width;
  parameters = parameters + ',height=' + height;
  parameters = parameters + ',status=no';
  parameters = parameters + ',resizable=no';
  parameters = parameters + ',scrollbars=no';
  parameters = parameters + ',menubar=no';
  parameters = parameters + ',toolbar=no';
  parameters = parameters + ',directories=no';
  parameters = parameters + ',location=no';

  vindue = window.open(file_name,window_name,parameters);
  return vindue;
}
