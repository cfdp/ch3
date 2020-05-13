var cimChatStatus; /* This status is used in the cimChatUpdate event and 
                    * in the Opeka Widgets module and can have the following values:
                    * - 'no-chats-defined': no cim chats defined in data.js
                    * - 'closed': all cim chats are closed
                    * - 'by-id-active': at least one chat is "Ready" or "Activ"
                    * - 'single-chat-queue': the user is queuing for chat
                    * - 'single-chat-queue-signup': the user is in the process of queuing for chat
                    * - 'single-chat-active': the counselor has "taken" the conversation
                    */ 

(function ($, Drupal) {
  var cimChats = {},
      chatServerURL,
      globalWidgetHost = location.protocol + '//' + location.hostname,
      globalWidgetDataURL = globalWidgetHost + '/cim-chat-json',
      cmStatusByIdListener;
  
  Drupal.behaviors.cim_chat = {
    attach: function (context, settings) {
      var testMode = Drupal.settings.cim_chat.cim_chat_test_mode_active ? true : false;
      chatServerURL = testMode
        ? "https://chattest.ecmr.biz"
        : "https://chat.ecmr.biz";

      // Add wrapper for widget to DOM and load widget once the external CIM chat script is loaded
      $('body', context).once('add-cim-widget', function () {
        $.getScript( chatServerURL + "/Scripts/chatclient/cm.chatclient.js" )
          .done(function( script, textStatus ) {
              // load overriding functions - we are using session storage, not local storage  
              cimChatIntegration.loadOverrides(globalWidgetHost, function(err, message) {
                if (err) {
                  console.error(err);
                  return
                }
                // Check if we have an ongoing chat session for this user
                var token = sessionStorage.getItem('cimChatSessionTokenValue');
                if (token) {
                  console.log('token value: ' + token);
                  cimChatIntegration.setupSingleChatAssets(function(err) {
                    if (err) {
                      console.error(err);
                      return;
                    }
                    // We get the id and try to start a chat session
                    // @todo - the id of the current chat should be stored (maybe it already is) in sessionStorage as a chat starts
                    // and here we retrieve it 
                    var id = "o3gaPVChkdyfiDgwGYvnNxj1Qwrtrp6i";
                    cimChatIntegration.fetchLocalChatList(globalWidgetDataURL, function(err, result) {
                      console.log('my result');
                      console.dir(result);
                      if (err) {
                        cimChatStatus = 'no-chats-defined';
                        return;
                      }


                      Drupal.behaviors.cim_chatStartChat(id, result.cimChats);
                    });
                    
                  });
                  return;
                }
                console.log('no session');
                // No ongoing chat session, so start watching status
                cimChatIntegration.setupStatusByIdAssets();
              });
            })
            .fail(function( jqxhr, settings, exception ) {
              console.error('External CIM chat script could not be loaded.');
          });
      });
    }
  };
  

  /*
   * Remove statusById assets and start a chat
   */
  Drupal.behaviors.cim_chatSingleChatInit = function(id) {
    // Remove the listener for StatusById as it interferes with single chat mode
    cimChatIntegration.removeChatEventListeners('statusById');
    $('.iframeWrapper.cim-status').remove();
    cimChatIntegration.globalButtonUpdate(id);
    // Initiate chat (puts user in queue)
    cimChatIntegration.setupSingleChatAssets(function(err) {
      if (err) {
        console.error(err);
        return;
      }
      Drupal.behaviors.cim_chatStartChat(id);
      return;
    });
  };

  Drupal.behaviors.cim_chatStartChat = function(id,hideChat) {
    console.log('id is '+ id);
    console.dir(cimChats);
    var chatTitle = cimChats[id] ? cimChats[id].longName : '';

    cm_InitiateChatClient(id, chatServerURL + '/ChatClient/Index');

    // Start chat if we are ready
    var i = 0;

    setTimeout(initiateChat, 500);

    function initiateChat() {
      if (cm_IsChatReady) {
        if (!hideChat) {
          cm_OpenChat();
        }
        $('.cim-chat-title').text(chatTitle);
        cimChatIntegration.singleChatStatusUpdate();
        return;
      }
      i++;
      if (i > 19 && !cm_IsChatReady) {
        console.warn('CIM chat could not be initiated in 20 attempts with increasing time intervals.');
        return;
      }
      setTimeout(initiateChat, 500*i);
      return;
    };
  };

  /**
   * Called when user closes chat. Deletes cookies to make sure
   * chat conversation can't be re-rendered.
   */
  Drupal.behaviors.cim_chatCloseConversation = function() {
    var closeBtn = '.cm-Chat-header-menu-right',
        longName = cm_chatId ? cimChats[cm_chatId].longName : '';
    
    if (cm_status === 'Ready') {
      // No conversation has taken place yet. 
      cm_CloseConversation();
      cm_HideChat();
    }
    if (cm_status === 'Activ') {
      if ($(closeBtn).attr('data-close-state') === 'first') {
        // At least one message has been sent. Initiate the closing of the chat.
        $(closeBtn).text('Slet');
        $(closeBtn).attr('data-close-state', 'second')
        cm_CloseConversation();
        return;
      }
    }
    // Close chat completely
    if ($(closeBtn).attr('data-close-state') === 'second') {
      cm_CloseConversation();
      cm_RefreshChat();
    }

    cimChatIntegration.clearChatSessionData();

    cimChatIntegration.removeChatEventListeners('singleChat');
    // Update ribbon widget immediately
    cimChatStatus = 'by-id-active';
    $( document ).trigger( "cimChatUpdate", [ cimChatStatus, longName, cm_QueueNumber ] );
    // Re-render chat, update button state and setup statusById updates
    cimChatIntegration.globalButtonUpdate(cm_chatId);
    $(cm_chatId.cssClassName + ' .cim-dot').hide();
    cm_chatId = null;
    cimChatIntegration.setupStatusByIdAssets();
  };

  /**
   * Set a cookie with id of the current chat. Used to reestablish chat when
   * reloading window.
   *
   * Inspired by Drupal.comment.getCookie().
   */
  Drupal.behaviors.cim_chatSetCookie = function(id) {
    var date = new Date();
    date.setDate(date.getDate() + 1); 
    // Remember for one day
    var cookie = "cim-chat=" + id + ";expires=" + date.toUTCString() + ";path=" + Drupal.settings.basePath;

    document.cookie = cookie;
  };

  /**
   * Check if a cookie has been set for the client
   *
   * Verbatim copy of Drupal.comment.getCookie().
   */
  Drupal.behaviors.cim_chatGetCookie = function(id) {
    var search = "cim-chat=";
    var returnValue = '';

    if (document.cookie.length > 0) {
      offset = document.cookie.indexOf(search);
      if (offset != -1) {
        offset += search.length;
        var end = document.cookie.indexOf(';', offset);
        if (end == -1) {
          end = document.cookie.length;
        }
        returnValue = decodeURIComponent(document.cookie.substring(offset, end).replace(/\+/g, '%20'));
      }
    }

    return returnValue;
  };

})(jQuery, Drupal);
