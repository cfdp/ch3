var el = document.querySelector('#cim-widget-data'),
  stagingSite = 'http://dev.cyberhus',
	chatWidgetServerURL = (el && el.getAttribute('data-cyberhus-test-url'))
							? el.getAttribute('data-cyberhus-test-url') 
							: ( stagingSite || "https://cyberhus.dk"),
	chatServerURL = (el && el.getAttribute('data-cim-test-url')) 
						? el.getAttribute('data-cim-test-url')
						: 'https://chat.ecmr.biz',
	integratorLoaded;

function loadCssFiles(){
  var cssFiles = [
	  chatWidgetServerURL + "/sites/all/modules/custom/cim_chat/css/cim-chat.css",
  		chatWidgetServerURL + "/sites/all/modules/custom/cim_chat/css/dot-flashing.css", 
    	chatServerURL + "/Content/chatclient/cm.chatclient.css"];
  cssFiles.forEach(element => {
    jQuery("<link/>", {
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


if (!integratorLoaded) {
	// Make sure we only load the integrator-script once.
	integratorLoaded = true;
	if ((typeof jQuery == 'undefined')) {
		loadJS("https://code.jquery.com/jquery-1.8.3.min.js", true, function() {
		loadCssFiles();
		});
	}
	else {
		loadCssFiles();
	}
	loadJS(chatWidgetServerURL + "/sites/all/modules/custom/cim_chat/js/tmpl.min.js", true);
	loadJS(chatWidgetServerURL + "/sites/all/modules/custom/cim_chat/js/cim_chat.js", true);
}



