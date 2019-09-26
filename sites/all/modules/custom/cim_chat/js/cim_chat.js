var cimChatIds = cimChatIds || null, // Chat ids and names are fetched from a separate file (data.js)
    cimChatActive; // This status is used in the cimChatUpdate event and 
                   // in the Opeka Widgets module and indicates if any chats are busy, ready or active.

(function ($, Drupal, cimChatIds) {
  var cmStatusByIdListener,
      cmChatStatusListener,
      cmUpdatePositionInQueueListener; // Listeners for event from the CIM chat server
  
  Drupal.behaviors.cim_chat = {
    attach: function (context, settings) {

      // Add wrapper for widget to DOM and load widget if the chat server is ready
      $('body', context).once('add-cim-widget', function () {

        // If the cim chat cookie is set, the page has been reloaded during an ongoing chat
        // and we attempt to reestablish the conversation
        var cimChatId = Drupal.behaviors.cim_chatGetCookie();

        console.log('cookieval = ', cimChatId);

        if (cimChatId && cimChatId != '') {
          Drupal.behaviors.cim_chatButtonUpdate(cimChatId);
          Drupal.behaviors.cim_chatSetupSingleChatAssets();
          Drupal.behaviors.cim_chatSetupSingleChatListeners();
          setTimeout(function () {
            Drupal.behaviors.cim_chatCreateStatusButton(cimChatId, 'Queue');
            Drupal.behaviors.cim_chatStartChat(cimChatId);
          }, 2000);

          // We don't need to setup event listeners in this case
          // @todo: when ending chat, make sure the event listeners are set up correctly
          return;
        }

        // Add status by id iframe, listener etc.
        Drupal.behaviors.cim_chatSetupStatusByIdAssets();

      });
    }
  };

  Drupal.behaviors.cim_chatSetupSingleChatListeners = function () {
    // Event listener for ongoing single chat status updates
    Drupal.behaviors.cim_chatAddListenerCmChatStatus();

    // Event listener for ongoing single chat queue status updates
    Drupal.behaviors.cim_chatAddListenerCmUpdatePositionInQueue();
  };

  Drupal.behaviors.cim_chatAddListenerCmChatStatus = function() {
    cmChatStatusListener = function (event) {
      Drupal.behaviors.cim_chatChatStatusUpdate(event);
    };
    // Event listener for ongoing single chat queue status updates
    document.addEventListener("cmChatStatus", cmChatStatusListener, true);  
  };

  Drupal.behaviors.cim_chatAddListenerCmUpdatePositionInQueue = function() {
    cmUpdatePositionInQueueListener = function (event) {
      Drupal.behaviors.cim_chatChatStatusUpdate(event);
    };
    // Event listener for ongoing single chat queue status updates
    document.addEventListener("cmUpdatePositionInQueueEvent", cmUpdatePositionInQueueListener, true);  
  };

  Drupal.behaviors.cim_chatSetupStatusByIdAssets = function () {
    if (!cimChatIds) {
      console.warn('Local CIM chat id data could not be loaded. Eventlistener not added.');
      return;
    }
    if ($('.iframeWrapper.cim-status')[0]) {
      // skip if already set up.
      return;
    }
    console.log('setting up cim status iframe...');
    setTimeout(function () {
      cm_InitiateChatStatus(cimChatIds, 'https://chattest.ecmr.biz/ChatClient/StatusIndex');
    }, 1000);
    // Add the CIM status iframe and setup event listener
    $('body').append('<div class="iframeWrapper cim-status">' +
      '<iframe class="cm-Chat-container" src="" style="vertical-align:top;"></iframe></div>');

    Drupal.behaviors.cim_chatAddListenerStatusById();
  };
  
  Drupal.behaviors.cim_chatAddListenerStatusById = function() {
    cmStatusByIdListener = function (event) {
      Drupal.behaviors.cim_chatStatusByChatIdsUpdated(event);
    };
    // Listen for updates from the list of chats we have embedded
    document.addEventListener("cmStatusByChatIdsUpdated", cmStatusByIdListener, true);  
  };

  Drupal.behaviors.cim_chatSetupSingleChatAssets = function() {
    if (typeof cm_InitiateChatStatus === "undefined") {
      console.error('External CIM script could not be loaded.');
      return;
    }
    // Add iframe for the cim chat
    $.get("/sites/all/modules/custom/cim_chat/panel.html", function(data){
      if ($('#cim-mobility-chat')[0]) {
        console.warn('no assets added...');
        return;
      }
      $('body').append('<div id="cim-mobility-chat"></div>');
      $("#cim-mobility-chat").html(data);
      console.log("CIM single chat assets added.");
    });
  };
  
  Drupal.behaviors.cim_chatStatusByChatIdsUpdated = function (event) {
    object = event.detail;
    cimChatActive = false;
    if (object) { 
      console.log('trigger cimchatupdate, cimChatActive: ', cimChatActive);
      object.forEach(Drupal.behaviors.cim_chatChatStatusHandler);
      // The Opeka Widgets module is listening to this event
      $( document ).trigger( "cimChatUpdate", [ cimChatActive ] );
    }
  };

  Drupal.behaviors.cim_chatChatStatusHandler = function (item, index, arr) {
    var object = arr[index];
    var id = object.id;
    var status = object.status;
    var statusText = object.statusText;
    var btnId = '.'+id;
    console.log('ChatStatusHandler: ', btnId, status);
    // We set the cimChatStatus to 'active' if any of the chats are ready / busy / active.
    if (status === 'Ready' || status === 'Activ' || status === 'Busy') {
      cimChatActive = true;
    }

    // Set status text. If status is closed, remove button
    if ($(btnId)[0]) { 
      if (status === 'Closed') {
        $(btnId).remove();
      }
      // 
      $(btnId + '.chat-status-title').text(cimChatIds.shortNames[id]);
      $(btnId + ' .cim-dot').hide();
      $(btnId).attr('data-chat-status', status);
      return;
    }
    // Don't setup buttons in the closed state
    if (status === 'Closed') {
      return;
    }
    // Create status button
    Drupal.behaviors.cim_chatCreateStatusButton(id, status);
  };

  Drupal.behaviors.cim_chatCreateStatusButton = function(id, status) {
    var btnId = '.'+id;
    $('.cyberhus-chats').append('<span class="chat-status ' + id + '" data-chat-status="' + status + '">' + 
      '<span class="chat-status-title">' + cimChatIds.shortNames[id] + '</span><span class="queue-status"></span><span class="queue-number"></span>' +
      '<div class="cim-dot"><div class="dot-flashing"></div></div></span>');
    // Add click handler
    $( btnId ).on('click', {id: id}, Drupal.behaviors.cim_chatHandleChatBtnClick);
  };
  
  /* 
   * Initiate chat client and put user in queue
   */
  Drupal.behaviors.cim_chatHandleChatBtnClick = function (event) {
    var id = event.data.id,
      btnId = '.' + id,
      status = $(btnId).attr('data-chat-status');

    console.log('button clicked ', id, 'status ', status)

    if (status === 'Ready') {
      // Remove the listener for StatusById as it interferes with single chat mode
      document.removeEventListener('cmStatusByChatIdsUpdated', cmStatusByIdListener);
      $('.iframeWrapper.cim-status').remove();
      // Initiate chat (puts user in queue)
      Drupal.behaviors.cim_chatSetupSingleChatAssets();
      Drupal.behaviors.cim_chatButtonUpdate(id);
      setTimeout(function () {
        Drupal.behaviors.cim_chatStartChat(id);
      }, 2000);
    }
  };

  Drupal.behaviors.cim_chatStartChat  = function(id) {
    console.log('id is', id);
    var chatTitle = cimChatIds.shortNames[id];
    cm_InitiateChatClient(id, 'https://chattest.ecmr.biz/ChatClient/Index');
    // Add single chat status listeners
    Drupal.behaviors.cim_chatSetupSingleChatListeners();
    setTimeout(function () {
      // Start monitoring the queue position
      console.log('queue timer started...');
      cm_StartQueuTimer();
    }, 3000);

    // Start chat if we are ready
    setTimeout(function () {
      if (cm_IsChatReady) {
        cm_OpenChat();
        $('.cim-chat-title').text(chatTitle);
        // Add event handlers for hiding and closing chat
        $( '.cm-Chat-header-menu-left' ).on('click', cm_HideChat);
        $( '.cm-Chat-header-menu-right' ).on('click', Drupal.behaviors.cim_chatCloseConversation);
        Drupal.behaviors.cim_chatSetCookie(id);
        return;
      }
      console.warn('CIM chat could not be initiated in 4 seconds.');
    }, 4000);

  };

  /**
   * Called when user closes chat. Deletes cookies to make sure
   * chat conversation can't be re-rendered.
   */
  Drupal.behaviors.cim_chatCloseConversation = function() {
    var closeBtn = '.cm-Chat-header-menu-right';
    
    console.log('closing conversation, cm_status', cm_status);
    console.log('closing conversation, data-close-status', $(closeBtn).attr('data-close-state'))
    if (cm_status === 'Ready') {
      // No conversation has taken place yet
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
    // Close chat completely and delete cookies
    if ($(closeBtn).attr('data-close-state') === 'second') {
      console.log('closing conversation and refreshing');
      cm_CloseConversation();
      cm_RefreshChat();
    }
    $.cookie('cim-chat', null, { path: '/' });
    $('#cim-mobility-chat').remove();
    // Clear CIM data
    $.cookie('cm_UniqueUserId', null, { path: '/' });
    cm_QueueNumber = null;
    cm_QueueStatus = null;
    // Remove event listeners
    document.removeEventListener('cmUpdatePositionInQueueEvent', cmUpdatePositionInQueueListener);
    document.removeEventListener('cmChatStatus', cmChatStatusListener);
    // Re-render chat, update button state and setup statusById updates
    Drupal.behaviors.cim_chatButtonUpdate(cm_ChatId);
    cm_ChatId = null;
    Drupal.behaviors.cim_chatSetupStatusByIdAssets();
  };

  Drupal.behaviors.cim_chatButtonUpdate = function(id) {
    var btnId = '.'+id,
      statusText = '',
      dataChatStatus = 'Busy',
      queueNumber = '';
      console.log('cim_chatButtonUpdate cm_Queuestatus', cm_QueueStatus);
    if (!cm_QueueStatus) {
      //statusText = Drupal.t(': fetching status');
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

  Drupal.behaviors.cim_chatChatStatusUpdate = function (event) {
    var status = event.detail.status,
      btnId = cm_ChatId ? '.' + cm_ChatId : null;
    console.log('chatStatusUpdate, status', status)
    cimChatActive = true;
    $( document ).trigger( "cimChatUpdate", [ cimChatActive ] );
    if (btnId) {
      $(btnId + ' .cim-dot').hide();
    }
    else {
      console.warn('No btnId defined!');
    }
    Drupal.behaviors.cim_chatButtonUpdate(cm_ChatId);
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
    //var cookie = "opeka-widgets-declined-" + chatName + "=yes;path=" + Drupal.settings.basePath;

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

})(jQuery, Drupal, cimChatIds);
