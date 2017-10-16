/**
 * Script for adding popup chat widgets, to be embedded on client site
 *
 * @param {Object} $ The jQuery object
 * @param {Object} opekaPopup Object containing various settings
 *
 * See embed.html for example values
 */
function popupController($, opekaPopup) {
  this.chatType = opekaPopup.chatType || "pair";
  this.baseURL = opekaPopup.baseURL;
  this.chatURL = opekaPopup.baseURL + '/opeka-widgets/popup/' + this.chatType +'?client_url=' + opekaPopup.clientURL;
  this.chatName = opekaPopup.chatName;
  this.cssFiles = opekaPopup.cssFiles;
  this.embedLocation = opekaPopup.embedLocation;
  this.widgetSize = opekaPopup.widgetSize;
}

popupController.prototype = {
  constructor: popupController,
   /**
    * Init function
    */
  init: function () {
    $ = jQuery;
    this.addOpekaPopupCss();
    this.addEmbedHTML(this.chatName);
    this.popupAnimation(this.chatName);
    this.addMsgListener();
  },
 /**
  * Add custom CSS file to HEAD
  * @param {string} cssId Id of the css file - the name of the CSS file
  * @param {string} cssPath Absolute path to the directory of the CSS file
  */
  addOpekaPopupCss:function ()  {
    var cssFiles = this.cssFiles;
    // Check if there's any css files to add.
    // The cssFiles global is initialized in embed.html
    if (typeof cssFiles !== 'undefined' && cssFiles.length > 0) {
      /* Add CSS files to HEAD */
      $.each( cssFiles, function( i, val ) {
        if (!document.getElementById(cssFiles[i][0])) {
          var head  = document.getElementsByTagName('head')[0];
          var link  = document.createElement('link');
          link.id   = cssFiles[i][0];
          link.rel  = 'stylesheet';
          link.type = 'text/css';
          link.href = cssFiles[i][1]+cssFiles[i][0];
          link.media = 'all';
          head.appendChild(link)
        }
      });
    }
  },
  // Add the popup HTML to the page
  addEmbedHTML: function ()  {
    var iframeHeight = "70";
    if (this.widgetSize === "small") {
      iframeHeight = "35";
    }
    $( this.embedLocation ).append( '<div class="opeka-chat-popup-wrapper '+this.chatName+'"><div id="opeka-chat-iframe-'+this.chatName+'"><iframe src="' + this.chatURL + '" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" height="' + iframeHeight + '"></iframe></div></div>' );
  },
  //Popup animation
  popupAnimation: function(popupAction){
    var popupWrapper = ".opeka-chat-popup-wrapper." + this.chatName,
        height = $(popupWrapper).height(),
        totalHeight = 0,
        isVisible = true;

    if ($(popupWrapper).css('display') == 'none') {
      isVisible = false;
    }

    // Get height of all widgets
    $('.opeka-chat-popup-wrapper').each(function(){ totalHeight+=$(this).height() });

    if (!isVisible && ((popupAction === (this.chatType+"-Open")) || popupAction === (this.chatType+"-Occupied"))) {
      $(popupWrapper).animate({
          top: 0
        },1000, function() {
          $(popupWrapper).show();
      });

      }
    else if (popupAction === (this.chatType+"-Closed") ) {
      $(popupWrapper).animate({
        top: totalHeight
      },1000, function() {
        $(popupWrapper).hide()
      });
    }
    if (!($(popupWrapper).css('display') == 'none')) {
      isVisible = true;
    }
    console.log("after " + this.chatURL + " action " + popupAction + " visible? " + isVisible)

  },

  // Close popup when the close iframe message is received
  closePopup: function() {
    console.log("Trying to close "+this.chatName);
    var popupWrapper = "."+this.chatName;
    $(popupWrapper).fadeOut();
  },

  /**
   * Receive messages from the iframe
   * https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
   */
  addMsgListener: function() {
    window.addEventListener("message", this.receiveMessage.bind(this), false);
  },
  //
  receiveMessage: function(event) {
    if (event.origin !== this.baseURL) {
      return;
    }
    else if (event.data === this.chatType+"-CloseIframe") {
      console.log("closing popup "+event.data);
      this.closePopup();
    }
    else {
      this.popupAnimation(event.data);
    }
  }
}


