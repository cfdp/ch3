<?php

function ungi_term_to_city($term, $small = false) {
	$location = ungi_get_field($term->field_lokation);
	$uri = taxonomy_term_uri($term);

	$city = new stdClass();
	$city->name = $term->name;
	$city->desc = $term->description;
	$city->lat = (empty($location['lat'])) ? 0 : $location['lat'];
	$city->lng = (empty($location['lng'])) ? 0 : $location['lng'];
	$city->x = round(ungi_map_x($city->lng, $small) - 8);
	$city->y = round(ungi_map_y($city->lat, $city->lng, $small) - 8);
	$city->url = url($uri['path']);
	$city->url = "ung-i/" . urlencode($term->name);
	$city->chatname = ungi_get_field_value($term->field_chatnavn);
	$city->chatport = ungi_get_field_value($term->field_chatport);
	$city->chattype = ungi_get_field_value($term->field_chattype);
	$city->chaturl = ungi_get_field_value($term->field_chat_url);
	$city->chatdesc = ungi_get_field_value($term->field_chatbeskrivelse);
	if (empty($city->chatdesc)) {
		$city->chatdesc = "";
	}
	return $city;
}

// Menu callback that list of cities and a map
function ungi_byer() {
	drupal_set_title("Ung i...");
	drupal_add_css(drupal_get_path('module', 'ungi') . '/css/ungi.css');

	$vocabulary = taxonomy_vocabulary_machine_name_load("ung_i_byer");
	$taxonomy = taxonomy_get_tree($vocabulary->vid, 0, NULL, TRUE);
	$cities = array();
	foreach ($taxonomy as $term) {
		$city = ungi_term_to_city($term);
		$cities[] = $city;
	}
	return theme('ungi_byer', array('cities' => $cities));
}

function ungi_by($termname) {
  $termname = urldecode($termname);
  $terms = taxonomy_get_term_by_name($termname, "ung_i_byer");
	$term = reset($terms);
  if ($term == '') {
    drupal_not_found();
  }
	$city = ungi_term_to_city($term, true);
	$nids = taxonomy_select_nodes($term->tid, FALSE);
	$nodes = node_load_multiple($nids);
	$views = node_view_multiple($nodes, 'full');

	drupal_set_title("Ung i " . $term->name);
	drupal_add_css(drupal_get_path('module', 'ungi') . '/css/ungi.css');
	//drupal_add_library('system', 'ui.accordion');
	drupal_add_js(drupal_get_path('module', 'ungi') . '/js/ungi-accordion.js');

	return theme('ungi_by', array('city' => $city, 'nodes' => $views));
}
