$ = jQuery;

var menuSpace = 0;

function alignMenu() {
	var leafs = $('#block-menu-menu-top-menu .leaf');
	//leafs.css({'margin-right': '0'});
	var number = leafs.size();
	var containerWidth = $('#block-menu-menu-top-menu').innerWidth();
	var totalWidth = $('#block-menu-menu-top-menu .menu').outerWidth();
	menuSpace = (containerWidth - totalWidth) / (number - 1);
	//leafs.css({'margin-right': menuSpace + 'px'});
	//$('#block-menu-menu-top-menu .leaf.last').css({'margin-right': '0'});
	if ($(window).width() > 980) {
		var equalWidth = containerWidth / number;
		leafs.css({'width': equalWidth + 'px'});
	} else {
		leafs.css({'width': ''});
	}
}

$(window).ready(alignMenu);
$(window).load(alignMenu);
$(window).resize(alignMenu);