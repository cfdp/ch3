var chatWidgetServerURL,
    el = document.querySelector('#cim-widget-data');
chatWidgetServerURL = el.getAttribute('data-test-url') || "https://cyberhus.dk";
  
function loadCssFiles(){
  var cssFiles = [chatWidgetServerURL + "/sites/all/modules/custom/cim_chat/css/cim-chat.css","https://chat.ecmr.biz/Content/chatclient/cm.chatclient.css"];
  cssFiles.forEach(element => {
    $("<link/>", {
      rel: "stylesheet",
      type: "text/css",
      href: element
      }).appendTo("head");
  });
};

/*! loadJS: load a JS file asynchronously. [c]2014 @scottjehl, Filament Group, Inc. (Based on http://goo.gl/REQGQ by Paul Irish). Licensed MIT */
(function( w ){
	var loadJS = function( src, cb, ordered ){
		"use strict";
		var tmp;
		var ref = w.document.getElementsByTagName( "script" )[ 0 ];
		var script = w.document.createElement( "script" );

		if (typeof(cb) === 'boolean') {
			tmp = ordered;
			ordered = cb;
			cb = tmp;
		}

		script.src = src;
		script.async = !ordered;
		ref.parentNode.insertBefore( script, ref );

		if (cb && typeof(cb) === "function") {
			script.onload = cb;
		}
		return script;
	};
	// commonjs
	if( typeof module !== "undefined" ){
		module.exports = loadJS;
	}
	else {
		w.loadJS = loadJS;
	}
}( typeof global !== "undefined" ? global : this ));


// Load CSS once jQuery is ready
if (typeof jQuery == 'undefined') {
  loadJS("https://code.jquery.com/jquery-1.8.3.min.js", true, function() {
    loadCssFiles();
  });
}
else {
  loadCssFiles();
}

loadJS(chatWidgetServerURL + "/sites/all/modules/custom/cim_chat/js/cim_chat_page_widget.js", true);
loadJS(chatWidgetServerURL + "/sites/all/modules/custom/cim_chat/js/jquery.loadTemplate.js", true, function() {
  console.log('allryghty');
})
