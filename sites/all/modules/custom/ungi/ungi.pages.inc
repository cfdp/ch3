<?php

// Menu callback that list of cities and a map
function ungi_byer() {
	drupal_set_title("Ung i...");
	drupal_add_css(drupal_get_path('module', 'ungi') . '/css/ungi.css');
	
	$vocabulary = taxonomy_vocabulary_machine_name_load("ung_i_byer");
	$taxonomy = taxonomy_get_tree($vocabulary->vid, 0, NULL, TRUE);
	//dpm($taxonomy);
	$cities = array();
	foreach ($taxonomy as $term) {
		if (!empty($term->field_lokation)) {
			$location = reset(reset($term->field_lokation));
		} else {
			$location = array();
		}
		$uri = taxonomy_term_uri($term);
		
		$city = new stdClass();
		$city->name = $term->name;
		$city->lat = (empty($location['lat'])) ? 0 : $location['lat'];
		$city->lng = (empty($location['lng'])) ? 0 : $location['lng'];
		$city->x = (ungi_map_x($city->lng) - 10);
		$city->y = (ungi_map_y($city->lat) - 10);
		$city->url = url($uri['path']);
		$city->chaturl = "";
		$city->chatdesc = $term->name . " har pt. ingen chat";
		$cities[] = $city;
	}
	return theme('ungi_byer', array('cities' => $cities));
}
