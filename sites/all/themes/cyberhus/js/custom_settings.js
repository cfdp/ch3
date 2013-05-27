TweenMax.selector = jQuery;
$ = jQuery;

$(function() {
	
	/**
	 * Custom Selects
	 */
	$('.form-select:visible').not('.customised-select').customSelect();


	/**
	 * Custom Checkboxes
	 */
	$('input:checkbox').screwDefaultButtons({ 
       checked: "url(/sites/all/themes/cyberhus/img/checkbox_checked.png)",
       unchecked:	"url(/sites/all/themes/cyberhus/img/checkbox_unchecked.png)",
       width:	 18,
       height:	 17
    });
	
});

/**
* bef menu
*/
function fix() {
	$('.form-type-bef-link a').click(function() {
	$('.form-type-bef-link').removeClass('selected');
	$(this).parent().addClass('selected');
});
}
	$(document).ready(function(){
	fix();
});
Drupal.behaviors.filter = {
	attach: function() {
	fix();
} 
}

// array af brevkasse, livsfortællinger, debat og ungeblog divs
	var box = new Array();
	box[1] = "#block-views-cyberhus-stuen-view-block .view-id-cyberhus_stuen_view .view-display-id-attachment_1";
	box[3] = "#block-views-cyberhus-stuen-view-block .view-id-cyberhus_stuen_view .view-display-id-attachment_3";
	box[4] = "#block-views-cyberhus-stuen-view-block .view-id-cyberhus_stuen_view .view-display-id-attachment_4";
	box[5] = "#block-views-cyberhus-stuen-view-block .view-id-cyberhus_stuen_view .view-display-id-attachment_5";
	var boxes = box.join(",");
	
	// array af synlige elementer på artikel og voksneblog divs
	var box2 = new Array();
	box2[1] = "#block-views-cyberhus-stuen-view-block .view-id-cyberhus_stuen_view .view-display-id-attachment_2";
	box2[2] = "#block-views-cyberhus-stuen-view-block .view-id-cyberhus_stuen_view .view-display-id-attachment_7";
	box2[3] = "#block-views-cyberhus-stuen-view-block .view-id-cyberhus_stuen_view .view-display-id-attachment_6 .views-field-field-anmeldelse-billede img"; 
	var boxes2 = box2.join(",");
	
	//voksenblog skjulte elementer
	var voksenblog = new Array();
	voksenblog[1] = "#block-views-cyberhus-stuen-view-block .view-id-cyberhus_stuen_view .view-display-id-attachment_2 .views-field-title"; //voksenblog - titel
	voksenblog[2] = "#block-views-cyberhus-stuen-view-block .view-id-cyberhus_stuen_view .view-display-id-attachment_2 .views-field-created"; //voksenblog - created
	voksenblog[3] = "#block-views-cyberhus-stuen-view-block .view-id-cyberhus_stuen_view .view-display-id-attachment_2 .views-field-body"; //voksenblog - body
	voksenblog[4] = "#block-views-cyberhus-stuen-view-block .view-id-cyberhus_stuen_view .view-display-id-attachment_2 .views-field-view-node"; //voksenblog - link
	var voksenblogs = voksenblog.join(",");
	
	
	$(document).ready(function(){
		fix();
		
	
		
		//timeline to brevkasse, livsfortælling, debat og ungeblog	
		var timeline = new TimelineMax({onComplete:timelineRestart});
		timeline.append( new TweenMax(box[1], 3, {opacity:"1", display:'block', ease:Expo.easeIn}) );
		timeline.append( new TweenMax(box[1], 3, {opacity:"0", display:'none', ease:Expo.easeIn}) );
		timeline.append( new TweenMax(box[3], 3, {opacity:"1", display:'block', ease:Expo.easeIn}) );
		timeline.append( new TweenMax(box[3], 3, {opacity:"0", display:'none', ease:Expo.easeIn}) );
		timeline.append( new TweenMax(box[4], 3, {opacity:"1", display:'block', ease:Expo.easeIn}) );
		timeline.append( new TweenMax(box[4], 3, {opacity:"0", display:'none', ease:Expo.easeIn}) );
		timeline.append( new TweenMax(box[5], 3, {opacity:"1", display:'block', ease:Expo.easeIn}) );
		timeline.append( new TweenMax(box[5], 3, {opacity:"0", display:'none', ease:Expo.easeIn}) );
		timeline.addLabel("box1", 3);
		timeline.addLabel("box3", 9);
		timeline.addLabel("box4", 15);
		timeline.addLabel("box5", 21);
		
		//timeline restart
		function timelineRestart() {
			timeline.restart();
		}
		
		function timelineTime(){
			if(timeline.totalTime()<6){
				timeline.gotoAndPlay(6);
			}
			else if(timeline.totalTime()>6 &&  timeline.totalTime()<12){
				timeline.gotoAndPlay(12);
			}
			else if(timeline.totalTime()>12 &&  timeline.totalTime()<18){
				timeline.gotoAndPlay(18);
			}
			else if(timeline.totalTime()>18 &&  timeline.totalTime()<24){
				timeline.gotoAndPlay(0);
			}
		}
		
		// timeline pause on hover and focus on hovered element
		$(boxes).mouseenter(function(){
			timeline.stop();
			var boxObject = $(this);
			TweenMax.to(boxObject, 1, {opacity:"100", display:'block' , ease:Expo.easeIn});
		});
		
		// fades hovered element out and continue timeline
		$(box[1]).mouseleave(function(){
			timeline.gotoAndPlay("box1");
		});
		$(box[3]).mouseleave(function(){
			timeline.gotoAndPlay("box3");
		});
		$(box[4]).mouseleave(function(){
			timeline.gotoAndPlay("box4");
		});
		$(box[5]).mouseleave(function(){
			timeline.gotoAndPlay("box5");
		});
		
		// voksenblog mouseenter/leave
		$(box2[1]).mouseenter(function(){
			TweenMax.to(box2[1], 2, {height:"237px"});
			TweenMax.to(voksenblogs, 3, {opacity:"1", display:"block"});
			
			timeline.stop();
			TweenMax.to(boxes, 2, {opacity:"0", display:'none'});
		});
		$(box2[1]).mouseleave(function(){
			TweenMax.to(box2[1], 3, {height:"20px"});
			TweenMax.to(voksenblogs, 2, {opacity:"0", display:"none"});
			timelineTime();
		});
		
		
		
	});