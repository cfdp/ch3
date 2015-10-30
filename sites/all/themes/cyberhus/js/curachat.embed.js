/* Append on the site where the chat foldout should be active - enter the appropriate values for opekaFoldout.baseURL (baseURL of the chat service) and opekaFoldout.clientURL (client site URL)  amd opekaFoldout.embedLocation. Additional CSS files can be loaded by adding them to opekaFoldout.cssFiles */
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
  opekaFoldout.cssFiles = [["opeka.widget.foldout.css", opekaFoldout.baseURL+"/sites/all/modules/custom/opeka/css/"],["opeka.widgets.css", opekaFoldout2.clientURL+"/sites/all/themes/cyberhus/css/"]];
  var i = 0;

  $(document).ready(function() {
    var width = $(window).width();
    /* Add the foldoutController script - we only want widgets on wide screens*/
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
      //Add any number of widgets - define additional variables as needed
      firstChat = new foldoutController(jQuery, opekaFoldout);
      firstChat.init();
      secondChat = new foldoutController(jQuery, opekaFoldout2);
      secondChat.init();
      thirdChat = new foldoutController(jQuery, opekaFoldout3);
      thirdChat.init();
    }
  }

  waitForFnc();

})(jQuery);
