/* This script is meant to be used with the generic inline chatwidget showing both
 * 1-1 rooms and group rooms.
 */
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
    var chatButton = $('#join-chat.inline');
    var chatReady = false;
      
    // Updates the actual status text.
    var updateDisplay = function (attributes) {
    
      switch (chatType) {
        case "pairChat":
          // If chat is open and there are active one-to-one rooms (chat open).
          if (chatStatus.chatOpen && chatStatus.rooms && chatStatus.rooms.pair.active > 0) {
            chatButton.html('g&aring; til ' + chatName).removeClass('chat-busy chat-closed').addClass('chat-open');
            chatReady = true;
          }
          else {
            chatReady = false;
          }
          break;
        case "groupChat":
          // If chat is open and there are active group rooms (chat open).
          if (chatStatus.chatOpen && chatStatus.roomsList && chatStatus.roomsList.length) {
            chatButton.html('g&aring; til ' + chatName).removeClass('chat-busy chat-closed').addClass('chat-open');
            chatReady = true;
          }
          else {
            chatReady = false;
          }
          break;
        case "combinedChat":
          console.log('combinedchat...');
          // To be implemented
          break;
        default:
          console.log('Error: No chattype defined.');
      }
      if  (!chatReady) {
        // The chat app is not initialized yet
        if ($.isEmptyObject(chatStatus)) {
          chatButton.html('Loading ' + chatName).removeClass('chat-open chat-closed').addClass('chat-busy');
        }
        // If not, it might be busy? Check if chat app is turned on (chat busy).
        else if (chatStatus.chatOpen) {
          chatButton.html(chatName + ' er optaget').removeClass('chat-open chat-closed').addClass('chat-busy');
        }
        // The chat app not turned on or is not initialized / unreachable (no now.js).
        else if (chatStatus === 'undefined' || !chatStatus.chatOpen){
          chatButton.html(chatName + ' er lukket').removeClass('chat-open chat-busy').addClass('chat-closed');
          // console.log('Chat app is not turned on or chatStatus is undefined, chatStatus: ', chatStatus);
        }
        else {
          chatButton.html('ERROR').removeClass('chat-open chat-busy').addClass('chat-closed');
          console.log('Error - chatStatus: ', chatStatus);
        } 
      }
    };

    // When the document is ready, update the status, and bind the event
    // to have it update automatically later.
    $(window).bind('opekaChatStatusUpdate', updateDisplay);

    /* When the user clicks the button, ask the chat server to join a room 
     - double checking that theres still a room for the client.
     @todo: we need at way of 
     a) checking for available spots in open group rooms 
     b) checking whether the open group rooms are paused and 
     c) make the chat widget reflect this
    */
    chatButton.click(function (e) {
      if ((chatType === "pairChat" && chatStatus.chatOpen && chatStatus.rooms && chatStatus.rooms.pair.active > 0) || (chatType === "groupChat" && chatStatus.chatOpen && chatStatus.roomsList && chatStatus.roomsList.length)) {
        
        if(!$.browser.opera){
          var w = open_window('_blank', baseURL+'/opeka', 600, 700);
        } else {
          window.parent.location = baseURL+'/chat-on-opera';
        }
        
        switch (chatType) {
          case "pairChat":
            now.getDirectSignInURL('pair', function (signInURL) {
              if (!(chatStatus.rooms && chatStatus.rooms.pair.active > 0) && !(chatStatus.rooms && chatStatus.rooms.pair.full > 0)) {
                w.close();
                window.location = baseURL;
              }
              else {
                w.location = signInURL;
              }
            });
            break;
          case "groupChat":
          // @todo: Maybe we should provide a direct login to a group room??
            if (!(chatStatus.chatOpen && chatStatus.roomsList && chatStatus.roomsList.length)) {
              w.close();
              window.location = baseURL;
            }
            else {
              w.location = baseURL+'/opeka/signIn/groupChat';
            }
          break;
          case "combinedChat":
            // In this case we would need to see what type of room (pair or group) is available, before sending the user on his way...'
          break;
          default:
        }
      
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
