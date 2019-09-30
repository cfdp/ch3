var cimChats = cimChats || null, // Chat ids and names are fetched from a separate file (data.js)
    cimChatStatus; /* This status is used in the cimChatUpdate event and 
                    * in the Opeka Widgets module and can have the following values:
                    * - 'closed': all cim chats are closed
                    * - 'by-id-active': at least one chat is "Ready", "Activ" or "Busy"
                    * - 'single-chat-queue': the user is queuing for chat
                    * - 'single-chat-active': a conversation is ongoing
                    */ 

(function ($, Drupal, cimChats) {
  var cmStatusByIdListener,
      cmSingleChatStatusListener,
      cmUpdatePositionInQueueListener; // Listeners for event from the CIM chat server
  
  Drupal.behaviors.cim_chat = {
    attach: function (context, settings) {

      // Add wrapper for widget to DOM and load widget if the chat server is ready
      $('body', context).once('add-cim-widget', function () {

        // If our cim chat cookie and the cm_UniqueUserId cookie is set, 
        // the page has been reloaded during an ongoing chat
        // and we attempt to reestablish the conversation.
        var cimChatId = Drupal.behaviors.cim_chatGetCookie(),
            userIdCookie = cm_GetCookie('cm_UniqueUserId');

        if ((cimChatId && cimChatId != '') && userIdCookie) {
          Drupal.behaviors.cim_chatButtonUpdate(cimChatId);
          Drupal.behaviors.cim_chatSetupSingleChatAssets();
          Drupal.behaviors.cim_chatSetupSingleChatListeners();
          setTimeout(function () {
            // @todo: If we don't have a min 2 sec. delay for the assets and listeners to be added,
            // before starting the chat, the queueStatu will take a long time to update
            Drupal.behaviors.cim_chatCreateStatusButton(cimChatId, 'Queue');
            Drupal.behaviors.cim_chatStartChat(cimChatId, true);
          }, 2000);

          // We don't need to setup event listeners in this case
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
    cmSingleChatStatusListener = function (event) {
      Drupal.behaviors.cim_chatSingleChatStatusUpdate(event);
    };
    // Event listener for ongoing single chat queue status updates
    document.addEventListener("cmChatStatus", cmSingleChatStatusListener, true);  
  };

  Drupal.behaviors.cim_chatAddListenerCmUpdatePositionInQueue = function() {
    cmUpdatePositionInQueueListener = function (event) {
      Drupal.behaviors.cim_chatSingleChatStatusUpdate(event);
    };
    // Event listener for ongoing single chat queue status updates
    document.addEventListener("cmUpdatePositionInQueueEvent", cmUpdatePositionInQueueListener, true);  
  };

  Drupal.behaviors.cim_chatSetupStatusByIdAssets = function () {
    var keys = [],
        cimChatIds;
    if (!cimChats) {
      console.warn('Local CIM chat id data could not be loaded. Eventlistener not added.');
      return;
    }
    if ($('.iframeWrapper.cim-status')[0]) {
      // skip if already set up.
      return;
    }
    
    for (var key in cimChats) {
      if (cimChats.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    cimChatIds = keys.join(", ");
    cimChatIds = { chatIds: cimChatIds };

    // Get the status of the chats we are monitoring
    // Note: we don't support monitoring multiple serverURLs simultaneously (eg. test and production)
    setTimeout(function () {
      cm_InitiateChatStatus(cimChatIds, cimChats[key].chatServerURL + 'StatusIndex');
    }, 3000);
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
    });
  };
  
  Drupal.behaviors.cim_chatStatusByChatIdsUpdated = function (event) {
    object = event.detail;
    cimChatStatus = 'closed';
    if (object) { 
      object.forEach(Drupal.behaviors.cim_chatChatStatusHandler);
      // The Opeka Widgets module is listening to this event
      $( document ).trigger( "cimChatUpdate", [ cimChatStatus ] );
    }
  };

  Drupal.behaviors.cim_chatChatStatusHandler = function (item, index, arr) {
    var object = arr[index];
    var id = object.id;
    var status = object.status;
    var statusText = object.statusText;
    var btnId = '.'+id;
    // We set the cimChatStatus to 'by-id-active' if any of the chats are ready / busy / active.
    if (status === 'Ready' || status === 'Activ' || status === 'Busy') {
      cimChatStatus = 'by-id-active';
    }

    // Set status text. If status is closed, remove button
    if ($(btnId)[0]) { 
      if (status === 'Closed') {
        $(btnId).remove();
      }
      // 
      $(btnId + '.chat-status-title').text(cimChats[id].shortName);
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
    $(cimChats[id].domLocation).append('<div class="chat-status ' + id + '" data-chat-status="' + status + '">' + 
      '<span class="chat-status-title">' + cimChats[id].shortName + '</span><span class="queue-status"></span><span class="queue-number"></span>' +
      '<div class="cim-dot"><div class="dot-flashing"></div></div></div>');
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

    if (status === 'Ready') {
      // Remove the listener for StatusById as it interferes with single chat mode
      document.removeEventListener('cmStatusByChatIdsUpdated', cmStatusByIdListener);
      $('.iframeWrapper.cim-status').remove();
      // Initiate chat (puts user in queue)
      Drupal.behaviors.cim_chatSetupSingleChatAssets();
      Drupal.behaviors.cim_chatButtonUpdate(id);
      setTimeout(function () {
        Drupal.behaviors.cim_chatStartChat(id);
      }, 1000);
    }
  };

  Drupal.behaviors.cim_chatStartChat  = function(id,hideChat) {
    var chatTitle = cimChats[id].shortName;
    cm_InitiateChatClient(id, cimChats[id].chatServerURL + 'Index');
    // Add single chat status listeners
    Drupal.behaviors.cim_chatSetupSingleChatListeners();

    // Start chat if we are ready
    setTimeout(function () {
      if (cm_IsChatReady) {
        if (!hideChat) {
          cm_OpenChat();
        }
        $('.cim-chat-title').text(chatTitle);
        // Add event handlers for hiding and closing chat
        $( '.cm-Chat-header-menu-left' ).on('click', cm_HideChat);
        $( '.cm-Chat-header-menu-right' ).on('click', Drupal.behaviors.cim_chatCloseConversation);
        return;
      }
      console.warn('CIM chat could not be initiated in 2 seconds.');
    }, 2000);
  };

  /**
   * Called when user closes chat. Deletes cookies to make sure
   * chat conversation can't be re-rendered.
   */
  Drupal.behaviors.cim_chatCloseConversation = function() {
    var closeBtn = '.cm-Chat-header-menu-right';
    
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
    // Close chat completely and delete cookies
    if ($(closeBtn).attr('data-close-state') === 'second') {
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
    document.removeEventListener('cmChatStatus', cmSingleChatStatusListener);
    // Re-render chat, update button state and setup statusById updates
    Drupal.behaviors.cim_chatButtonUpdate(cm_ChatId);
    cm_ChatId = null;
    Drupal.behaviors.cim_chatSetupStatusByIdAssets();
  };

  Drupal.behaviors.cim_chatButtonUpdate = function(id) {
    var btnId = '.'+id,
      statusText = '',
      dataChatStatus = 'Ready',
      queueNumber = '';
    if (!cm_QueueStatus && cm_status === 'Activ') {
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
    var btnId = cm_ChatId ? '.' + cm_ChatId : null,
      shortName = cm_ChatId ? cimChats[cm_ChatId].shortName : '';

    if (!cm_QueueStatus && cimChatStatus != 'single-chat-queue-signup' && cm_status === 'Activ' ) {
      // Start monitoring the queue position
      cimChatStatus = 'single-chat-queue-signup';
      cm_StartQueuTimer();
    }
    if (cm_status === 'Activ') {
      // show the minimize chat panel icon
      $('.cm-Chat-header-menu-left').css('display', 'inline');
    }
    if (cm_QueueNumber === 0) {
      cimChatStatus =  'single-chat-active';
    }
    if (cm_QueueNumber > 0 ) {
      // The moment the user enters the queue we 
      // - set the cimChatCookie
      // - hide the three dots fetching status animation 
      if (cimChatStatus === 'single-chat-queue-signup') {
        Drupal.behaviors.cim_chatSetCookie(cm_ChatId);
        cimChatStatus = 'single-chat-queue';
        $(btnId + ' .cim-dot').hide();
        
      }
    }
    $( document ).trigger( "cimChatUpdate", [ cimChatStatus, shortName, cm_QueueNumber ] );
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

})(jQuery, Drupal, cimChats);
