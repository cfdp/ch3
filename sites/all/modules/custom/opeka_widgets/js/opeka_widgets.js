var opekaPopupWidgets = opekaPopupWidgets || null,
    cimChatStatus = cimChatStatus || null;

(function($, Drupal, opekaPopupWidgets){
  var chatStates = {},
      opekaGlobalWidgetState = "not-set",
      widgetWrapper,
      widgetMinimized,
      widgetExpanded;

  Drupal.behaviors.opeka_widgetsPopupData = {
    attach: function(context, settings) {
      var cyberChatText = Drupal.t('Active chats right now'),
      municipalityChatText = Drupal.t('Chat with local counselors near you'),
      opekaMiniStatus = Drupal.t('The chat is open!'),
      opekaMiniExplainer = Drupal.t('Who can you chat with?');

      // Add wrapper for widgets to DOM and load widgets once the chat server is ready
      $('body', context).once('add-opeka-widgets', function () {

        $('body').append('<div class="curachat-widgets">' + 
          '<div class="global-widget-expanded">' +
            '<div class="cyberhus-chats">' +
              '<div class="global-chat-widget-header">' +
                '<span class="global-chat-widget-text">' + cyberChatText + '</span>' +
                '<a class="global-widget-read-more" href="/temaer/Chatten-p%C3%A5-Cyberhus"></a>' +
                '<span class="global-widget-toggle"></span>' +
              '</div>' +
            '</div>' +
            '<div class="global-chat-widget-text municipality">' + municipalityChatText + '</div>' +
            '<div class="municipality-chats"></div>' +
          '</div>' +
          '<div class="global-widget-minimized opeka-mini">' +
            '<span class="minimized-chat-name"></span>' +
            '<span class="minimized-status"></span> ' + 
            '<span class="minimized-explainer"></span>' + 
            '<span class="minimized-queue-number"></span>' + 
            '<span class="global-widget-toggle"></span></div>' + 
          '</div>'
          );
        if (typeof opekaPopupWidgets != "undefined"){
          Drupal.behaviors.opeka_widgets.waitForOpekaServer(opekaPopupWidgets);
        }
        else {
          console.warn("Error: Opeka popup widgets not defined. Probably the data file is missing.");
        }
        // Cache some elements
        widgetWrapper = $('.curachat-widgets');
        widgetMinimized = $('.global-widget-minimized');
        widgetExpanded = $('.global-widget-expanded');

        // Add event handler for maximizing global widget or the cim chat if applicable
        $('body').on('click', '.global-widget-minimized', function() {
          if (widgetMinimized.hasClass('cim-mini')) {
            cm_OpenChat();
            $( "body" ).trigger( "cimChatUpdate", [ cimChatStatus, '' ] );
            return;
          }
          widgetMinimized.hide();
          widgetExpanded.show();
          Drupal.behaviors.opeka_widgets.updateSubtitle();
        });

        // Add event handler for minimizing global widget
        $('body').on('click', '.global-widget-expanded .global-widget-toggle', function() {
          widgetExpanded.hide();
          widgetMinimized.show();
        });

        function renderMinimizedWidget(chatType, miniStatus, miniExplainer = '', miniChatName = '', miniQueueNumber) {
          $('.minimized-status').text(miniStatus);
          $('.minimized-explainer').text(miniExplainer);
          if (chatType === 'opeka') {
            $('.minimized-chat-name').text(miniChatName);
            $('.minimized-queue-number').text('');
            widgetMinimized.addClass('opeka-mini').removeClass('cim-mini');
          }
          if (chatType === 'cim') {
            if (miniChatName != '') {
              $('.minimized-chat-name').text(miniChatName + ': ');
            }
            if (miniQueueNumber > 0) {
              $('.minimized-queue-number').text(miniQueueNumber);
            }
            widgetMinimized.addClass('cim-mini').removeClass('opeka-mini');
          }
        };

        renderMinimizedWidget('opeka', opekaMiniStatus, opekaMiniExplainer);

        // Add event handler for listening to updates from the CIM chat
        $( document ).on( "cimChatUpdate", function( event, cimActive, chatName, queueNumber ) {
          console.log('cimchatupdate called..')
          var cimMiniStatus = '',
            queueNumber = (cimActive === 'single-chat-queue') ? queueNumber : '';

          if (cimActive === 'single-chat-queue') {
            cimMiniStatus = Drupal.t('You are in queue as number: ');
            $('.minimized-queue-number').show();

          }
          if (cimActive === 'single-chat-active' && ($('.cm-Chat-client').is(':hidden'))) {
            cimMiniStatus = Drupal.t('Click to show chat');
            $('.minimized-queue-number').hide();
          }
          if (cimActive === 'single-chat-active' && (!$('.cm-Chat-client').is(':hidden'))) {
            cimMiniStatus = '';
            $('.minimized-queue-number').hide();
          }

          if (cimActive === 'by-id-active') {
            renderMinimizedWidget('opeka', opekaMiniStatus, opekaMiniExplainer);
            Drupal.behaviors.opeka_widgets.toggleGlobalWidget('show');
          }
          if (cimActive === 'single-chat-queue' || cimActive === 'single-chat-active') {
            renderMinimizedWidget('cim', cimMiniStatus, '', chatName, queueNumber);
            widgetExpanded.hide();
            widgetMinimized.show();
            Drupal.behaviors.opeka_widgets.toggleGlobalWidget('show');
          }

          if (cimActive === 'closed') {
            Drupal.behaviors.opeka_widgets.toggleGlobalWidget('hide');
          }
          Drupal.behaviors.opeka_widgets.updateSubtitle();
        });
      });
    }
  };
  
  Drupal.behaviors.opeka_widgets ={};
  
  /**
   * Wait for the external server script to load
   * We don't want to wait more than 10 seconds
   * @todo: we should check the the connect.js script to see if server is up
   */
  Drupal.behaviors.opeka_widgets.waitForOpekaServer = function(allPopups) {
    $.each(allPopups, function(k,v) {
      setTimeout(function () {
        Drupal.behaviors.opeka_widgets.addWidget(v);
      }, 100);
    });
  };

  /**
   * Initialize widget and add it to the page
   * @param {Object} widget An instance of the popupController object
   */
  Drupal.behaviors.opeka_widgets.addWidget = function(widget) {
    var newWidget = new Drupal.behaviors.opeka_widgets.OpekaPopupController(widget);
    newWidget.init();
  };
  
  /**
   * Constructor function for the popup widgets
   *
   * @param {Object} opekaPopup Object containing various settings
   *
   * See embed.html for example values
   */
  Drupal.behaviors.opeka_widgets.OpekaPopupController = function(opekaPopup) {
    this.chatType = opekaPopup.chatType || "default"; // "default" accommodates both pair and group chats
    this.baseURL = opekaPopup.baseURL;
    this.chatURL = opekaPopup.baseURL + '/opeka-widgets/popup/' + this.chatType + '?client_url=' + opekaPopup.clientURL;
    this.chatName = opekaPopup.chatName;
    this.cssFiles = opekaPopup.cssFiles;
    this.embedLocation = opekaPopup.embedLocation;
  };
  
  /**
   * Init function
   */
  Drupal.behaviors.opeka_widgets.OpekaPopupController.prototype.init = function(){
    this.addOpekaPopupCss();
    this.addEmbedHTML(this.chatName);
    this.popupAnimation(this.chatName);
    this.addMsgListener();
  };

  /**
   * Add custom CSS file to HEAD
   * @param {string} cssId Id of the css file - the name of the CSS file
   * @param {string} cssPath Absolute path to the directory of the CSS file
   */
  Drupal.behaviors.opeka_widgets.OpekaPopupController.prototype.addOpekaPopupCss = function() {
    var cssFiles = this.cssFiles;
    // Check if there's any css files to add.
    // The cssFiles global is initialized in embed.html
    if (typeof cssFiles !== 'undefined' && cssFiles.length > 0) {
      /* Add CSS files to HEAD */
      $.each(cssFiles, function (i, val) {
        if (!document.getElementById(cssFiles[i][0])) {
          var head = document.getElementsByTagName('head')[0];
          var link = document.createElement('link');
          link.id = cssFiles[i][0];
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = cssFiles[i][1] + cssFiles[i][0];
          link.media = 'all';
          head.appendChild(link)
        }
      });
    }
  };

  // Add the popup HTML to the page
  Drupal.behaviors.opeka_widgets.OpekaPopupController.prototype.addEmbedHTML = function() {

    $(this.embedLocation).append('<div class="opeka-chat-popup-wrapper ' + this.chatName + '"><div id="opeka-chat-iframe-' + 
      this.chatName + '"><iframe src="' + this.chatURL + '" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe></div></div>');
    };
    
  //Popup animation
  Drupal.behaviors.opeka_widgets.OpekaPopupController.prototype.popupAnimation = function(popupAction) {
    var popupWrapper = ".opeka-chat-popup-wrapper." + this.chatName,
      height = $(popupWrapper).height(),
      smallHeight = 35,
      largeHeight = 70,
      totalHeight = 0,
      declineWidgetCookie = Drupal.behaviors.opeka_widgets.getCookie === "yes" ? true : false;

      Drupal.behaviors.opeka_widgets.updateGlobalWidgetState();
    // Get height of all widgets
    $('.opeka-chat-popup-wrapper').each(function () {
      totalHeight += $(this).height()
    });
    // Make widget pop up if open or occupied
    if ((!declineWidgetCookie && (popupAction === (this.chatType + "-Open"))) || 
        (popupAction === (this.chatType + "-Occupied"))) {
      $(popupWrapper).show();
      return;
    }
    // in all other cases - hide it
    $(popupWrapper).hide();
  };

  /**
   *  Update subtitle visibility: should be hidden if no chats are visible in the
   *  municipality section  
   */ 

  Drupal.behaviors.opeka_widgets.updateSubtitle = function() {
    if ($('.municipality-chats').children().filter(':visible').length == 0) {
      // action when all are hidden
      $('.global-chat-widget-text.municipality').hide();
      return;
    }
    $('.global-chat-widget-text.municipality').show();
  };

  // Close popup when the close iframe message is received
  Drupal.behaviors.opeka_widgets.OpekaPopupController.prototype.closePopup = function() {
    var popupWrapper = "." + this.chatName;
    Drupal.behaviors.opeka_widgets.setStatus(this.chatName);
    $(popupWrapper).fadeOut();
  };
  

  /**
   * Receive messages from the iframe
   * https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
   */
  Drupal.behaviors.opeka_widgets.OpekaPopupController.prototype.addMsgListener = function() {
    window.addEventListener("message", this.receiveMessage.bind(this), false);
  };

  Drupal.behaviors.opeka_widgets.OpekaPopupController.prototype.receiveMessage = function(event) {
    var chatIframe = $(".opeka-chat-popup-wrapper." + this.chatName + " iframe"),
      data = event.data;
    if (event.origin !== this.baseURL) {
      return;
    }
    if (data === this.chatType + "-CloseIframe") {
      this.closePopup();
      return;
    } 
    // when the iframe is shown/hidden it sends it's width to us (the parent window)
    // so we can render the correct size
    if (data.substring(0,6) === 'width-'){
      if (data.slice(6) != '0') {
        chatIframe.width(data.slice(6));
      }
      return;
    }
    if (
      (data.slice(-6) === 'Closed') ||
      (data.slice(-4) === 'Open') ||
      (data.slice(-8) === 'Occupied')) {
        // We have a chat state change
        chatStates[event.origin] = data;
        this.popupAnimation(data);
        Drupal.behaviors.opeka_widgets.updateSubtitle();
        return;
    }
    return;
  };

  /**
  * Search the chatStates object for a certain value
  * @param {String} needle. The value to search for
  * @returns {Boolean} Returns true if the value was found, else false
  */
  Drupal.behaviors.opeka_widgets.searchObject = function(needle) {
    for (var key in chatStates) {
      if (chatStates.hasOwnProperty(key)) {
        if (chatStates[key] == ('pair-'+needle) || chatStates[key] == ('group-'+needle) || chatStates[key] == ('default-'+needle) ) {
          return true;
        }
      }
    }
    // The key wasn't found
    return false;
  };

  /**
  * Calculates the state of the global widget and shows / hides it accordingly
  */
  Drupal.behaviors.opeka_widgets.updateGlobalWidgetState = function() {
    if (Drupal.behaviors.opeka_widgets.searchObject('Open')) {
      // We have an active chat
      opekaGlobalWidgetState = 'chat-open';
      Drupal.behaviors.opeka_widgets.toggleGlobalWidget('show');

    } else if (Drupal.behaviors.opeka_widgets.searchObject('Occupied')) {
      // We have occupied chats...
      opekaGlobalWidgetState = 'chat-busy';
      Drupal.behaviors.opeka_widgets.toggleGlobalWidget('show');

    } else {
      // All chats are closed
      opekaGlobalWidgetState = 'chat-closed';
      Drupal.behaviors.opeka_widgets.toggleGlobalWidget('hide');
    }
  };

  /**
  * Search the chatStates object for a certain value
  * @param {String} needle. The value to search for
  * @returns {Boolean} Returns true if the value was found, else false
  */
  Drupal.behaviors.opeka_widgets.searchObject = function(needle) {
    for (var key in chatStates) {
      if (chatStates.hasOwnProperty(key)) {
        if (
          chatStates[key] == ('pair-'+needle) ||
          chatStates[key] == ('group-'+needle) ||
          chatStates[key] == ('default-'+needle) ) {
            return true;
        }
      }
    }
    // The key wasn't found
    return false;
  };

  /**
  * Shows or hides the global widget
  * @param {String} action. The value indicating what action should be taken
  * @returns null
  */
  Drupal.behaviors.opeka_widgets.toggleGlobalWidget = function(action) {

    if ((widgetWrapper.css('display') == 'none') && (action === 'show')) {
      // Don't show the widget before we have a status from the CIM chat
      // @todo: Don't show the widget before all chats are loaded ie.
      // integrate (Object.keys(opekaPopupWidgets).length > $('.opeka-chat-popup-wrapper').length) ||
      if (!cimChatStatus) {
        return;
      }

      widgetWrapper.fadeIn();
      if (cimChatStatus === 'by-id-active') {
        widgetExpanded.show();
        widgetMinimized.hide();
        Drupal.behaviors.opeka_widgets.updateSubtitle();
        return;
      }
      widgetExpanded.show();
      widgetMinimized.hide();
      return;
    }
    // Hide unless a cim chat is active/ready OR there are active opeka chats
    if ((widgetWrapper.css('display') != 'none') &&
        (action === 'hide') && 
        (cimChatStatus != 'by-id-active') &&
        (cimChatStatus != 'single-chat-queue') &&
        (cimChatStatus != 'single-chat-active') &&
        (opekaGlobalWidgetState === 'chat-closed')
       ) {
      widgetMinimized.hide();
      widgetExpanded.hide();
      widgetWrapper.fadeOut();
    }
  };

  Drupal.behaviors.opeka_widgets.setStatus = function(chatName) {
    // var date = new Date();
    // date.setDate(date.getDate() + 1); 
    // Remember for one day
    // var cookie = "opeka-widgets-declined-" + chatName + "=yes;expires=" + date.toUTCString() + ";path=" + Drupal.settings.basePath;
    var cookie = "opeka-widgets-declined-" + chatName + "=yes;path=" + Drupal.settings.basePath;

    document.cookie = cookie;
  };
  
  /**
   * Check if a cookie has been set for the client
   *
   * Verbatim copy of Drupal.comment.getCookie().
   */
  Drupal.behaviors.opeka_widgets.getCookie = function(chatName) {
    var search = "opeka-widgets-declined-" + chatName + '=';
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
  
})(jQuery, Drupal, opekaPopupWidgets);
