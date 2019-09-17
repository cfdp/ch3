var cimChatIds = cimChatIds || null;

(function ($, Drupal, cimChatIds) {
  var chatStates = {},
    widgetWrapper,
    widgetMinized,
    widgetExpanded;

  Drupal.behaviors.cimWidget = {
    attach: function (context, settings) {

      // Add wrapper for widget to DOM and load widget if the chat server is ready
      $('body', context).once('add-cim-widget', function () {

        if (typeof cm_InitiateChatStatus === "undefined") {
          console.error('External CIM script could not be loaded.');
          return;
        }
        //$('body').append('<div class="cm-Chat-client"><iframe class="cm-Chat-container" src=""></iframe></div>');


        // Standard chat panel
        $('body').append('<div class="cm-Chat-test"></div>');
        $.get("/sites/all/modules/custom/cim_chat/panel.html", function(data){
          $(".cm-Chat-test").html(data);
          cm_InitiateChatClient('o3gaPVChkdyfiDgwGYvnNxj1Qwrtrp6i', 'https://chattest.ecmr.biz/ChatClient/Index');
          console.log("CIM chat assets added.");
        })

        setTimeout(function () {
          if (cm_IsChatReady) {
            console.log('CIM chat loaded!');
            //cm_StartChat('Hello woooorld');
          }
          else {
            console.warn('CIM chat could not be loaded.');
          }
        }, 5000);

        // CIM Status Widget
        if (!cimChatIds) {
          console.warn('Local CIM chat status data could not be loaded.');
          return;
        }

        // Add the CIM status iframe and setup event listener
        //$('body').append('<div class="iframeWrapper"><iframe class="cm-Chat-container" src="" style="vertical-align:top;"></iframe></div>');


        document.addEventListener("cmStatusByChatIdsUpdated", function (event) {
          //Drupal.behaviors.cimWidgetsStatusByChatIdsUpdated(event);
        });
        setTimeout(function () {
          //cm_InitiateChatStatus(cimChatIds, 'https://chattest.ecmr.biz/ChatClient/StatusIndex');
        }, 5000);
      });
    }
  };

  Drupal.behaviors.cimWidgetsStatusByChatIdsUpdated = function (event) {
    object = event.detail;
    if (object) {
      object.forEach(Drupal.behaviors.cimWidgetsChatStatusHandler);
    }
  };

  Drupal.behaviors.cimWidgetsChatStatusHandler = function (item, index, arr) {
    var object = arr[index];
    var id = object.id;
    var status = object.status;
    var statusText = object.statusText;
    console.log('status is: ', object.status);
  };







})(jQuery, Drupal, cimChatIds);
