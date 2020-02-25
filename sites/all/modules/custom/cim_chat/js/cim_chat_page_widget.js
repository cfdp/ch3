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
      chatServerURL = "https://chat.ecmr.biz/ChatClient/",
      cmSingleChatStatusListener,
      cmUpdatePositionInQueueListener; // Listeners for event from the CIM chat server
  
  Drupal.behaviors.cim_chat = {
    attach: function (context, settings) {

      // Add wrapper for widget to DOM and load widget once the external CIM chat script is loaded
      $('body', context).once('add-cim-widget-page-widget', function () {
        $.getScript( "https://chat.ecmr.biz/Scripts/chatclient/cm.chatclient.js" )
          .done(function( script, textStatus ) {
              Drupal.behaviors.cim_chatSetupSingleChatAssets();
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
    document.addEventListener("cmChatStatus", cmSingleChatStatusListener, true);  
  };

  Drupal.behaviors.cim_chatAddListenerCmUpdatePositionInQueue = function() {
    cmUpdatePositionInQueueListener = function (event) {
      Drupal.behaviors.cim_chatSingleChatStatusUpdate(event);
    };
    // Event listener for ongoing single chat queue status updates
    document.addEventListener("cmUpdatePositionInQueueEvent", cmUpdatePositionInQueueListener, true);  
  };
  
  Drupal.behaviors.cim_chatSetupSingleChatAssets = function() {
    var btnId = $('.button').data('chat-id');
    console.log('woo btn id ' + btnId); 
    if (typeof cm_InitiateChatStatus === "undefined") {
      console.error('External CIM script could not be loaded.');
      return;
    }
    // Add click handler on start chat button
    Drupal.behaviors.cim_chatAddTemplates();

    $("#cim-static-data").loadTemplate($("#static_data_template"),
	    {
        field_chat_name: 'Joe Bloggs',
        date: '25th May 2013',
        authorPicture: 'Authors/JoeBloggs.jpg',
        post: 'This is the contents of my post'
      }, { overwriteCache: true });

    $( btnId ).on('click', {id: btnId}, Drupal.behaviors.cim_chatHandleChatBtnClick);
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
      return;
    })
      .fail(function() {
        console.err('CIM chat panel html file could not be loaded.');
      });
  };


  /* 
   * Initiate chat client and put user in queue
   */
  Drupal.behaviors.cim_chatHandleChatBtnClick = function (event) {
    var id = event.data.id;
    Drupal.behaviors.cim_chatStartChat(id);
  };

  Drupal.behaviors.cim_chatStartChat  = function(id,hideChat) {
    var chatTitle = cimChats[id].shortName;

    cm_InitiateChatClient(id, chatServerURL + 'Index');

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
        shortName = cm_chatId ? cimChats[cm_chatId].shortName : '';
    
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

    Drupal.behaviors.cim_chatButtonUpdate(cm_chatId);
    cm_chatId = null;

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
        shortName = id ? cimChats[cm_chatId].shortName : '';

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

  Drupal.behaviors.cim_chatAddTemplates = function() {
    var staticData = '<script type="text/html" id="static_data_template">' +
    '<div class="status-triangle"><span class="status-text">Loading...</span></div>' +
    '<h2 class="title" data-content="date">Silkeborg</h2>' +
    '<div class="field-cim-chat-description" data-content="field_cim_chat_description">' +
      '<p>Beskrivelse Beskrivelse Beskrivelse</p>' +
    '</div>' +
    '<div class="opening-hours-wrapper">' +
      '<p class="opening-hours-header">Vi er online hver</p>' +
      '<div class="opening-hours-content"data-content="cim_chat_opening_hours" >' +
      '</div>' +
    '</div>' +
    '<div class="button-and-subtext">' +
      '<div class="button-wrapper">' +
        '<div class="button-speech-icon"></div>' +
        '<a data-chat-id="vD2iSGhX+phKIbqm6l66xzK05WAw3Our" class="button" href="#">...</a>' +
      '</div>' +
      '<p class="button-subtext">Anonym og professionel rådgivning</p>' +
    '</div>' +
  '</script>',
  chatWindow = '<script type="text/html" id="chat_window_template">' +
    '<div class="cm-Chat-client">' +
      '<div class="cm-Chat-header">' +
          '<div class="cm-Chat-header-menu">' +
              '<div class="cm-Chat-header-menu-left">' +
              '</div>' +
              '<div class="cm-Chat-header-menu-middle">' +
                  '<div class="cim-chat-title"></div>' +
              '</div>' +
              '<div class="cm-Chat-header-menu-right" data-close-state="first">Afslut</div>' +
          '</div>' +
      '</div>' +
      '<iframe class="cm-Chat-container" src=""></iframe>' +
    '</div> '+
  '</script>';
  $( "body" ).append( staticData, chatWindow );

  }

})(jQuery, Drupal);
