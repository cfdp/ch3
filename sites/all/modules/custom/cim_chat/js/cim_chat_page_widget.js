var cimWidgetIntegrator = {};

(function ($) {
  var cimChat = {},
      chatServerURL = "https://chattest.ecmr.biz",
      chatWidgetDataHost = $('#cim-widget-data').data('test-url') || "https://cyberhus.dk",
      cmSingleChatStatusListener,
      cmUpdatePositionInQueueListener; // Listeners for event from the CIM chat server

  // Add wrapper for widget to DOM and load widget once the external CIM chat script is loaded
  if (!$('body').hasClass('add-cim-widget-page-widget-processed')) {
    $('body').addClass('add-cim-widget-page-widget-processed');
    $.getScript( chatServerURL + "/Scripts/chatclient/cm.chatclient.js" )
      .done(function( script, textStatus ) {
          cimWidgetIntegrator.cim_chatSetupSingleChatAssets();
        })
        .fail(function( jqxhr, settings, exception ) {
          console.error('External CIM chat script could not be loaded.');
      });
  }

  /*
   * Once a chat has been initiated, we initiate the listener for updates
   * and set up listeners for the chat window.
   */
  cimWidgetIntegrator.cim_chatSetupSingleChatListeners = function (id) {
    // Event listener for ongoing single chat status updates
    cimWidgetIntegrator.cim_chatAddListenerCmChatStatus();

    // Event listener for ongoing single chat queue status updates
    cimWidgetIntegrator.cim_chatAddListenerCmUpdatePositionInQueue();
  };

  cimWidgetIntegrator.cim_chatAddListenerCmChatStatus = function() {
    cmSingleChatStatusListener = function (event) {
      cimWidgetIntegrator.cim_chatSingleChatStatusUpdate(event);
    };
    // Event listener for ongoing single chat status updates
    document.addEventListener("cmChatStatus", cmSingleChatStatusListener, true);
  };

  /*
   * Listen for status updates from the chat we are embedding
   */
  cimWidgetIntegrator.cim_chatAddListenerStatusById = function() {
    cimWidgetIntegrator.cmStatusByIdListener = function (event) {
      cimWidgetIntegrator.cim_chatStatusByChatIdsUpdated(event);
    };
    document.addEventListener("cmStatusByChatIdsUpdated", cimWidgetIntegrator.cmStatusByIdListener, true);
  };

  /*
   * Called when the chat status (by id) is updated
   */
  cimWidgetIntegrator.cim_chatStatusByChatIdsUpdated = function (event) {
    var object = event.detail;
    if (object) {
      object.forEach(cimWidgetIntegrator.cim_chatChatStatusHandler);
    }
  };

  /*
   * Helper function that initiates the updating of the template values
   * when the chat status (by id) has been changed.
   */
  cimWidgetIntegrator.cim_chatChatStatusHandler = function (item, index, arr) {
    var object = arr[index],
        status = object.status;
    cimWidgetIntegrator.cim_chatBuildTemplateValues(status);
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
    cimWidgetIntegrator.cim_chatFetchJSONP(chatWidgetDataHost + "/cim-chat-jsonp/" + shortName + "?callback=cimWidgetIntegrator.cim_chatPopulateWidget");

  };

  /*
   * Initiate chat client and put user in queue
   */
  cimWidgetIntegrator.cim_chatHandleChatBtnClick = function (event) {
    var id = event.data.id;
    event.preventDefault();

    // Remove the status by id listener as it interferes with single chat mode
    document.removeEventListener('cmStatusByChatIdsUpdated', cimWidgetIntegrator.cmStatusByIdListener);
    // Initiate chat client, add listeners and start chat
    cm_InitiateChatClient(id, chatServerURL + '/ChatClient/Index');
    cimWidgetIntegrator.cim_chatSetupSingleChatListeners(id);
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
    
    if (cm_status === 'Ready' || cm_status === 'Busy' || cm_status === '' || cm_status === 'Closed') {
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

      // Remove event listeners for ongoing chat mode
      document.removeEventListener('cmUpdatePositionInQueueEvent', cmUpdatePositionInQueueListener);
      document.removeEventListener('cmChatStatus', cmSingleChatStatusListener);
    }
  };

  /**
   * Handles updates to initiated chat sessions
   *
   * Calculates the proper closed/busy/ready states for the widget
   */
  cimWidgetIntegrator.cim_chatSingleChatStatusUpdate = function (event) {
    var status;
    if (event) {
      if (event.detail.queueStatus && (event.detail.queueStatus === 'Ready')) {
        status = 'Busy';
      }
      // This is needed to prevent the widget from displaying "Busy" after initiating
      // a chat in the closed state. cm_status is set to "Busy" in that case...
      else if (event.detail.status && event.detail.status === 'Busy' && !event.detail.isChatReady) {
        status = 'Closed';
      }
      else if (event.detail.status) {
        status = event.detail.status;
      }
      cimWidgetIntegrator.cim_chatBuildTemplateValues(status);
      return;
    }
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
    // Cache values for later use
    cimChat = values;
    cimWidgetIntegrator.cim_chatUpdateTemplate(values, true);
    // Add event handlers for starting, minimizing, maximising and closing chat
    $( '#cim-widget-data' ).on('click', '#'+cimChat.chatId, {id: cimChat.chatId}, cimWidgetIntegrator.cim_chatHandleChatBtnClick);
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

  cimWidgetIntegrator.cim_chatBuildTemplateValues = function(status) {
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
   * Initiate chat status and add status by id event listener
   */
  cimWidgetIntegrator.cim_chatSetupInteraction = function(id, attachWidgetlisteners) {
    // We need to wait a bit before initiating the chat client
    // to let the template changes propagate.
    function setupCimHelper(id) {
      if(!$('#cim-widget-data .start-chat-button').length || !$('.cm-Chat-client').length){
        console.error("CIM widget template elements not initialized, aborting!");
        return;
      }
 
      if (id && attachWidgetlisteners) {
        var chatIds = { 'chatIds': id };
        cm_InitiateChatStatus(chatIds,  chatServerURL + '/ChatClient/StatusIndex');
        cimWidgetIntegrator.cim_chatAddListenerStatusById();
        cm_StatusByChatIds(chatIds);
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
            '<div data-id="chatId" class="start-chat-button" data-content="buttonText"></div>' +
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
