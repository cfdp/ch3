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
      chatServerURL = "https://chattest.ecmr.biz",
      globalWidgetDataHost = location.protocol + '//' + location.hostname,
      cmStatusByIdListener,
      cmSingleChatStatusListener,
      cmUpdatePositionInQueueListener; // Listeners for event from the CIM chat server
  
  Drupal.behaviors.cim_chat = {
    attach: function (context, settings) {

      // Add wrapper for widget to DOM and load widget once the external CIM chat script is loaded
      $('body', context).once('add-cim-widget', function () {
        $.getScript( chatServerURL + "/Scripts/chatclient/cm.chatclient.js" )
          .done(function( script, textStatus ) {
              Drupal.behaviors.cim_chatSetupStatusByIdAssets();
            })
            .fail(function( jqxhr, settings, exception ) {
              console.error('External CIM chat script could not be loaded.');
          });
      });
    }
  };

  Drupal.behaviors.cim_chatSetupSingleChatListeners = function () {
    // Event listener for ongoing single chat status updates
    Drupal.behaviors.cim_chatAddListenerCmChatStatus();

    // Event listener for ongoing single chat queue status updates
    Drupal.behaviors.cim_chatAddListenerCmUpdatePositionInQueue();

    // Add event handlers for hiding and closing chat
    if (!$('.cm-Chat-header-menu-left')[0]) {
      console.warn('Error: Event listeners for chat panel items could not be added.');
    }
    $( '.cm-Chat-header-menu-left' ).on('click', function() {
      cm_HideChat();
      // We trigger an update to make sure the status is propagated
      // to the ribbon via the cimChatUpdate event
      Drupal.behaviors.cim_chatSingleChatStatusUpdate();
    });
    $( '.cm-Chat-header-menu-right' ).on('click', Drupal.behaviors.cim_chatCloseConversation);
  };

  Drupal.behaviors.cim_chatAddListenerCmChatStatus = function() {
    cmSingleChatStatusListener = function (event) {
      Drupal.behaviors.cim_chatSingleChatStatusUpdate(event);
    };
    // Event listener for ongoing single chat queue status updates
    document.addEventListener("cmChatStatusEvent", cmSingleChatStatusListener, true);
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
        cimChatIds,
        cimChatIdsObj;

    // Get our local CIM chat data from the JSON feed generated by the Cyberhus CMS
    fetch(globalWidgetDataHost + '/cim-chat-json')
      .then(res => res.json())
      .then((out) => {
        buildChatDataObjects(out);
    }).catch(err => console.error('CIM chat JSON could not be loaded: ' + err));

    function buildChatDataObjects(out) {
      // Build an array of chat IDs and a clean cimChat object
      for (var key in out.cimChats) {
        if (out.cimChats.hasOwnProperty(key)) {
          keys.push(key);
          var subObj = {};
          for (var i in out.cimChats[key]) {
            subObj[i] = Object.values(out.cimChats[key][i])[0];
            switch (i) {
              case 'field_cim_chat_url_name':
                subObj['cssClassName'] = 'cim-btn-' + subObj[i];
                break;
              case 'field_cim_chat_name':
                subObj['longName'] = subObj[i];
                break;
              case 'field_global_widget_location':
                subObj['domLocation'] = (subObj[i] === "kommune") ? ".municipality-chats" : ".cyberhus-chats";
                break;
              default:
                break;
            }
          }
          cimChats[key] = subObj;
        }
      }
      if (!cimChats) {
        console.warn('Local CIM chat id data could not be loaded. Eventlistener not added.');
        cimChatStatus = 'no-chats-defined';
        return;
      }
      if ($('.iframeWrapper.cim-status')[0]) {
        // skip if already set up.
        return;
      }

      cimChatIds = keys.join(", ");
      cimChatIdsObj = { chatIds: cimChatIds };
      // Add the CIM status iframe and setup event listener
      $('body').append('<div class="iframeWrapper cim-status">' +
        '<iframe class="cm-Chat-container" src="" style="vertical-align:top;"></iframe></div>');
  
      Drupal.behaviors.cim_chatAddListenerStatusById();
      
      // Get the status of the chats we are monitoring
      // Note: CIM chat does not support monitoring multiple serverURLs simultaneously (eg. test and production)
      cm_InitiateChatStatus(cimChatIdsObj, chatServerURL + '/ChatClient/StatusIndex');
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
      console.error('External CIM script could not be loaded.');
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
      Drupal.behaviors.cim_chatSetupSingleChatListeners();
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
      object.forEach(Drupal.behaviors.cim_chatChatStatusHandler);
      // The Opeka Widgets module is listening to this event
      $( document ).trigger( "cimChatUpdate", [ cimChatStatus ] );
    }
  };

  Drupal.behaviors.cim_chatChatStatusHandler = function (item, index, arr) {
    var object = arr[index];
    var status = object.status; 
    var statusText = object.statusText;
    var id = object.id;
    var className = cimChats[id].cssClassName;
    var btnId = '.' + className;
    // We set the cimChatStatus to 'by-id-active' if any of the chats are ready / active.
    if (status === 'Ready' || status === 'Activ') {
      cimChatStatus = 'by-id-active';
    }

    // Set status text. If status is closed or busy, remove button
    if ($(btnId)[0]) { 
      if (status === 'Closed' || status === 'Busy' || status === 'BusyOffline') {
        $(btnId).remove();
      }
      // 
      $(btnId + '.chat-status-title').text(cimChats[id].longName);
      $(btnId + ' .cim-dot').hide();
      $(btnId).attr('data-chat-status', status);
      return;
    }
    // Don't setup buttons in the closed or busy states
    if (status === 'Closed' || status === 'Busy' || status === 'BusyOffline') {
      return;
    }
    // Create status button
    Drupal.behaviors.cim_chatCreateStatusButton(id, status);
  };

  Drupal.behaviors.cim_chatCreateStatusButton = function(id, status) {
    var className = cimChats[id].cssClassName,
        btnId = '.'+className;
    $(cimChats[id].domLocation).append('<div class="chat-status ' + className + '" data-chat-status="' + status + '">' + 
      '<span class="chat-status-title">' + cimChats[id].longName + '</span><span class="queue-status"></span><span class="queue-number"></span>' +
      '<div class="cim-dot"><div class="dot-flashing"></div></div></div>');
    // Add click handler
    $( btnId ).on('click', {id: id}, Drupal.behaviors.cim_chatHandleChatBtnClick);
  };

  /* 
   * Initiate chat client and put user in queue
   */
  Drupal.behaviors.cim_chatHandleChatBtnClick = function (event) {
    var id = event.data.id,
      btnId = '.' + cimChats[id].cssClassName,
      status = $(btnId).attr('data-chat-status');

    if (status === 'Ready') {
      // Remove the listener for StatusById as it interferes with single chat mode
      document.removeEventListener('cmStatusByChatIdsUpdatedEvent', cmStatusByIdListener);
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
    }
  };

  Drupal.behaviors.cim_chatStartChat  = function(id,hideChat) {
    var chatTitle = cimChats[id].longName;

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
    document.removeEventListener('cmChatStatusEvent', cmSingleChatStatusListener);
    // Update ribbon widget immediately
    cimChatStatus = 'by-id-active';
    $( document ).trigger( "cimChatUpdate", [ cimChatStatus, longName, cm_QueueNumber ] );
    // Re-render chat, update button state and setup statusById updates
    Drupal.behaviors.cim_chatButtonUpdate(cm_chatId);
    cm_chatId = null;
    Drupal.behaviors.cim_chatSetupStatusByIdAssets();
  };

  Drupal.behaviors.cim_chatButtonUpdate = function(id) {
    var btnId = '.' + cimChats[id].cssClassName,
      statusText = '',
      dataChatStatus = 'Ready',
      queueNumber = '';
    if (!cm_QueueStatus && (cm_status === 'Activ' || cm_status === '' )) {
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
    var id = ((undefined === cm_chatId) || (cm_chatId === 0)) ? null : cm_chatId,
        btnId = id ? '.' + cimChats[id].cssClassName : '',
        longName = id ? cimChats[cm_chatId].longName : '';

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
