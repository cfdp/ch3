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
                  Drupal.behaviors.cim_chatSetupSingleChatAssets(function(err) {
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
  
  Drupal.behaviors.cim_chatAddListenerStatusById = function() {
    cmStatusByIdListener = function (event) {
      Drupal.behaviors.cim_chatStatusByChatIdsUpdated(event);
    };
    // Listen for updates from the list of chats we have embedded
    document.addEventListener("cmStatusByChatIdsUpdatedEvent", cmStatusByIdListener, true);
  };

  Drupal.behaviors.cim_chatSetupSingleChatAssets = function(callback) {
    if (typeof cm_InitiateChatStatus === "undefined") {
      var errorMsg = 'External CIM script could not be loaded.';
      callback(errorMsg);
      return;
    }
    // Add iframe for the cim chat
    $.get("/sites/all/modules/custom/cim_chat/templates/panel.html", function(data){
      if ($('#cim-mobility-chat')[0]) {
        // Assets already present
        callback(null);
        return;
      }
      $('body').append('<div id="cim-mobility-chat"></div>');
      $("#cim-mobility-chat").html(data);
      // Add event listeners once the dom elements are in place
      cimChatIntegration.cim_chatSetupSingleChatListeners();
      callback(null);
      return;
    })
      .fail(function() {
        callback('CIM chat panel html file could not be loaded.');
      });
  };
  
  Drupal.behaviors.cim_chatStatusByChatIdsUpdated = function (event) {
    var object = event.detail;
    cimChatStatus = 'closed';
    if (object) { 
      object.forEach(cimChatIntegration.statusByIdHandler);
      // The Opeka Widgets module is listening to this event
      $( document ).trigger( "cimChatUpdate", [ cimChatStatus ] );
    }
  };

  /* 
   * Handle button click
   * Initiate chat client if chat is ready
   */
  Drupal.behaviors.cim_chatHandleChatBtnClick = function (event) {
    console.dir(event.data.id);
    var id = event.data.id,
      btnId = '.' + cimChats[id].cssClassName,
      status = $(btnId).attr('data-chat-status');

    if (status === 'Ready') {
      Drupal.behaviors.cim_chatSingleChatInit(id);
    }
  };

  /*
   * Remove statusById assets and start a chat
   */
  Drupal.behaviors.cim_chatSingleChatInit = function(id) {
    // Remove the listener for StatusById as it interferes with single chat mode
    cimChatIntegration.removeChatEventListeners('statusById');
    $('.iframeWrapper.cim-status').remove();
    Drupal.behaviors.cim_chatButtonUpdate(id);
    // Initiate chat (puts user in queue)
    Drupal.behaviors.cim_chatSetupSingleChatAssets(function(err) {
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
        Drupal.behaviors.cim_chatSingleChatStatusUpdate();
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
    Drupal.behaviors.cim_chatButtonUpdate(cm_chatId);
    $(cm_chatId.cssClassName + ' .cim-dot').hide();
    cm_chatId = null;
    cimChatIntegration.setupStatusByIdAssets();
  };

  Drupal.behaviors.cim_chatButtonUpdate = function(id) {
    var btnId = cimChats[id]
        ? ('.' + cimChats[id].cssClassName)
        : '',
      statusText = '',
      dataChatStatus = 'Ready',
      queueNumber = '';
    if (!cm_QueueStatus && (cm_status === 'Activ' || cm_status === 'NotLoaded' )) {
      // Show the fetching state animation until we get the queue status
      $(btnId + ' .cim-dot').css('display', 'inline-block');
    }
    if (cm_QueueStatus === 'Waiting') {
      statusText = Drupal.t(': queue #');
      queueNumber = cm_QueueNumber;
      dataChatStatus = 'Queue';
      $(btnId + ' .cim-dot').hide();
    }
    else if (cm_QueueStatus === 'Ready') {
      statusText = Drupal.t(': chatting');
      queueNumber = '';
      dataChatStatus = 'Chatting';
      $(btnId + ' .cim-dot').hide();
    }
    $(btnId).attr('data-chat-status', dataChatStatus);
    $(btnId + ' .queue-status').text(statusText);
    $(btnId + ' .queue-number').text(queueNumber);
  } 

  Drupal.behaviors.cim_chatSingleChatStatusUpdate = function (event) {
    console.dir(event);
    var id = ((cm_chatId === undefined) || (cm_chatId === 0)) ? null : cm_chatId,
        btnId = cimChats[id] ? '.' + cimChats[id].cssClassName : '',
        longName = cimChats[id] ? cimChats[id].longName : '';

    if (event && event.detail.approvalattempt) {
      if (event.detail.approvalattempt == 1 || event.detail.approvalattempt == 2) {
          // Counselor takes the conversation - maximise chat window if needed
          //cimChatStatus =  'single-chat-active';
          console.log('approvalattemt: ', event.detail.approvalattempt);
      }
    }
    if (!cm_QueueStatus && cimChatStatus != 'single-chat-queue-signup' && cm_status === 'Activ' ) {
      // Start monitoring the queue position
      cimChatStatus = 'single-chat-queue-signup';
      cm_StartQueuTimer();
    }
    if (cm_status === 'Activ') {
      // show the minimize chat panel icon
      $('.cm-Chat-header-menu-left').css('display', 'inline');
    }
    if (cm_QueueNumber === 0 || cm_status === 'Ready') {
      cimChatStatus =  'single-chat-active';
    }
    if (cm_QueueNumber > 0 ) {
      // The moment the user enters the queue we 
      // - set the cimChatCookie
      // - hide the three dots fetching status animation 
      if (cimChatStatus === 'single-chat-queue-signup') {
        Drupal.behaviors.cim_chatSetCookie(cm_chatId);
        cimChatStatus = 'single-chat-queue';
        $(btnId + ' .cim-dot').hide();
        
      }
    }
    $( document ).trigger( "cimChatUpdate", [ cimChatStatus, longName, cm_QueueNumber ] );
    Drupal.behaviors.cim_chatButtonUpdate(cm_chatId);
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
