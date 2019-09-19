var cimChatIds = cimChatIds || null;

(function ($, Drupal, cimChatIds) {
  var chatStates = {},
    widgetWrapper,
    widgetMinized,
    widgetExpanded;

  Drupal.behaviors.cim_chat = {
    attach: function (context, settings) {

      // Add wrapper for widget to DOM and load widget if the chat server is ready
      $('body', context).once('add-cim-widget', function () {

        if (typeof cm_InitiateChatStatus === "undefined") {
          console.error('External CIM script could not be loaded.');
          return;
        }
        // Add iframe for the cim chat
        $.get("/sites/all/modules/custom/cim_chat/panel.html", function(data){
          $('body').append('<div id="cim-mobility-chat"></div>');
          $("#cim-mobility-chat").html(data);
          console.log("CIM chat assets added.");
        })

        // Standard chat panel
        // $('body').append('<div class="cm-Chat-test"></div>');
        // $.get("/sites/all/modules/custom/cim_chat/panel.html", function(data){
        //   $(".cm-Chat-test").html(data);
        //   cm_InitiateChatClient('o3gaPVChkdyfiDgwGYvnNxj1Qwrtrp6i', 'https://chattest.ecmr.biz/ChatClient/Index');
        //   console.log("CIM chat assets added.");
        // })

        setTimeout(function () {
          cm_InitiateChatStatus(cimChatIds, 'https://chattest.ecmr.biz/ChatClient/StatusIndex');
        }, 2000);

        // CIM Status Widget
        if (!cimChatIds) {
          console.warn('Local CIM chat id data could not be loaded.');
          return;
        }

        // Add the CIM status iframe and setup event listener
        $('body').append('<div class="iframeWrapper cim-status"><iframe src="" style="vertical-align:top;"></iframe></div>');

        document.addEventListener("cmStatusByChatIdsUpdated", function (event) {
          Drupal.behaviors.cim_chatStatusByChatIdsUpdated(event);
        });
        
        // Event listener for chat status updates
        document[addEventListener ? 'addEventListener' : 'attachEvent']('cmChatStatus', 
          function (event) { 
            Drupal.behaviors.cim_chatChatStatusUpdate(event); 
          }
        );
      });
    }
  };

  Drupal.behaviors.cim_chatStatusByChatIdsUpdated = function (event) {
    object = event.detail;
    if (object) {
      object.forEach(Drupal.behaviors.cim_chatChatStatusHandler);
    }
  };

  Drupal.behaviors.cim_chatChatStatusHandler = function (item, index, arr) {
    var object = arr[index];
    var id = object.id;
    var status = object.status;
    var statusText = object.statusText;
    var btnId = '.'+id;
    console.log('ChatStatusHandler: ', btnId, status);
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
    $('.cyberhus-chats').append('<span class="chat-status ' + id + '" data-chat-status="' + status + '">' + cimChatIds.shortNames[id] + '</span');
    // Add click handler
    $( btnId ).on('click', {id: id}, Drupal.behaviors.cim_chatHandleChatBtnClick);
  };
  
  Drupal.behaviors.cim_chatHandleChatBtnClick = function(event) {
    var id = event.data.id,
        btnId = '.'+id,
        status = $(btnId).attr('data-chat-status'),
        queueText = Drupal.t(' - in queue');
    if (status === 'Ready') {
      cm_InitiateChatClient(id, 'https://chattest.ecmr.biz/ChatClient/Index');
      console.log('cm_status is', cm_status);
      console.log('cm_QueueStatus: ', cm_QueueStatus);
      setTimeout(function () {
        if (cm_IsChatReady) {
          cm_StartChat('[systembesked: bruger stillet i kø.]');
          console.log('CIM chat initiated by user!');
          $(btnId).attr('data-chat-status', status);
          $(btnId).append(queueText);
          return;
        }
        console.warn('CIM chat could not be initiated in 2 seconds.');
    }, 2000);

    }
  };

  Drupal.behaviors.cim_chatChatStatusUpdate = function (event) {
    var status = event.detail.status;
    console.log('chatStatusUpdate, status is : ', status);
    console.log('cm_status is', cm_status);
    console.log('cm_QueueStatus: ', cm_QueueStatus);
    // We assume that the 'Activ' state means that the counselor has taken the conversation
    // and we can show the chat window
    if (status === 'Activ'){
      cm_OpenChat();
      //@todo: change global widget state
    }
    // if (status === 'Ready')
    //   document.getElementById("cm-Chat-Start-Button-Svg").classList.add('cm-Chat-blink');
    // else
    //   document.getElementById("cm-Chat-Start-Button-Svg").classList.remove('cm-Chat-blink');
  };

})(jQuery, Drupal, cimChatIds);
