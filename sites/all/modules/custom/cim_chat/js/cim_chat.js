var cimChatIntegration = {},
    cimChatStatus; /* This status is used in the cimChatUpdate event and 
                    * in the Opeka Widgets module and can have the following values:
                    * - 'no-chats-defined': no cim chats defined in data.js
                    * - 'closed': all cim chats are closed
                    * - 'by-id-active': at least one chat is "Ready" or "Activ"
                    * - 'single-chat-queue': the user is queuing for chat
                    * - 'single-chat-queue-signup': the user is in the process of queuing for chat
                    * - 'single-chat-active': the counselor has "taken" the conversation
                    * - 'single-chat-busy-offline': the chat is busy or offline
                    * - 'fetcing-status': the chat updating the status
                    */ 

(function($, Drupal){
  var cimChats = {},
      globalWidgetHost = location.protocol + '//' + location.hostname,
      globalWidgetDataURL = globalWidgetHost + '/cim-chat-json',
      chatWidgetDataURL = $('#cim-widget-data').data('cyberhus-test-url') || "https://cyberhus.dk",
      testMode = true, //@todo: Drupal.settings.cim_chat.cim_chat_test_mode_active ? true : false;
      chatServerURL = testMode
        ? "https://chattest.ecmr.biz"
        : "https://chat.ecmr.biz",
      chatShortName = $('#cim-widget-data').data('shortname') + '-cim-chat',
      singleChatParams,
      cmSingleChatStatusListener,
      cmUpdatePositionInQueueListener,
      cmConfirmReadyEventListener,
      cmStatusByIdListener; // Listeners for events from the CIM chat server

  /**
   * **************************** BOOTSTRAP FUNCTIONS ****************************
   */
  // Add wrapper for widget to DOM and load widget once the external CIM chat script is loaded
  if (!$('body').hasClass('add-cim-widget-page-widget-processed')) {
    $('body').addClass('add-cim-widget-page-widget-processed');
    $.getScript( chatServerURL + "/Scripts/chatclient/cm.chatclient.js" )
    .done(function( script, textStatus ) {
        // load overriding functions 
        cimChatIntegration.loadOverrides(globalWidgetHost, function(err, message) {
          if (err) {
            console.error(err);
            return
          }
          // Check if we have an ongoing chat session for this user
          var token = localStorage.getItem('cm_GetTokenValue'),
              params = {
                hideChat: false, 
                onlyStartIfActive: true
              };
          if (token) {
            cimChatIntegration.setupSingleChatAssets(function(err) {
              if (err) {
                console.error(err);
                return;
              }
              cimChatIntegration.fetchLocalChatList(globalWidgetDataURL, function(err, result) {
                if (err) {
                  cimChatStatus = 'no-chats-defined';
                  return;
                }
                // We check if we have a last used chat id and try to start a chat session
                id = localStorage.getItem('cimChatSessionLastUsedChatId');

                if (id) {
                  cimChatIntegration.startChat(id, params);
                  return;
                }
                console.error('No chat id could be found in Session storage.');
                cimChatIntegration.setupStatusByIdAssets();
              });
            });
            return;
          }
          // No ongoing chat session, so start watching status
          cimChatIntegration.setupStatusByIdAssets();
        });
      })
      .fail(function( jqxhr, settings, exception ) {
        console.error('External CIM chat script could not be loaded.');
      });
  }


  /**
   * **************************** TEMPLATE FUNCTIONS ****************************
   */

  /**
   * Templates for dynamic elements are stored in the /templates folder.
   * 
   * By calling this function the templates are fetched and added to
   * the DOM
   * 
   * Our template engine - Javascript Templates
   * https://github.com/blueimp/JavaScript-Templates
   * 
   */
  cimChatIntegration.addTemplates = function(callback) {
    var path,
        templates = ['status_button','panel','single_page_widget'];

    if ($('#tmpl_status_button')[0]) {
      // Skip if the templates are already present
      return;
    }
    
    templates.forEach(element => {
      path = '/sites/all/modules/custom/cim_chat/templates/' + element + '.html';
      $.get( path, function(data) {
        $( "body" ).append( data );
      })
        .done(function(data) {
          callback(null);
        })
        .fail(function() {
          callback('Template ' + element + ' could not be loaded.');
        })
    });
  };

  /**
   * Update our templates
   * 
   * @param templateId the name of the template
   * @param params the values to update
   */
  cimChatIntegration.updateTemplates = function(templateId, params) {
    var data,
        btnId;
    switch (templateId) {
      case 'tmpl_status_button':
        data = {
          className: cimChats[params.id].cssClassName,
          status: params.status,
          longName: cimChats[params.id].longName,
          queueStatus: params.queueStatus,
          queueNumber: params.queueNumber
        },
        btnId = cimChats[params.id].domLocation + ' .' + cimChats[params.id].cssClassName
        // Add status button to DOM if hasn't been done already
        if (!$(cimChats[params.id].domLocation + ' .' + cimChats[params.id].cssClassName)[0]){
          // Add wrapper
          $(cimChats[params.id].domLocation).append(
            '<div class="chat-status ' + cimChats[params.id].cssClassName + '"></div>'
          );
          $(btnId).html(tmpl(templateId, data));
          // Add click handler
          $( btnId ).on('click', {id: params.id}, cimChatIntegration.handleGlobalWidgetChatBtnClick);
          return;
        }
        $(btnId).html(tmpl(templateId, data));
        break;
      case 'tmpl_panel':
        data = {
          windowTitle: params.windowTitle,
          closeState: params.closeState,
          closeWindowText: params.closeWindowText
        };
        if (!$('#cim-mobility-chat')[0]) {
          return;
        }
        $("#cim-mobility-chat").html(tmpl(templateId, data));
        break;
      case 'tmpl_single_page_widget':
        data = {
          chatLongName: params.chatLongName || singleChatParams.chatLongName,
          chatShortName: params.chatShortName || singleChatParams.chatShortName,
          closeWindowText: params.closeWindowText || singleChatParams.closeWindowText,
          chatDescription: params.chatDescription || singleChatParams.chatDescription,
          chatOpeningHours: params.chatOpeningHours || singleChatParams.chatOpeningHours,
          chatId: params.chatId || singleChatParams.chatId,
          wrapperClass: params.wrapperClass || singleChatParams.wrapperClass,
          buttonText: params.buttonText || singleChatParams.buttonText,
          triangleText: params.triangleText || singleChatParams.triangleText,
        };
        $("#cim-widget-data").html(tmpl(templateId, data));
        break;
      default:
        break;
    }
  };

  // Add templates to the DOM as first step
  cimChatIntegration.addTemplates(function(err) {
    if (err) {
      console.error(err);
      return;
    }
  });

  /**
   * **************************** OVERRIDING FUNCTIONS ****************************
   */

  /**
   * Load overriding functions
   */
  // Note: We will not get errors if the domain is wrong.
  // https://stackoverflow.com/questions/1406537/handling-errors-in-jquery-getscript
  cimChatIntegration.loadOverrides = function(scriptBase, callback) {
    $.getScript( scriptBase + "/sites/all/modules/custom/cim_chat/js/cim_chat_overrides.js" )
      .done(function( script, textStatus ) {
        callback(null);
      })
      .fail(function( jqxhr, settings, exception ) {
        var errorMsg = 'Overriding script could not be loaded.'; 
        callback(errorMsg);
      });
  }
  
  

/**
 * **************************** EVENT HANDLERS ****************************
 */

  /**
   * Setup chat listeners
   * 
   */
  cimChatIntegration.cim_chatSetupSingleChatListeners = function () {
    // Event listener for ongoing single chat status updates
    cimChatIntegration.cim_chatAddListenerCmChatStatus();
  
    // Event listener for ongoing single chat queue status updates
    cimChatIntegration.cim_chatAddListenerCmUpdatePositionInQueue();
  
    // Event listener for when the counselor "takes" a conversation
    cimChatIntegration.cim_chatAddListenerCmConfirmReadyEvent();
  
    // Testing block start
    document[addEventListener ? 'addEventListener' : 'attachEvent']('cmConfirmedReady', function (event) { 
      confirmedReady(event); });
  
    function confirmedReady(event) {
      console.log('confirmedReady');
      console.dir(event.detail);
    }
  
    document[addEventListener ? 'addEventListener' : 'attachEvent']('cmIsWritingEvent', function (event) { 
      isWriting(event); });
  
    function isWriting(event) {
      console.log('isWriting');
      console.dir(event.detail);
    }
  
    document[addEventListener ? 'addEventListener' : 'attachEvent']('cmChatStartedEvent', function (event) {
      chatStarted(event); });
  
    function chatStarted(event) {
      console.log('chatStarted');
      console.dir(event.detail);
    }
  
    // End testing block
    cimChatIntegration.addClickHandler('hideChatWindow');
    cimChatIntegration.addClickHandler('closeChatWindow');
  };

  /**
   * Helper function for adding click handlers
   */
  cimChatIntegration.addClickHandler = function(key) {
    switch (key) {
      case 'hideChatWindow':
        // Add event handlers for hiding and closing chat via the button
        // in the corner of the chat window
        if (!$('.cm-Chat-header-menu-left')[0]) {
          console.warn('Error: Event listeners for chat panel items could not be added.');
        }
        $( '.cm-Chat-header-menu-left' ).on('click', function() {
          cm_HideChat();
          // We trigger an update to make sure the status is propagated
          // to the ribbon via the cimChatUpdate event
          cimChatIntegration.singleChatStatusUpdate();
        });
        break;
      case 'closeChatWindow':
        $( 'body .cm-Chat-header-menu-right' ).on('click', cimChatIntegration.closeConversation);
        break;
      default:
        break;
    }
  };
  
  cimChatIntegration.cim_chatAddListenerCmChatStatus = function() {
    cmSingleChatStatusListener = function (event) {
      cimChatIntegration.singleChatStatusUpdate(event);
    };
    // Event listener for ongoing single chat queue status updates
    document.addEventListener("cmChatStatusEvent", cmSingleChatStatusListener, true);
  };
  
  cimChatIntegration.cim_chatAddListenerCmUpdatePositionInQueue = function() {
    cmUpdatePositionInQueueListener = function (event) {
      cimChatIntegration.singleChatStatusUpdate(event);
    };
    // Event listener for ongoing single chat queue status updates
    document.addEventListener("cmUpdatePositionInQueueEvent", cmUpdatePositionInQueueListener, true);
  };
  
  cimChatIntegration.cim_chatAddListenerCmConfirmReadyEvent = function() {
    cmConfirmReadyEventListener = function (event) {
      cimChatIntegration.singleChatStatusUpdate(event);
    };
    // Event listener for when counselor "takes" a conversation
    document.addEventListener("cmConfirmReadyEvent", cmConfirmReadyEventListener, true);
  };

  /**
   * Remove chat listeners
   */
  cimChatIntegration.removeChatEventListeners = function(key) {
    switch (key) {
      case 'singleChat':
        document.removeEventListener('cmUpdatePositionInQueueEvent', cmUpdatePositionInQueueListener);
        document.removeEventListener('cmChatStatusEvent', cmSingleChatStatusListener);
        document.removeEventListener('cmConfirmReadyEvent', cmConfirmReadyEventListener);
        break;
      case 'statusById':
        document.removeEventListener('cmStatusByChatIdsUpdatedEvent', cmStatusByIdListener);
        break;
      default:
        break;
    }
  };

  // Drupal.behaviors.cim_chatAddListenerStatusById 
  cimChatIntegration.addListenerStatusById = function() {
    cmStatusByIdListener = function (event) {
      cimChatIntegration.statusByChatIdsUpdated(event);
    };
    // Listen for updates from the list of chats we have embedded
    document.addEventListener("cmStatusByChatIdsUpdatedEvent", cmStatusByIdListener, true);
  };

  //Drupal.behaviors.cim_chatStatusByChatIdsUpdated
  cimChatIntegration.statusByChatIdsUpdated = function (event) {
    var object = event.detail;
    cimChatStatus = 'closed';
    if (object) { 
      console.dir(object);

      object.forEach(cimChatIntegration.statusByIdHandler);
      // The Opeka Widgets module is listening to this event
      $( document ).trigger( "cimChatUpdate", [ cimChatStatus ] );
    }
  };

  /**
  * Helper function for the statusById event handler
  */
  cimChatIntegration.statusByIdHandler = function(item, index, arr) {
    var object = arr[index],
        status = object.status,
        id = object.id,
        className,
        btnRef,
        params = {
          id: id,
          status: status,
        };

    if (!cimChats[id]) {
      return;
    }
    className = cimChats[id].cssClassName;
    btnRef = '.' + className + ' .global.cim-btn';

    cimChatIntegration.singlePageButtonUpdate();

    // We set the cimChatStatus to 'by-id-active' if any of the chats are ready / active / Busy.
    if (status === 'Ready' || status === 'Activ' || status === 'Busy') {
      cimChatStatus = 'by-id-active';
    }

    // Set status text. If status is closed or busyOffline, remove button
    if ($(btnRef)[0]) { 
      if (status === 'Closed' || status === 'BusyOffline') {
        $(btnRef).remove();  
      }
      $(btnRef + ' .cim-dot').hide();
      cimChatIntegration.updateTemplates('tmpl_status_button', params);
      return;
    }
    // Don't setup buttons in the closed or busyOffline states
    if (status === 'Closed' || status === 'BusyOffline') {
      return;
    }
    // Create / update status button
    cimChatIntegration.updateTemplates('tmpl_status_button', params);
  };

  /**
  * Helper function for the singleChatStatus event handler
  */
  cimChatIntegration.singleChatStatusUpdate = function (event) {
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
    if (!cm_QueueStatus 
        && cimChatStatus != 'single-chat-queue-signup' 
        && cm_status === 'Activ' ) {
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
      // - set the localStorage chat id
      // - hide the "three dots" animation (fetching status)
      if (cimChatStatus === 'single-chat-queue-signup') {
        localStorage.setItem('cimChatSessionLastUsedChatId', cm_chatId);
        cimChatStatus = 'single-chat-queue';
        $(btnId + ' .cim-dot').hide();
      }
    }
    if (cm_status === 'BusyOffline') {
      cimChatStatus =  'single-chat-busy-offline';
    }
    $( document ).trigger( "cimChatUpdate", [ cimChatStatus, longName, cm_QueueNumber ] );

    cimChatIntegration.globalWidgetButtonUpdate(cm_chatId);
    cimChatIntegration.singlePageButtonUpdate()
  };

  /**
   * Handle global widget chat button click
   * Initiate chat client if chat is ready
   */
  cimChatIntegration.handleGlobalWidgetChatBtnClick = function (event) {
    var id = event.data.id,
      btnId = '.' + cimChats[id].cssClassName + ' .global-cim-btn',
      status = $(btnId).attr('data-chat-status');

    if (status === 'Ready') {
      cimChatIntegration.singleChatInit(id);
    }
  };

  cimChatIntegration.handleSinglePageWidgetBtnClick = function () {
  };

  /**
   * **************************** SETUP / CLEAR ASSETS FUNCTIONS ****************************
   */

  /**
   * Setup the assets for StatusById mode
   */
  cimChatIntegration.setupStatusByIdAssets = function () {
    var cimChatIds,
        cimChatIdsObj,
        cimChatStatus = 'fetching-status';


    cimChatIntegration.fetchLocalChatList(globalWidgetDataURL, function(err, result) {

      if (err) {
        cimChatStatus = 'no-chats-defined';
        return;
      }

      // Show single page widgets, if any present
      cimChatIntegration.setupSinglePageWidget();
  
      // skip if the statusById Iframe is set up already or there are no keys.
      if ($('.iframeWrapper.cim-status')[0] || !result.keys) {
        return;
      }

      $('body').append(
        '<div class="iframeWrapper cim-status">' +
          '<iframe class="cm-Chat-container" src="" style="vertical-align:top;"></iframe>' +
        '</div>'
      );
      cimChatIds = result.keys.join(", ");
      cimChatIdsObj = { chatIds: cimChatIds };

      // Get the status of the chats we are monitoring
      // Note: CIM chat does not support monitoring multiple serverURLs simultaneously (eg. test and production)
      cimChatIntegration.addListenerStatusById();

      cm_InitiateChatStatus(cimChatIdsObj, chatServerURL + '/ChatClient/StatusIndex');


    });
  };


  cimChatIntegration.setupSingleChatAssets = function(callback) {
    var params;
    if (typeof cm_InitiateChatStatus === "undefined") {
      var errorMsg = 'External CIM script could not be loaded.';
      callback(errorMsg);
      return;
    }

    params = {
      windowTitle: '',
      closeState: 'first',
      closeWindowText: 'Afslut'
    }
    if (!$('#cim-mobility-chat')[0]) {
      $('body').append('<div id="cim-mobility-chat"></div>');
    }
    cimChatIntegration.updateTemplates('tmpl_panel', params);
    // Add event listeners once the dom elements are in place
    cimChatIntegration.cim_chatSetupSingleChatListeners();
    callback(null);
  };

  cimChatIntegration.clearAssets = function(type) {
    switch (type) {
      case 'singleChat':
        $('#cim-mobility-chat').remove();
        cimChatIntegration.clearLocalSessionData();
        cimChatIntegration.removeChatEventListeners('singleChat');
        break;
      case 'statusById':
        $('.iframeWrapper.cim-status').remove();
        cimChatIntegration.removeChatEventListeners('statusById');
        break;
      default:
        break;
    }
  }

  cimChatIntegration.setupSinglePageWidget = function() {
    var shortName = $('#cim-widget-data').data('shortname');

    if (typeof shortName === "undefined") {
      return;
    }

    cimChatIntegration.fetchJSONP(chatWidgetDataURL + "/cim-chat-jsonp/" 
      + shortName + "?callback=cimChatIntegration.populateSingleWidget");   
  };

  /**
   * Fetch the widget data from a jsonp source
   */
  cimChatIntegration.fetchJSONP = function(wrapperScriptURL) {
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

  /**
   * Callback function for the JSONP resource call
   *
   * Makes sure the widget is populated with the newly fetched data
   */
  cimChatIntegration.populateSingleWidget = function(fields) {
    console.dir(fields);
    var chatNode = fields[0].node,
        values = {
          chatLongName: chatNode.field_cim_chat_name,
          chatShortName: chatShortName,
          closeWindowText: "Afslut",
          chatDescription: chatNode.field_cim_chat_description,
          chatOpeningHours: chatNode.php,
          chatId: chatNode.field_cim_chat_id,
          wrapperClass: "cim-widget-wrapper",
          buttonText: "...",
          triangleText: "...",
        };
    // Cache values for later use
    singleChatParams = values;
    cimChatIntegration.singlePageButtonUpdate();
    // Add event handlers for starting, minimizing, maximising and closing chat
    $( '#cim-widget-data' ).on('click', '#'+chatShortName, {id: values.chatId}, cimChatIntegration.handleSinglePageBtnClick);

  };

  cimChatIntegration.globalWidgetButtonUpdate = function(id) {
    var btnId = cimChats[id]
        ? ('.' + cimChats[id].cssClassName)
        : '',
      queueStatus = '',
      chatStatus = 'Ready',
      queueNumber = '',
      params;
    
    if (!id) {
      return;
    }
    if (!cm_QueueStatus && (cm_status === 'Activ' || cm_status === 'NotLoaded' )) {
      // Show the fetching state animation until we get the queue status
      $(btnId + ' .cim-dot').css('display', 'inline-block');
    }
    if (cm_QueueStatus === 'Waiting') {
      queueStatus = Drupal.t(': queue #');
      queueNumber = cm_QueueNumber;
      chatStatus = 'Queue';
      $(btnId + ' .cim-dot').hide();
    }
    else if (cm_QueueStatus === 'Ready') {
      queueStatus = Drupal.t(': chatting');
      queueNumber = '';
      chatStatus = 'Chatting';
      $(btnId + ' .cim-dot').hide();
    }
    params = {
      id: id,
      status: chatStatus,
      queueStatus: queueStatus,
      queueNumber: queueNumber
    },
    cimChatIntegration.updateTemplates('tmpl_status_button', params);
  };

  cimChatIntegration.singlePageButtonUpdate = function() {
    var values = {
        wrapperClass: "cim-widget-wrapper",
        buttonText: "...",
        triangleText: "..."
      };
    switch (cm_status) {
      case "Activ":
        values = {
          wrapperClass: "cim-widget-wrapper busy",
          buttonText: "optaget",
          triangleText: "optaget"
        };
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
    cimChatIntegration.updateTemplates('tmpl_single_page_widget', values);
  }

  /**
   * **************************** CHAT SESSION HANDLING ****************************
   */

  /*
   * Remove statusById assets and start a chat
   */
  cimChatIntegration.singleChatInit = function(id) {
    var params = {
      hideChat: false,
      onlyStartIfActive: false
    }
    // Remove the listener for StatusById as it interferes with single chat mode
    cimChatIntegration.clearAssets('statusById');
    cimChatIntegration.globalWidgetButtonUpdate(id);
    // Initiate chat (puts user in queue)
    cimChatIntegration.setupSingleChatAssets(function(err) {
      if (err) {
        console.error(err);
        return;
      }
      cimChatIntegration.startChat(id, params);
      return;
    });
  };

  cimChatIntegration.startChat = function(id, params) {
    var chatTitle = cimChats[id] ? cimChats[id].longName : '';

    cm_InitiateChatClient(id, chatServerURL + '/ChatClient/Index');

    // Start chat if we are ready
    var i = 0;

    setTimeout(initiateChat, 500);

    function initiateChat() {
      // Skip initiating if
      if (cm_status === 'BusyOffline' // The chat is closed
          || (params.onlyStartIfActive // OR we are trying to reconnect to an ongoing session
            && (cm_status === 'Ready'))) { // AND we have a chat that is 'Ready' (it should be Active)
        cimChatIntegration.clearAssets('singleChat');
        cimChatIntegration.setupStatusByIdAssets();
        return;
      }
      if (cm_IsChatReady) {
        if (!params.hideChat) {
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
   * Called when user closes chat. Deletes session data to make sure
   * chat conversation can't be re-rendered.
   */
  cimChatIntegration.closeConversation = function() {
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
    if ($(closeBtn).attr('data-close-state') === 'second') {
      // Close chat completely
      cm_CloseConversation();
      // Remove single chat DOM elements, session data and event listeners
      cimChatIntegration.clearAssets('singleChat');
    }

    // Update ribbon widget immediately
    cimChatStatus = 'by-id-active';
    $( document ).trigger( "cimChatUpdate", [ cimChatStatus, longName, cm_QueueNumber ] );
    // Re-render chat, update button state and setup statusById updates
    cimChatIntegration.globalWidgetButtonUpdate(cm_chatId);
    $(cm_chatId.cssClassName + ' .cim-dot').hide();
    cm_chatId = null;
    cimChatIntegration.setupStatusByIdAssets();
  };

   /**
   * Delete all session data and reset cim chat global vars
   */
  cimChatIntegration.clearLocalSessionData = function() {
    localStorage.removeItem('cm_GetTokenValue');
    localStorage.removeItem('cimChatSessionLastUsedChatId');
    cm_QueueNumber = null;
    cm_QueueStatus = null;
  }

  /**
   * **************************** MISC FUNCTIONS ****************************
   */

  /**
   * Fetch the local cim chat data from a JSON source, parse it and return as
   * object
   * 
   * @param {string} globalWidgetDataURL 
   * @param {string} test - are we testing? 
   * 
   * @return {object} An object with the keys of the cimChats and the full cimChat data object
   */
  cimChatIntegration.fetchLocalChatList = function(globalWidgetDataURL, callback) {
    var testSuffix = (testMode) ? '-test' : '',
        result = {},
        keys = [],
        errorMsg;
        globalWidgetDataURL+= testSuffix;
  
    // Get our local CIM chat data from the JSON feed generated by the Cyberhus CMS
    fetch(globalWidgetDataURL)
      .then(res => res.json())
      .then((out) => {
        buildChatDataObjects(out);
    }).catch(err => callback('CIM chat JSON could not be loaded: ' + err));
  
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
        errorMsg = 'Local CIM chat data could not be loaded.';
        callback(errorMsg);
        return;
      }
      result.keys = keys;
      result.cimChats = cimChats;
      // cimChatIntegration.addTemplates(function(err) {
      //   if (err) {
      //     console.error(err);
      //     return;
      //   }
      // });
      
      callback(null, result);
    } 
  }
})(jQuery, Drupal)
