/* Append on the site where the chat foldout should be active - enter the appropriate values for opekaFoldout.baseURL (baseURL of the chat service) and opekaFoldout.clientURL (client site URL) and opekaFoldout.embedLocation. Additional CSS files can be loaded by adding them to opekaFoldout.cssFiles */
(function($){
/* Widget specific settings */
  var opekaFoldout = {
    chatName: "1-1-chat",
    chatType: "pair",
    baseURL: "https://ch.curachat.com",
    clientURL: "http://cyberhus.dk",
    embedLocation: ".region-tabs-right-inner",
  };
  var opekaFoldout2 = {
    chatName: "group",
    chatType: "group",
    baseURL: "https://ch-group.curachat.com",
    clientURL: "http://cyberhus.dk",
    embedLocation: ".region-tabs-right-inner",
  };
  var opekaFoldout3 = {
    chatName: "kram",
    chatType: "group",
    baseURL: "https://kram.curachat.com",
    clientURL: "http://cyberhus.dk",
    embedLocation: ".region-tabs-right-inner",
  };
  var opekaFoldout4 = {
    chatName: "kbh",
    chatType: "pair",
    baseURL: "https://kbh.curachat.com",
    clientURL: "http://cyberhus.dk",
    embedLocation: ".region-tabs-right-inner",
  };
  opekaFoldout.cssFiles = [["opeka.widget.foldout.css", opekaFoldout.baseURL+"/sites/all/modules/custom/opeka/css/"],["opeka.widgets.css", opekaFoldout2.clientURL+"/sites/all/themes/cyberhus/css/"]];
  var i = 0;

  $(document).ready(function() {
    var width = $(window).width();
    /* Add the foldoutController script - we only want widgets on wide screens
     * @todo cover the resize window case also
     */
    if((typeof foldoutController == "undefined") && (width >= 980)){
      opekaFoldout.embedScript = document.createElement('script');
      opekaFoldout.embedScript.type='text/javascript';
      opekaFoldout.embedScript.src = opekaFoldout.baseURL+"/sites/all/modules/custom/opeka/widgets/foldout/js/foldoutController.js";
      document.body.appendChild(opekaFoldout.embedScript);
    }
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
    else if(typeof foldoutController == "undefined"){
      i++;
      window.setTimeout(waitForFnc,100);
    }
    else{
      // Add the widgets with a timer delay to prevent browser from stalling
      setTimeout(function(){
        addWidget(opekaFoldout);
      }, 1000);
      setTimeout(function(){
        addWidget(opekaFoldout2);
      }, 1000);
      setTimeout(function(){
        addWidget(opekaFoldout3);
      }, 1000);
      setTimeout(function(){
        addWidget(opekaFoldout4);
      }, 1000);
    }
  }

  waitForFnc();

  /**
   * Initialize widget and add it to the page
   * @param {Object} widget An instance of the foldoutController object
   */
  function addWidget(widget) {
    newWidget = new foldoutController(jQuery, widget);
    newWidget.init();
  }

})(jQuery);
