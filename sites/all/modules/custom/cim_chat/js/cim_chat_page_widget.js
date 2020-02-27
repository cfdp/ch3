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
      jsonData,
      chatServerURL = "https://chat.ecmr.biz/ChatClient/",
      chatWidgetDataHost = $('#cim-widget-data').data('test-url') || "https://cyberhus.dk",
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
    Drupal.behaviors.cim_chatAddTemplates();
    Drupal.behaviors.cim_chatFetchJSONP(chatWidgetDataHost + "/cim-chat-jsonp/" + shortName + "?callback=Drupal.behaviors.cim_chatPopulateWidget"
    );
  };

  /* 
   * Initiate chat client and put user in queue
   */
  Drupal.behaviors.cim_chatHandleChatBtnClick = function (event) {
    var id = event.data.id;
    console.log('startin chat');
    event.preventDefault();

    Drupal.behaviors.cim_chatStartChat(id);
    return false;
  };

  Drupal.behaviors.cim_chatStartChat  = function(id,hideChat) {
    // Start chat if we are ready
    var i = 0;

    setTimeout(initiateChat, 10);

    function initiateChat() {
      if (cm_IsChatReady) {
        if (!hideChat) {
          cm_OpenChat();
        }
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
    // var btnId = '.' + cimChats[id].cssClassName,
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

  Drupal.behaviors.cim_chatSingleChatStatusUpdate = function (event) {
    var values = {

      button_text: "lukket",
      triangle_text: "lukket",
      wrapper_class: "cim-widget-wrapper closed",
    };

    if (event.detail.isChatReady && event.detail.status === "Ready") {
      //Drupal.behaviors.cim_chatButtonUpdate("ready");
      values = {
        wrapper_class: "cim-widget-wrapper ready",
        button_text: "åben",
        triangle_text: "åben"
      };
    }
    if (event.detail.isChatReady && event.detail.status === "Busy") {
      //Drupal.behaviors.cim_chatButtonUpdate("ready");
      values = {
        wrapper_class: "cim-widget-wrapper busy",
        button_text: "optaget",
        triangle_text: "optaget"
      };
    }
    Drupal.behaviors.cim_chatUpdateTemplate(values);

    console.log('updating cim, event detail is ');
    console.dir(event.detail);
    // var id = ((undefined === cm_chatId) || (cm_chatId === 0)) ? null : cm_chatId,
    //     btnId = id ? '.' + cimChats[id].cssClassName : '',
    //     shortName = id ? cimChats[cm_chatId].shortName : '';

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
    //     Drupal.behaviors.cim_chatSetCookie(cm_chatId);
    //     cimChatStatus = 'single-chat-queue';
    //     $(btnId + ' .cim-dot').hide();
        
    //   }
    // }
    // Drupal.behaviors.cim_chatButtonUpdate(cm_chatId);
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

  /**
   * Callback function for the JSONP resource call
   *
   * Makes sure the widget is populated with the newly fetched data
   */
  Drupal.behaviors.cim_chatPopulateWidget = function(fields) {
    console.dir(fields);
    var chatNode = fields[0].node,
        values = {
          field_cim_chat_name: chatNode.field_cim_chat_name,
          field_cim_chat_description: chatNode.field_cim_chat_description,
          cim_chat_opening_hours: chatNode.php,
          field_cim_chat_id: chatNode.field_cim_chat_id,
          wrapper_class: "cim-widget-wrapper",
          button_text: "...",
          triangle_text: "...",
        };
    // Cache for later use
    jsonData = values;
    console.dir(values)
    Drupal.behaviors.cim_chatUpdateTemplate(values);
  };

  /**
   * Update the widget
   */
  Drupal.behaviors.cim_chatUpdateTemplate = function (newValues) {
    var id = newValues.field_cim_chat_id || null,
        values = {
          field_cim_chat_name: newValues.field_cim_chat_name || jsonData.field_cim_chat_name,
          field_cim_chat_description: newValues.field_cim_chat_description || jsonData.field_cim_chat_description,
          cim_chat_opening_hours: newValues.php || jsonData.cim_chat_opening_hours,
          field_cim_chat_id: newValues.field_cim_chat_id || jsonData.field_cim_chat_id,
          wrapper_class: newValues.wrapper_class || "cim-widget-wrapper",
          button_text: newValues.button_text || "...",
          triangle_text: newValues.triangle_text || "...",
        };

    $("#cim-widget-data").loadTemplate($("#cim_widget_data_template"),values, { complete: Drupal.behaviors.cim_chatSetupCim(id) });
  };

  /**
   * Setup the cim chat window wrapper elements
   */
  Drupal.behaviors.cim_chatSetupCim = function (id) {
    if(!$('#cim-mobility-chat').length){
      $('body').append('<div id="cim-mobility-chat"></div>');
      $("#cim-mobility-chat").loadTemplate($("#chat_window_template"),{}, { complete: Drupal.behaviors.testie(id) });
    }   
    //var chatTitle = cimChats[id].shortName;
    //        $('.cim-chat-title').text(chatTitle);
  };

  Drupal.behaviors.testie = function(id) {
    // We need to wait a bit before continuing to let the template changes propagate.
    function helper(id) {
      console.log('id is '+ id);
      if(!$('#cim-widget-data .button').length){
        console.error("CIM widget template elements not initialized, aborting!");
        return;
      }
      // Add click handler on start chat button
      // Add event listeners if id is set 
      // Initiate chat client 
      // (when initializing template the first time)
      if (id) {
        console.log('initiating chat client');
        $( '#cim-widget-data .button' ).on('click', {"id": id}, Drupal.behaviors.cim_chatHandleChatBtnClick);
        if(!$('#cim-mobility-chat').length){
          console.error("CIM chat window template elements not initialized, aborting!");
          return;
        }
        cm_InitiateChatClient(id, chatServerURL + 'Index');
        Drupal.behaviors.cim_chatSetupSingleChatListeners();
      }
    };
    setTimeout(helper, 10, id);
  };

  Drupal.behaviors.cim_chatFetchJSONP = function(wrapperScriptURL) {
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

  Drupal.behaviors.cim_chatAddTemplates = function() {
    var staticData = '<script type="text/html" id="cim_widget_data_template">' +
      '<div data-class="wrapper_class">' +
        '<div class="status-triangle"><span class="status-text" data-content="triangle_text">...</span></div>' +
        '<h2 class="title" data-content="field_cim_chat_name"></h2>' +
        '<div class="field-cim-chat-description" data-content="field_cim_chat_description"></div>' +
        '<div class="opening-hours-wrapper">' +
          '<p class="opening-hours-header">Vi er online hver</p>' +
          '<div class="opening-hours-content" data-content="cim_chat_opening_hours" >' +
          '</div>' +
        '</div>' +
        '<div class="button-and-text">' +
          '<div class="button-wrapper">' +
            '<div class="button-speech-icon"></div>' +
            '<a data-id="field_cim_chat_id" class="button" href="#" data-content="button_text"></a>' +
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
