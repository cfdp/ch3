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
        // Add iframe for the cim chat
        $('body').append('<div class="cm-Chat-client"><iframe class="cm-Chat-container" src=""></iframe></div>');

        // Standard chat panel
        // $('body').append('<div class="cm-Chat-test"></div>');
        // $.get("/sites/all/modules/custom/cim_chat/panel.html", function(data){
        //   $(".cm-Chat-test").html(data);
        //   cm_InitiateChatClient('o3gaPVChkdyfiDgwGYvnNxj1Qwrtrp6i', 'https://chattest.ecmr.biz/ChatClient/Index');
        //   console.log("CIM chat assets added.");
        // })

        setTimeout(function () {
          cm_InitiateChatStatus(cimChatIds, 'https://chattest.ecmr.biz/ChatClient/StatusIndex');
        }, 1000);

        // CIM Status Widget
        if (!cimChatIds) {
          console.warn('Local CIM chat id data could not be loaded.');
          return;
        }

        // Add the CIM status iframe and setup event listener
        $('body').append('<div class="iframeWrapper cim-status"><iframe src="" style="vertical-align:top;"></iframe></div>');


        document.addEventListener("cmStatusByChatIdsUpdated", function (event) {
          Drupal.behaviors.cimWidgetsStatusByChatIdsUpdated(event);
        });
        
        document[addEventListener ? 'addEventListener' : 'attachEvent']('cmChatStatus', 
          function (event) { 
            Drupal.behaviors.chatStatusUpdate(event); 
          }
        );
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
    var btnId = '.'+id;
    console.log(btnId, status);
    // Set status text. If status is closed, remove button
    if ($(btnId)[0]) {
      if (status === 'Closed') {
        $(btnId).remove();
      }
      $(btnId).html(status);
      $(btnId).attr('data-chat-status', status);
      return;
    }
    // Don't setup buttons in the closed state
    if (status === 'Closed') {
      return;
    }
    // Create status button
    $('.cyberhus-chats').append('<span class="chat-status ' + id + '" data-chat-status="' + status + '">' + status + '</span');
    // Add click handler
    $( btnId ).on('click', {id: id}, Drupal.behaviors.handleChatBtnClick);
  };
  
  Drupal.behaviors.handleChatBtnClick = function(event) {
    var id = event.data.id,
        btnId = '.'+id,
        status = $(btnId).attr('data-chat-status');
    console.log('User clicked start chat button, status is ',status)
    if (status === 'Ready') {
      cm_InitiateChatClient(id, 'https://chattest.ecmr.biz/ChatClient/Index');
      setTimeout(function () {
        if (cm_IsChatReady) {
          cm_StartChat('[systembesked: bruger logger på.]');
          console.log('CIM chat loaded!');
        }
        else {
          console.warn('CIM chat is not ready after 3 seconds...');
        }
      }, 2000);
    }
  };

  Drupal.behaviors.chatStatusUpdate = function (event) {
    var status = event.detail.status;
    console.log('chatStatusUpdate: ', status);
    if (status === 'Activ'){
      console.log('Counselor took conversation')
      //@todo: change global widget state
    }
    // if (status === 'Ready')
    //   document.getElementById("cm-Chat-Start-Button-Svg").classList.add('cm-Chat-blink');
    // else
    //   document.getElementById("cm-Chat-Start-Button-Svg").classList.remove('cm-Chat-blink');
  };

})(jQuery, Drupal, cimChatIds);
