<?php

function editabletext_admin_list() {
	$output = '';
	$rows = array();
	// Define headers for table theme output and for sorting in db_select.
	$header = array(
		'name' => array('data' => t('Label'), 'field' => 'label', 'sort' => 'asc'),
		'category' => array('data' => t('Category'), 'field' => 'category', 'sort' => 'asc'),
		'default_text' => array('data' => t('Text'), 'field' => 'default_text', 'sort' => 'asc'),
		'operations' => array('data' => t('Operations'), 'colspan' => 2),
	);


	$query = db_select('editabletext', 'd');
	$query = $query->extend('PagerDefault')->extend('TableSort');
	$query->fields('d', array('label', 'category', 'default_text'))
			// Add order by headers.
			->orderByHeader($header)
			// Add limit for pager.
			->limit(30);
	$result = $query->execute();

	// Loop through each result
	foreach ($result as $record) {
		$string = i18n_string_get_string('editabletext:' . $record->label);
		$rows[] = array(
			l($record->label, 'admin/config/regional/editabletext/edit/' . $record->label),
			$record->category,
			l(truncate_utf8(strip_tags($string->source), 30, TRUE, TRUE), 'admin/config/regional/editabletext/edit/' . $record->label),
			l(t('Edit'), 'admin/config/regional/editabletext/edit/' . $record->label),
			(user_access('delete editable texts')) ? l(t('Delete'), 'admin/config/regional/editabletext/delete/' . $record->label) : '',
		);
	}


	// If rows are not empty theme the rows.
	if (!empty($rows)) {
		$output .= theme(
				'table', array(
			'header' => $header,
			'rows' => $rows
				)
		); //theme as table
		$output .= theme('pager');
	}


	// If rows are empty display message.
	else {
		$output .= t("No texts were found.");
	}

	return $output;
}

function editabletext_admin_edit($form, &$form_state, $label = '') {
	$string = i18n_string_get_string('editabletext:' . $label);
	drupal_set_title(t('Edit "!title"', array('!title' => truncate_utf8(strip_tags($string->source), 30, TRUE, TRUE))));
	$languages = locale_language_list();

	$form = array();

	$form['label'] = array(
		'#type' => 'hidden',
		'#value' => $label,
	);

	$langcode = i18n_string_source_language();
	if (!isset($languages[$langcode]))
		$languages[$langcode] = 'Unknown';
	$form[$langcode] = array(
		'#type' => 'text_format',
		'#title' => t($languages[$langcode]),
		'#default_value' => $string->source,
	);

	foreach ($languages as $langcode => $language) {
		if ($langcode != i18n_string_source_language()) {
			$string->get_translation($langcode);
			$form[$langcode] = array(
				'#type' => 'text_format',
				'#title' => t($languages[$langcode]),
				'#default_value' => $string->translations[$langcode] ? $string->translations[$langcode] : '',
			);
		}
	}

	$form['submit'] = array(
		'#type' => 'submit',
		'#value' => t('Save'),
	);

	return $form;
}

function editabletext_admin_edit_submit($form, &$form_state) {
	$languages = locale_language_list();
	$label = $form_state['values']['label'];

	$langcode = i18n_string_source_language();
	$default_text = $form_state['values'][$langcode]['value'];
	$name = 'editabletext:' . $label;

	if ($source = i18n_string_get_source($name)) {
		i18n_string_update('editabletext:' . $label, $default_text, array('format' => 'full_html', 'messages' => FALSE));
	}

	foreach ($languages as $langcode => $language) {
		if ($form_state['values'][$langcode] != '') {
			//i18n_string_translation_update('editabletext:' . $label, $form_state['values'][$langcode], $langcode, $default_text);
			if ($langcode == i18n_string_source_language()) {
				// It's the default language so we should update the string source as well.
				i18n_string_update('editabletext:' . $label, $default_text, array('format' => 'full_html', 'messages' => FALSE));
			} else {
				list ($textgroup, $context) = i18n_string_context('editabletext:' . $label);
				i18n_string_textgroup($textgroup)->update_translation($context, $langcode, $form_state['values'][$langcode]['value']);
			}
		}
	}

	drupal_set_message(t('Translation for %translation has been updated.', array('%translation' => truncate_utf8(strip_tags($default_text), 30, TRUE, TRUE))));
	drupal_goto('admin/config/regional/editabletext');
}

/**
 * Menu callback -- ask for confirmation of editable text deletion
 */
function editabletext_admin_delete_confirm($form, &$form_state, $label) {
	$string = i18n_string_get_string('editabletext:' . $label);

	// Always provide entity id in the same form key as in the entity edit form.
	$form['label'] = array('#type' => 'value', '#value' => $label);
	return confirm_form($form, t('Are you sure you want to delete "%text"?', array('%text' => truncate_utf8($string->source, 30, TRUE, TRUE))), 'admin/config/regional/editabletext', t('This action cannot be undone.'), t('Delete'), t('Cancel')
	);
}

/**
 * Execute inventory deletion
 */
function editabletext_admin_delete_confirm_submit($form, &$form_state) {
	if ($form_state['values']['confirm']) {
		$label = $form_state['values']['label'];
		$string = i18n_string_get_string('editabletext:' . $label);
		db_delete('editabletext')
				->condition('label', $label)
				->execute();
		// TODO: delete incoming
		drupal_set_message(t('"%text" has been deleted.', array('%text' => truncate_utf8($string->source, 30, TRUE, TRUE))));
		i18n_string_remove('editabletext:' . $label, $string->source);
	}

	$form_state['redirect'] = 'admin/config/regional/editabletext';
}

function editabletext_admin_configure($form, &$form_state) {
	$form = array();

	$options = array(
		1 => t('Yes') . ' (' . t('Development') . ')',
		0 => t('No') . ' (' . t('Production') . ')',
	);
	$form['create_strings'] = array(
		'#type' => 'radios',
		'#title' => t('Create and update texts from code?'),
		'#options' => $options,
		'#default_value' => intval(variable_get('editabletext_create_strings', TRUE)),
	);

	$form['submit'] = array(
		'#type' => 'submit',
		'#value' => t('Save'),
	);

	return $form;
}

function editabletext_admin_configure_submit($form, &$form_state) {
	variable_set('editabletext_create_strings', $form_state['values']['create_strings'] == 1);
}