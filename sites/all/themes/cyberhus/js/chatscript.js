// JavaScript Document
function open_window(window_name,file_name,width,height) {
  parameters = "width=" + width;
  parameters = parameters + ",height=" + height;
  parameters = parameters + ",status=no";
  parameters = parameters + ",resizable=no";
  parameters = parameters + ",scrollbars=no";
  parameters = parameters + ",menubar=no";
  parameters = parameters + ",toolbar=no";
  parameters = parameters + ",directories=no";
  parameters = parameters + ",location=no";
  vindue = window.open(file_name,window_name,parameters);
  //window.location.href='lyskryds.php';
  vindue.focus();
}
var newwindow = '';

iCurrentScriptID = 0;



function switchColorTo(chatstatus){
	ele = $(chatstatus);
	toffset = $("#lightContent").position();
	$(ele).css({position:"absolute",
		top:0,
		left:0
		});
	if(typeof(supersleightActive) != "undefined"){
		$("#lightContent").append(ele);
		supersleight.limitTo("lightContent");
		supersleight.run();
	}
	else{
		$(ele).css({display:"none"});
		$("#lightContent").append(ele);
		$(ele).siblings().fadeOut("def");
		$(ele).fadeIn("fast",function(){
		    $(this).siblings().remove();
		    });        }

}
function UpdateChat() {

  var main = document.getElementById("ScriptContainer");
  
  // clear old scripts
  if(el = main.firstChild)
    main.removeChild(el);
  
  // Append new script elm
  oNewScript = document.createElement("script");
  oNewScript.src = 'http://chat.cyberhus.dk/lyskryds.php?action=checklys&date=' + new Date();
  oNewScript.id = "chatscript_" + iCurrentScriptID++;
  oCurrentScript = oNewScript;
  
  document.getElementById("ScriptContainer").appendChild( oNewScript );
}

setInterval( UpdateChat, 20000 );
window.onload = function() { UpdateChat(); }
