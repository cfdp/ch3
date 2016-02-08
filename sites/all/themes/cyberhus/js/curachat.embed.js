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
    chatName: "kbh",
    chatType: "pair",
    baseURL: "https://kbh.curachat.com",
    clientURL: "http://cyberhus.dk",
    embedLocation: ".region-tabs-right-inner",
  };
  var opekaMultiWidget = {
    embedLocation: ".region-tabs-right-inner",
    chat1: { chatName: "kbh", chatType: "pair", baseURL: "https://dev.demo", clientURL: "http://dev.ch3"},
    chat2: { chatName: "rksk", chatType: "pair", baseURL: "https://dev.demo", clientURL: "http://dev.ch3"}
  };

  opekaFoldout.cssFiles = [["opeka.widget.foldout.css", opekaFoldout.baseURL+"/sites/all/modules/custom/opeka/css/"],["opeka.widgets.css", opekaFoldout2.clientURL+"/sites/all/themes/cyberhus/css/"]];

  // MultiWidget inherits the same css files for now
  opekaMultiWidget.cssFiles = opekaFoldout.cssFiles;

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
    if((typeof multiWidgetController == "undefined") && (width >= 980)){
      opekaMultiWidget.embedScript = document.createElement('script');
      opekaMultiWidget.embedScript.type='text/javascript';
      opekaMultiWidget.embedScript.src = opekaMultiWidget.chat1.baseURL+"/sites/all/modules/custom/opeka/widgets/js/multiWidgetController.js";
      document.body.appendChild(opekaMultiWidget.embedScript);
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
    else if((typeof foldoutController == "undefined") || (typeof multiWidgetController == "undefined") ){
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
/*      setTimeout(function(){
        addWidget(opekaFoldout3);
      }, 1000);
      }, 1000);*/
      setTimeout(function(){
        addMultiWidget(opekaMultiWidget);
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

  function addMultiWidget(widget) {
/*    newWidget = new multiWidgetController(jQuery, widget);
    newWidget.init();*/
    embedMultiWidget();
    foldoutAnimation("multi");
  }

  /* @todo: should be deleted when multi-widget is integrated in foldout */
  //Foldout animation
  function foldoutAnimation(chatName) {
    $(".opeka-chat-foldout-wrapper."+chatName).hover(
      function() {
        $(this).stop(true,true).animate({
          right: 0
        },200);
      },
      function() {
        $(this).stop(true,true).animate({
          right: -260
        },200);
      }
    );
  }

  function embedMultiWidget() {
    $( ".region-tabs-right-inner" ).append( '<div class="opeka-chat-foldout-wrapper multi"><div id="opeka-chat-iframe-multi"><iframe src="http://cyberhus.dk/sites/all/themes/cyberhus/chat-multi-widget/embed.html" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" height="280"></iframe></div></div>' );
  }

})(jQuery);
