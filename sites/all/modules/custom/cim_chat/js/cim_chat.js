var cimChatIntegration = {},
    chatWidgetServerURL = chatWidgetServerURL || 'https://cyberhus.dk',
    chatServerURL = chatServerURL || 'https://chat.ecmr.biz',
    cimChatStatus; /* This status is used in the cimChatUpdate event and 
                    * in the Opeka Widgets module and can have the following values:
                    * - 'no-chats-defined': no cim chats defined in data.js
                    * - 'by-id-closed': all cim chats are closed or BusyOffline
                    * - 'by-id-active': at least one chat is "Ready", "Busy" or "Activ"
                    * - 'single-chat-queue': the user is queuing for chat
                    * - 'single-chat-queue-signup': the user is in the process of queuing for chat
                    * - 'single-chat-active': the counselor has "taken" the conversation
                    * - 'single-chat-busy-offline': the chat is busy or busyOffline
                    * - 'fetcing-status': the chat updating the status
                    */ 

(function($, Drupal, cimChatStatus, chatWidgetServerURL, chatServerURL){
  var cimChats,
      globalWidgetDataURL = chatWidgetServerURL + '/cim-chat-json',
      testMode = false,
      chatShortName = $('#cim-widget-data').data('shortname') + '-cim-chat',
      singleChatParams,
      cmSingleChatStatusListener,
      cmUpdatePositionInQueueListener,
      cmConfirmReadyEventListener,
      cmStatusByIdListener,
      cmConversationClosedListener; // Listeners for events from the CIM chat server

  /**
   * **************************** BOOTSTRAP FUNCTIONS ****************************
   */
  cimChatIntegration.bootstrap = function() {
    // Add wrapper for widget to DOM and load widget once the external CIM chat script is loaded
    if (!$('body').hasClass('add-cim-widget-page-widget-processed')) {
      $('body').addClass('add-cim-widget-page-widget-processed');

      $.getScript( chatServerURL + "/Scripts/chatclient/cm.chatclient.js" )
      .done(function( script, textStatus ) {
          // load overriding functions 
          cimChatIntegration.loadOverrides(chatWidgetServerURL, function(err, message) {
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
                    cimChatStatus = cimChatIntegration.updateCimChatStatus('setValue','no-chats-defined');
                    console.error(err);
                    return;
                  }
                  if (!result.keys) {
                    cimChatStatus = cimChatIntegration.updateCimChatStatus('setValue','no-chats-defined');
                    console.error('No chats defined.');
                    return;
                  }

                  // We check if we have a last used chat id and try to start a chat session
                  id = localStorage.getItem('cimChatSessionLastUsedChatId');

                  if (id && id != 0) {
                    cimChatIntegration.startChat(id, params);
                    return;
                  }
                  console.debug('No chat id could be found in Session storage.');
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
  };
  
  testMode = $('#cim-chat-test-mode').length 
    && $('#cim-chat-test-mode').data('cyberhus-test-url').length;

 cimChatIntegration.bootstrap();
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
        templates = ['global_status_button','panel','single_page_widget'];

    if ($('#tmpl_global_status_button')[0]) {
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
   * Update a template with templateId with the given parameters.
   * 
   * @param templateId the name of the template
   * @param params the values to update
   */
  cimChatIntegration.updateTemplates = function(templateId, params) {
    var data,
        btnId;
    switch (templateId) {
      case 'tmpl_global_status_button':
        data = {
          className: cimChats[params.id].cssClassName,
          status: params.chatStatus,
          longName: cimChats[params.id].longName,
          queueStatus: params.queueStatus || '',
          queueNumber: cm_QueueNumber || ''
        },
        btnId = cimChats[params.id].domLocation + ' .' + cimChats[params.id].cssClassName
        // Skip updating if status is "Closed" or "BusyOffline"

        if (params.chatStatus === 'Closed' || params.chatStatus === 'BusyOffline') {
          if ($(btnId)[0]) {
            $(btnId).remove();
          }
          return;
        }
        // Add status button to DOM if hasn't been done already
        if (!$(btnId)[0]){
          // Add wrapper
          $(cimChats[params.id].domLocation).append(
            '<div class="chat-status ' + cimChats[params.id].cssClassName + '"></div>'
          );
          $(btnId).html(tmpl(templateId, data));
          // Add click handler
          $( btnId ).on('click', {id: params.id, type: 'global'}, cimChatIntegration.handleWidgetBtnClick);
          return;
        }
        if (params.chatStatus === 'fetching-status') {
          // Show the fetching state animation until we get the queue status
          $(btnId + ' .cim-dot').css('display', 'inline-block');
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
          chatStatus: params.chatStatus || singleChatParams.chatStatus,
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
  cimChatIntegration.setupSingleChatListeners = function () {
    // Event listener for ongoing single chat status updates
    cimChatIntegration.addListenerCmChatStatus();
  
    // Event listener for ongoing single chat queue status updates
    cimChatIntegration.addListenerCmUpdatePositionInQueue();
  
    // Event listener for when the counselor "takes" a conversation
    cimChatIntegration.addListenerCmConfirmReady();

    cimChatIntegration.addListenerCmConversationClosed();
  
    // document[addEventListener ? 'addEventListener' : 'attachEvent']('cmConfirmedReady', function (event) { 
    //   confirmedReady(event); 
    // });
  
    // function confirmedReady(event) {
    // }
  
    // document[addEventListener ? 'addEventListener' : 'attachEvent']('cmIsWritingEvent', function (event) { 
    //   isWriting(event); 
    // });
  
    // function isWriting(event) {
    // }
  
    // document[addEventListener ? 'addEventListener' : 'attachEvent']('cmChatStartedEvent', function (event) {
    //   chatStarted(event); });
  
    // function chatStarted(event) {
    // }
  
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
          cimChatIntegration.updateCimChatStatus('onlyTriggerOpeka', '')
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
  
  cimChatIntegration.addListenerCmChatStatus = function() {
    cmSingleChatStatusListener = function (event) {
      cimChatIntegration.singleChatStatusUpdate(event);
    };
    // Event listener for ongoing single chat queue status updates
    document.addEventListener("cmChatStatusEvent", cmSingleChatStatusListener, true);
  };
  
  /**
   * @todo: kø opdatering fungerer ikke pt
   */
  cimChatIntegration.addListenerCmUpdatePositionInQueue = function() {
    cmUpdatePositionInQueueListener = function (event) {
      cimChatIntegration.singleChatStatusUpdate(event);
    };
    // Event listener for ongoing single chat queue status updates
    document.addEventListener("cmUpdatePositionInQueueEvent", cmUpdatePositionInQueueListener, true);
  };

  cimChatIntegration.addListenerCmConversationClosed = function() {
    cmConversationClosedListener = function () {
    }
    document.addEventListener("cmConversationClosedEvent", cmConversationClosedListener, true);
  };
  
  /**
   * This event fires when a user clicks the "I am ready" button after queuing
   */
  cimChatIntegration.addListenerCmConfirmReady = function() {
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

  cimChatIntegration.addListenerStatusById = function(cimChats) {
    cmStatusByIdListener = function (event) {
      cimChatIntegration.statusByChatIdsUpdated(event,cimChats);
    };
    // Listen for updates from the list of chats we have embedded
    document.addEventListener("cmStatusByChatIdsUpdatedEvent", cmStatusByIdListener, true);
  };

  /**
  * statusById event handler
  */
  cimChatIntegration.statusByChatIdsUpdated = function (event, cimChats) {
    var object = event.detail,
        status = 'by-id-active';
    if (object) { 
      object.forEach(function (item, index, arr) {
        cimChatIntegration.statusByIdHandler(cimChats, item, index, arr);
      });
      // Update the cimChatStatus
      function isActive(obj) {
        var isActive = (obj.status === 'Activ' 
              || obj.status === 'Busy' 
              || obj.status === 'Ready') ? true : false;
        return isActive;
      }
      status = object.find(isActive) ? 'by-id-active' : 'by-id-closed';
      cimChatStatus = cimChatIntegration.updateCimChatStatus('statusByIdEvent', status);

    }
  };

  /**
  * Helper function for the statusById event handler
  */
  cimChatIntegration.statusByIdHandler = function(cimChats, item, index, arr) {
    var object = arr[index],
      status = object.status,
      id = object.id,
      className,
      btnRef;
    if (!cimChats[id]) {
      console.error('No cimChats[id] defined! statusByIdHandler could not do its job. ')
      return;
    }
    // Update the templates
    cimChatIntegration.prepareWidgetUpdates(id, status);
  };

  /**
  * Helper function for the singleChatStatus event handler
  */
  cimChatIntegration.singleChatStatusUpdate = function (event) {

    cimChatStatus = cimChatIntegration.updateCimChatStatus('singleChatUpdateEvent', event);
  };

  /**
   * Handle widget start chat button clicks
   * 
   * Initiate chat client if chat is ready
   */
  cimChatIntegration.handleWidgetBtnClick = function (event) {
    var id = event.data.id,
        type = event.data.type,
        btnId,
        status;

    switch (type) {
      case 'global':
        btnId = '.' + cimChats[id].cssClassName + ' .global-cim-btn';
        status = $(btnId).attr('data-chat-status');
        break;
      case 'single':
        btnId = '.start-chat-button',
        status = $('.cim-widget-wrapper').attr('data-single-page-chat-status');      
        break;  
      default:
        break;
    }
    if (status === 'Ready' || status === 'Busy') {
      cimChatIntegration.singleChatInit(id);
    }
  };

  /**
   * Add event handler for when the opeka_widgets.js script has loaded
   * 
   * Allows us to trigger a cimChatUpdate immediately
   */
  $( document ).on( "opekaWidgetsLoaded", function( event ) {
    $( document ).trigger( "cimChatUpdate", [ cimChatStatus ] );
  });

  /**
   * **************************** SETUP / CLEAR ASSETS FUNCTIONS ****************************
   */

  /**
   * Setup the assets for StatusById mode
   */
  cimChatIntegration.setupStatusByIdAssets = function () {
    var cimChatIds,
        cimChatIdsObj;

    // Set the global variable cimChatstatus
    cimChatStatus = cimChatIntegration.updateCimChatStatus('setValue','fetching-status');

    cimChatIntegration.fetchLocalChatList(globalWidgetDataURL, function(err, result) {

      if (err) {
        cimChatStatus = cimChatIntegration.updateCimChatStatus('setValue','no-chats-defined');
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
      cimChatIntegration.addListenerStatusById(result.cimChats);

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

    // Show single page widgets, if any present
    cimChatIntegration.setupSinglePageWidget();

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
    cimChatIntegration.setupSingleChatListeners();
    callback(null);
  };

  /**
   * Clears the assets attached to a certain type of chat
   *
   * @param type String indicating the type of chat
   */
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

  /**
   * Sets up the Single page widget if the conditions are met
   */
  cimChatIntegration.setupSinglePageWidget = function() {
    var shortName = $('#cim-widget-data').data('shortname');
    // Skip if shortName is missing or the widget has been added already
    if ((typeof shortName === "undefined") || $('#cim-widget-data .cim-widget-wrapper')[0]) {
      return;
    }

    cimChatIntegration.fetchJSONP(chatWidgetServerURL + "/cim-chat-jsonp/" 
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
    var chatNode = fields[0].node,
        values = {
          chatLongName: chatNode.field_cim_chat_name,
          chatShortName: chatShortName,
          chatStatus: 'fetching-status',
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
    //cimChatIntegration.singlePageWidgetUpdate(values.chatId,'fetching-status');
    // Add event handlers for starting, minimizing, maximising and closing chat
    $( '#cim-widget-data' ).on(
      'click', '#' + chatShortName,
      {id: values.chatId, type: 'single'}, 
      cimChatIntegration.handleWidgetBtnClick
    );
  };

  /**
   * Prepare values for updating the widgets
   * 
   */
  cimChatIntegration.prepareWidgetUpdates = function(id, status) {
    var singlePage = {
        chatStatus: "fetching-status",
        wrapperClass: "cim-widget-wrapper busy",
        buttonText: "...",
        triangleText: "..."
      },
      globalWidget = {
        id: id,
        chatStatus: status,
        queueStatus: null,
        queueNumber: null
      };
    switch (status) {
      case "Ready":
        singlePage = {
          chatStatus: "Ready",
          wrapperClass: "cim-widget-wrapper ready",
          buttonText: "åben",
          triangleText: "åben"
        };
        break;
      case "Closed":
        singlePage = {
          chatStatus: "Closed",
          buttonText: "lukket",
          triangleText: "lukket",
          wrapperClass: "cim-widget-wrapper closed",
        };
        break;
      case "BusyOffline":
        singlePage = {
          chatStatus: "Closed",
          buttonText: "lukket",
          triangleText: "lukket",
          wrapperClass: "cim-widget-wrapper closed",
        };
        break;
      default: // Queue, fetching-status, Busy
        singlePage = {
          chatStatus: "Busy",
          wrapperClass: "cim-widget-wrapper busy",
          buttonText: "optaget",
          triangleText: "optaget"
        };
    }
    // Update Global Widget
    cimChatIntegration.updateTemplates('tmpl_global_status_button', globalWidget);

    // Update Single page widget
    if ( !$('#cim-widget-data')[0] || (singleChatParams.chatId != id)) {
      // Skip updating if there is no single page widget or if we don't have a widget id match
      return;
    }
    cimChatIntegration.updateTemplates('tmpl_single_page_widget', singlePage);
    
  }

  /**
   * **************************** CHAT SESSION HANDLING ****************************
   */

  /*
   * Remove statusById assets and initiate single chat mode
   */
  cimChatIntegration.singleChatInit = function(id) {
    var params = {
      hideChat: false,
      onlyStartIfActive: false
    }
    // Remove the listener for StatusById as it interferes with single chat mode
    cimChatIntegration.clearAssets('statusById');

    // Initiate chat (puts user in queue or starts chat)
    cimChatIntegration.setupSingleChatAssets(function(err) {
      if (err) {
        console.error(err);
        return;
      }
      cimChatIntegration.startChat(id, params);
      return;
    });
  };

  /*
   * Start a chat session.
   */
  cimChatIntegration.startChat = function(id, params) {
    var chatTitle = cimChats[id] ? cimChats[id].longName : '';

    cm_InitiateChatClient(id, chatServerURL + '/ChatClient/Index');

    // Start chat if we are ready
    var i = 0;

    setTimeout(initiateChat, 500);

    function initiateChat() {
      // Skip initiating if
      if (cm_status === 'BusyOffline' // The chat is BusyOffline
          || (params.onlyStartIfActive // OR we are trying to reconnect to an ongoing session
            && (cm_status === 'Ready'))) { // AND we have a chat that is 'Ready' (it should be 'Active')
        cimChatIntegration.clearAssets('singleChat');
        cimChatIntegration.setupStatusByIdAssets();
        return;
      }
      if (cm_IsChatReady || cimChatStatus === 'single-chat-busy') {
        if (!params.hideChat) {
          cm_OpenChat();
        }
        $('.cim-chat-title').text(chatTitle);
        // Start monitoring queue
        cm_StartQueuTimer();
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
    var closeBtn = '.cm-Chat-header-menu-right';
    
    if (cm_status === 'Activ') {
      if ($(closeBtn).attr('data-close-state') === 'first') {
        // At least one message has been sent. Initiate the closing of the chat.
        $(closeBtn).text('Slet');
        $(closeBtn).attr('data-close-state', 'second')
        cm_CloseConversation();
        return;
      }
    }
    // In all other cases - close chat window, clear single chat assets and initiate statusById mode
    cm_CloseConversation();
    // Remove single chat DOM elements, session data and event listeners
    cimChatIntegration.clearAssets('singleChat');

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
   * Prepare a new value for the global cimChatStatus variable
   * 
   * @param {string} updateType 
   * @param {mixed} param - could be a string or an event
   * 
   */
  cimChatIntegration.updateCimChatStatus = function(updateType, param, id) {
    var myEvent,
        newStatus = cimChatStatus, // old status is default
        btnId,
        id,
        widgetStatus = 'fetching-status',
        longName = '';


    if (!param) {
      return newStatus;
    }

    switch (updateType) {
      case 'setValue':
        newStatus = param;
        break;
      case 'statusByIdEvent':
        // 'by-id-active' if any of the chats are Ready / Activ / Busy.
        // Else 'by-id-closed'
        newStatus = param;
        widgetStatus = null;
        break;
      case 'singleChatUpdateEvent':
        myEvent = param;
        if (cimChats && cimChats[cm_chatId]) {
          btnId = cimChats[cm_chatId] ? '.' + cimChats[cm_chatId].cssClassName : '';
          longName = cimChats[cm_chatId] ? cimChats[cm_chatId].longName : '';
        }
        if (myEvent  
          && (myEvent.detail.status === 'NotLoaded'
          || myEvent.detail.status === '')) {
          newStatus = 'fetching-status';
        }
        if (myEvent && myEvent.detail.approvalattempt) {
          if (myEvent.detail.approvalattempt == 1 || myEvent.detail.approvalattempt == 2) {
              // Counselor takes the conversation - maximise chat window if needed
              newStatus =  'single-chat-active';
              widgetStatus = 'Activ';
            }
        }
        if (myEvent && myEvent.type === 'cmChatStatusEvent') {
          if (myEvent.detail.status === 'Activ' && cm_QueueStatus === 'Ready') {
            // We are chatting
            newStatus =  'single-chat-active';
            widgetStatus = 'Activ';
          }
          if (myEvent.detail.status === 'Busy') {
            // Chat is busy - too many in queue
            newStatus =  'single-chat-busy';
            widgetStatus = 'Busy';
          }
          if (myEvent.detail.status === 'BusyOffline') {
            //BusyOffline - chat open, but counselor not ready
            newStatus =  'single-chat-busy-offline';
            widgetStatus = 'BusyOffline';
          }
          if (myEvent.detail.status === 'Activ' && !cm_QueueStatus) {
            // We are queuing, but no QueueEvents have arrived yet
            newStatus =  'single-chat-queue';
            widgetStatus = 'Activ';
            cm_GetPositionInQueue();

            // The moment the user signs up for the queue we 
            // - set the localStorage chat id
            // - hide the "three dots" animation (fetching status)
            if (localStorage.getItem('cimChatSessionLastUsedChatId') != cm_chatId) {
              localStorage.setItem('cimChatSessionLastUsedChatId', cm_chatId);
            }
            $(btnId + ' .cim-dot').hide();
          }
          if (myEvent.detail.status === 'Ready') {
            // We are ready to sign up for queue
            newStatus = 'single-chat-queue-signup';
            widgetStatus = 'Activ';
          }
        }
        if (myEvent && myEvent.type === 'cmUpdatePositionInQueueEvent') {
          // @todo: queue position does not update immediately
          newStatus = 'single-chat-queue';
          widgetStatus = 'Activ';
          if (myEvent.detail.queueStatus === 'Ready') {
            newStatus =  'single-chat-active';
            widgetStatus = 'Activ';
          }
        }
        break
      default:
        break;
    }

    if (cm_chatId && widgetStatus) {
      cimChatIntegration.prepareWidgetUpdates(cm_chatId, widgetStatus);
    }
    if (id && widgetStatus) {
      cimChatIntegration.prepareWidgetUpdates(id, widgetStatus);
    }    

    $( document ).trigger( "cimChatUpdate", [ newStatus, longName, cm_QueueNumber ] );
    return newStatus;
  };

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
    // @todo: make sure we dont fetch the json data twice - cache the result.
    cimChats = {};

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
      if ($.isEmptyObject(cimChats)) {
        errorMsg = 'Local CIM chat data could not be loaded.';
        callback(errorMsg);
        return;
      }
      result.keys = keys;
      result.cimChats = cimChats;

      callback(null, result);
    }
  }
})(jQuery, Drupal, cimChatStatus, chatWidgetServerURL, chatServerURL)
