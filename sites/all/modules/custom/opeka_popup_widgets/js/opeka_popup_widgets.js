/* Append on the site where the chat foldout should be active
 * - enter the appropriate values for opekaPopup.baseURL (baseURL of the chat service)
 * and opekaPopup.clientURL (client site URL) and opekaPopup.embedLocation.
 * Additional CSS files can be loaded by adding them to opekaPopup.cssFiles
 */

(function($){
  /* Widget specific settings */
  var opekaPopup = {
    chatName: "demo-pair",
    chatType: "pair",
    baseURL: "https://dev.demo",
    clientURL: "https://dev.ch3",
    embedLocation: ".cyberhus-chats",
    widgetSize: "large",
  },
  opekaPopup2 = {
    chatName: "demo-group",
    chatType: "group",
    baseURL: "https://dev.abc",
    clientURL: "https://dev.ch3",
    embedLocation: ".cyberhus-chats",
    widgetSize: "large",

  },
  opekaPopup3 = {
    chatName: "kbh",
    chatType: "pair",
    baseURL: "https://dev.demo",
    clientURL: "https://dev.ch3",
    embedLocation: ".municipality-chats",
    widgetSize: "small",
  },
  opekaPopup4 = {
    chatName: "aarhus",
    chatType: "pair",
    baseURL: "https://dev.abc",
    clientURL: "https://dev.ch3",
    embedLocation: ".municipality-chats",
    widgetSize: "small",
  },
  breakpointTab = 586;
  // opekaPopup.cssFiles = [["opeka.widget.popup.css", opekaPopup.baseURL+"/sites/all/modules/custom/opeka/css/"],                         ["opeka.widgets.css", opekaPopup2.clientURL+"/sites/all/themes/cyberhus/css/"]];

  var i = 0;

  // Add wrapper for widgets to DOM
  $( document ).ready(function() {
    $('body').append('<div class="curachat-widgets"><div class="municipality-chats"></div><div class="cyberhus-chats"></div></div>');
  });

  /**
   * Wait for the external script to load
   * We don't want to wait more than 10 seconds
   */
  function waitForFnc(){
    if (i >= 100) {
      console.log("Opeka chat could not be loaded");
      return;
    }
    else if( typeof popupController == "undefined" ){
      i++;
      window.setTimeout(waitForFnc,100);
    }
    else{
      // Add the widgets with a timer delay to prevent browser from stalling
      setTimeout(function(){
        addWidget(opekaPopup);
      }, 1000);
      setTimeout(function(){
        addWidget(opekaPopup2);
      }, 1000);
      setTimeout(function(){
        addWidget(opekaPopup3);
      }, 1000);
      setTimeout(function(){
        addWidget(opekaPopup4);
      }, 1000);
    }
  }

  waitForFnc();

  /**
   * Initialize widget and add it to the page
   * @param {Object} widget An instance of the popupController object
   */
  function addWidget(widget) {
    newWidget = new popupController(jQuery, widget);
    newWidget.init();
  }

})(jQuery);

