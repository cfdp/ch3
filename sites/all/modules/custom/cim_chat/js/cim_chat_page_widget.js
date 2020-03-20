var cimWidgetIntegrator = {},
    cimChatStatus; /* This status is used in the cimChatUpdate event and 
                    * in the Opeka Widgets module and can have the following values:
                    * - 'no-chats-defined': no cim chats defined in data.js
                    * - 'closed': all cim chats are closed
                    * - 'by-id-active': at least one chat is "Ready" or "Activ"
                    * - 'single-chat-queue': the user is queuing for chat
                    * - 'single-chat-queue-signup': the user is in the process of queuing for chat
                    * - 'single-chat-active': the counselor has "taken" the conversation
                    */ 

(function ($) {
  var cimChat = {},
      chatServerURL = "https://chat.ecmr.biz/ChatClient/",
      chatWidgetDataHost = $('#cim-widget-data').data('test-url') || "https://cyberhus.dk",
      cmSingleChatStatusListener,
      cmUpdatePositionInQueueListener; // Listeners for event from the CIM chat server

  // Add wrapper for widget to DOM and load widget once the external CIM chat script is loaded
  if (!$('body').hasClass('add-cim-widget-page-widget-processed')) {
    $('body').addClass('add-cim-widget-page-widget-processed');
    $.getScript( "https://chat.ecmr.biz/Scripts/chatclient/cm.chatclient.js" )
      .done(function( script, textStatus ) {
          cimWidgetIntegrator.cim_chatSetupSingleChatAssets();
        })
        .fail(function( jqxhr, settings, exception ) {
          console.error('External CIM chat script could not be loaded.');
      });
  }

  cimWidgetIntegrator.cim_chatSetupSingleChatListeners = function (id) {
    // Event listener for ongoing single chat status updates
    cimWidgetIntegrator.cim_chatAddListenerCmChatStatus();

    // Event listener for ongoing single chat queue status updates
    cimWidgetIntegrator.cim_chatAddListenerCmUpdatePositionInQueue();

    // Add event handlers for starting, minimizing, maximising and closing chat
    $( '#cim-widget-data' ).on('click', '#'+id, {id: id}, cimWidgetIntegrator.cim_chatHandleChatBtnClick);

    // minimize
    $( '#cim-mobility-chat' ).on('click', '.cm-Chat-header-menu-left', function() {
      $( '.cm-Chat-container' ).slideUp();
      $('.cm-Chat-client').addClass('minimized');
    });
    // maximize
    $( '#cim-mobility-chat' ).on('click', '.minimized .cm-Chat-header-menu-left', function() {
      $('.cm-Chat-client').removeClass('minimized');
      $( '.cm-Chat-container' ).slideDown();
    });

    $( '.cm-Chat-header-menu-right' ).on('click', cimWidgetIntegrator.cim_chatCloseConversation);
  };

  cimWidgetIntegrator.cim_chatAddListenerCmChatStatus = function() {
    cmSingleChatStatusListener = function (event) {
      cimWidgetIntegrator.cim_chatSingleChatStatusUpdate(event);
    };
    // Event listener for ongoing single chat status updates
    document.addEventListener("cmChatStatus", cmSingleChatStatusListener, true);  
  };

  cimWidgetIntegrator.cim_chatAddListenerCmUpdatePositionInQueue = function() {
    cmUpdatePositionInQueueListener = function (event) {
      cimWidgetIntegrator.cim_chatSingleChatStatusUpdate(event);
    };
    // Event listener for ongoing single chat queue status updates
    document.addEventListener("cmUpdatePositionInQueueEvent", cmUpdatePositionInQueueListener, true);  
  };
  
  cimWidgetIntegrator.cim_chatSetupSingleChatAssets = function() {
    var btnId,
        shortName = $('#cim-widget-data').data('shortname');
    if (typeof cm_InitiateChatStatus === "undefined") {
      console.error('External CIM script could not be loaded.');
      return;
    }
    if (typeof shortName === "undefined") {
      console.error('Client shortname not defined!');
      return;
    }
    cimWidgetIntegrator.cim_chatAddTemplates();
    cimWidgetIntegrator.cim_chatFetchJSONP(chatWidgetDataHost + "/cim-chat-jsonp/" + shortName + "?callback=cimWidgetIntegrator.cim_chatPopulateWidget"
    );
  };

  /* 
   * Initiate chat client and put user in queue
   */
  cimWidgetIntegrator.cim_chatHandleChatBtnClick = function (event) {
    var id = event.data.id;
    event.preventDefault();

    cimWidgetIntegrator.cim_chatStartChat(id);
    return false;
  };

  cimWidgetIntegrator.cim_chatStartChat  = function(id,hideChat) {
    if (!hideChat) {
      cm_OpenChat();
    }
  };

  /**
   * Called when user closes chat.
   */
  cimWidgetIntegrator.cim_chatCloseConversation = function() {
    var closeBtn = '.cm-Chat-header-menu-right',
        chatLongName = cm_chatId ? cimChat.chatLongName : '';
    
    if (cm_status === 'Ready' || cm_status === 'Busy') {
      // No conversation has taken place yet. 
      cm_CloseConversation();
      cm_HideChat();
      return;
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
      $(closeBtn).attr('data-close-state', 'first');
      $(closeBtn).text('Afslut');
      cm_HideChat();
    }
  };

  cimWidgetIntegrator.cim_chatButtonUpdate = function(id) {
    // var btnId = '.' + cimChat.cssClassName,
    //   statusText = '',
    //   dataChatStatus = 'Ready',
    //   queueNumber = '';
    // if (!cm_QueueStatus && (cm_status === 'Activ' || cm_status === '' )) {
    //   // Show the fetching state animation until we get the queue status
    //   $(btnId + ' .cim-dot').css('display', 'inline-block');
    // }
    // if (cm_QueueStatus === 'Waiting') {
    //   statusText = Drupal.t(': queue #');
    //   queueNumber = cm_QueueNumber;
    //   dataChatStatus = 'Queue';
    //   $(btnId + ' .cim-dot').hide();
    // }
    // else if (cm_QueueStatus === 'Ready') {
    //   statusText = Drupal.t(': chatting');
    //   queueNumber = '';
    //   dataChatStatus = 'Chatting';
    //   $(btnId + ' .cim-dot').hide();
    // }
    // $(btnId).attr('data-chat-status', dataChatStatus);
    // $(btnId + ' .queue-status').text(statusText);
    // $(btnId + ' .queue-number').text(queueNumber);
  };

  cimWidgetIntegrator.cim_chatSingleChatStatusUpdate = function (event) {
    if (event) {
      console.dir(event.detail)
      cimWidgetIntegrator.cim_chatBuildTemplateValues(event.detail.isChatReady, event.detail.status);
      return;
    }
    // var id = ((undefined === cm_chatId) || (cm_chatId === 0)) ? null : cm_chatId,
    //     btnId = id ? '.' + cimChat.cssClassName : '',
    //     shortName = id ? cimChat.shortName : '';

    // if (!cm_QueueStatus && cimChatStatus != 'single-chat-queue-signup' && cm_status === 'Activ' ) {
    //   // Start monitoring the queue position
    //   cimChatStatus = 'single-chat-queue-signup';
    //   cm_StartQueuTimer();
    // }
    // if (cm_status === 'Activ') {
    //   // show the minimize chat panel icon
    //   $('.cm-Chat-header-menu-left').css('display', 'inline');
    // }
    // if (cm_QueueNumber === 0 || cm_status === 'Ready') {
    //   cimChatStatus =  'single-chat-active';
    // }
    // if (cm_QueueNumber > 0 ) {
    //   // The moment the user enters the queue we 
    //   // - set the cimChatCookie
    //   // - hide the three dots fetching status animation 
    //   if (cimChatStatus === 'single-chat-queue-signup') {
    //     cimWidgetIntegrator.cim_chatSetCookie(cm_chatId);
    //     cimChatStatus = 'single-chat-queue';
    //     $(btnId + ' .cim-dot').hide();
        
    //   }
    // }
    // cimWidgetIntegrator.cim_chatButtonUpdate(cm_chatId);
  };

  
  /**
   * Callback function for the JSONP resource call
   *
   * Makes sure the widget is populated with the newly fetched data
   */
  cimWidgetIntegrator.cim_chatPopulateWidget = function(fields) {
    var chatNode = fields[0].node,
        values = {
          chatLongName: chatNode.field_cim_chat_name,
          closeWindowText: "Afslut",
          chatDescription: chatNode.field_cim_chat_description,
          chatOpeningHours: chatNode.php,
          chatId: chatNode.field_cim_chat_id,
          wrapperClass: "cim-widget-wrapper",
          buttonText: "...",
          triangleText: "...",
        };
    // Cache for later use
    cimChat = values;
    cimWidgetIntegrator.cim_chatUpdateTemplate(values, true);
  };

  cimWidgetIntegrator.cim_chatBuildTemplateValues = function(readyState, status) {
    var values = {
        wrapperClass: "cim-widget-wrapper",
        buttonText: "...",
        triangleText: "..."
      };
    switch (status) {
      case "Activ":
        values = {
          wrapperClass: "cim-widget-wrapper busy",
          buttonText: "optaget",
          triangleText: "optaget"
        };
        // A chat is ongoing so open the window
        cm_OpenChat();
        break;
      case "Ready":
        values = {
          wrapperClass: "cim-widget-wrapper ready",
          buttonText: "åben",
          triangleText: "åben"
        };
        break;
      case "Busy":
        values = {
          wrapperClass: "cim-widget-wrapper busy",
          buttonText: "optaget",
          triangleText: "optaget"
        };
        break;
      default: // Closed and BusyOffline states
        values = {
          buttonText: "lukket",
          triangleText: "lukket",
          wrapperClass: "cim-widget-wrapper closed",
        };
    }
    cimWidgetIntegrator.cim_chatUpdateTemplate(values);
  }

  /**
   * Update the widget
   */
  cimWidgetIntegrator.cim_chatUpdateTemplate = function (newValues, attachWidgetlisteners) {
    var id = newValues.chatId || null,
        values = {
          chatLongName: newValues.chatLongName || cimChat.chatLongName,
          closeWindowText: newValues.closeWindowText || cimChat.closeWindowText,
          closeState: newValues.closeState || cimChat.closeWindowText,
          chatDescription: newValues.chatDescription || cimChat.chatDescription,
          chatOpeningHours: newValues.chatOpeningHours || cimChat.chatOpeningHours,
          chatId: newValues.chatId || cimChat.chatId,
          wrapperClass: newValues.wrapperClass || "cim-widget-wrapper",
          buttonText: newValues.buttonText || "...",
          triangleText: newValues.triangleText || "...",
        };
    // Attach the cim chat window if it hasn't been done already
    if(!$('#cim-mobility-chat').length){
      $('body').append('<div id="cim-mobility-chat"></div>');
      $("#cim-mobility-chat").loadTemplate($("#chat_window_template"),values);
    }
    $("#cim-widget-data").loadTemplate($("#cim_widget_data_template"),values, { complete: cimWidgetIntegrator.cim_chatSetupInteraction(id, attachWidgetlisteners) });
  };

  /**
   * After initializing or updating template:
   * Add single chat cim event listeners and initiate chat client if needed
   */
  cimWidgetIntegrator.cim_chatSetupInteraction = function(id, attachWidgetlisteners) {
    // We need to wait a bit before initiating the chat client
    // to let the template changes propagate.
    function setupCimHelper(id) {
      if(!$('#cim-widget-data .button').length || !$('.cm-Chat-client').length){
        console.error("CIM widget template elements not initialized, aborting!");
        return;
      }
 
      if (id && attachWidgetlisteners) {
        cm_InitiateChatClient(id, chatServerURL + 'Index');
        cimWidgetIntegrator.cim_chatSetupSingleChatListeners(id);
      }
    };
    setTimeout(setupCimHelper, 1, id);
  };

  /**
   * Fetch the widget data from a jsonp source
   */
  cimWidgetIntegrator.cim_chatFetchJSONP = function(wrapperScriptURL) {
    addScript(wrapperScriptURL, function() {});

    function addScript(src, callback) {
      var s,
        r,
        t;
      r = false;
      s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = src;
      s.onload = s.onreadystatechange = function() {
        //console.log(this.readyState); //uncomment this line to see which ready states are called.
        if (!r && (!this.readyState || this.readyState == 'complete')) {
          r = true;
          callback(this.readyState);
        }
      };
      t = document.getElementsByTagName('script')[0];
      t.parentNode.insertBefore(s, t);
    }
  };

  cimWidgetIntegrator.cim_chatAddTemplates = function() {
    var staticData = '<script type="text/html" id="cim_widget_data_template">' +
      '<div data-class="wrapperClass">' +
        '<div class="status-triangle"><span class="status-text" data-content="triangleText">...</span></div>' +
        '<h2 class="title" data-content="chatLongName"></h2>' +
        '<div class="field-cim-chat-description" data-content="chatDescription"></div>' +
        '<div class="opening-hours-wrapper">' +
          '<p class="opening-hours-header">Vi er online hver</p>' +
          '<div class="opening-hours-content" data-content="chatOpeningHours" >' +
          '</div>' +
        '</div>' +
        '<div class="button-and-text">' +
          '<div class="button-wrapper">' +
            '<div class="button-speech-icon"></div>' +
            '<div data-id="chatId" class="button" data-content="buttonText"></div>' +
          '</div>' +
          '<p class="button-subtext">Anonym og professionel rådgivning</p>' +
        '</div>' +
      '</div>' +
    '</script>',
    chatWindow = '<script type="text/html" id="chat_window_template">' +
      '<div class="cm-Chat-client">' +
        '<div class="cm-Chat-header">' +
            '<div class="cm-Chat-header-menu">' +
                '<div class="cm-Chat-header-menu-left">' +
                '</div>' +
                '<div class="cm-Chat-header-menu-middle">' +
                    '<div class="cim-chat-title" data-content="chatLongName">...</div>' +
                '</div>' +
                '<div class="cm-Chat-header-menu-right" data-close-state="first" data-content="closeWindowText"></div>' +
            '</div>' +
        '</div>' +
        '<iframe class="cm-Chat-container" src=""></iframe>' +
      '</div> '+
    '</script>';
    $( "body" ).append( staticData, chatWindow );
  }

})(jQuery);
