<?php
/**
 * @file
 * Different editors for Image Editor module.
 */

/**
 * Implements hook_imageeditor_editors().
 */
function imageeditor_imageeditor_editors() {
  global $user, $language, $is_https;
  $close_path = 'imageeditor/ajax/close';
  $save_path = 'imageeditor/ajax/save';
  $editors = array(
    'pixlr_editor' => array(
      'name' => t('Pixlr Editor'),
      'description' => t('Advanced Photoshop like editor'),
      'class' => 'pixlr-editor',
      'site' => 'http://pixlr.com',
      'api_key' => FALSE,
      'image_creation' => TRUE,
      'launch_type' => 'overlay',
      'image_url_param' => 'image',
      'options' => array(
        'launch_url' => ($is_https ? 'https' : 'http') . '://pixlr.com/editor/',
        'exit' => url($close_path . '/pixlr', array('absolute' => TRUE)),
        'loc' => property_exists($user, 'language') ? $user->language : $language->language,
        //'referrer' => 'Drupal: ' . url('', array('absolute' => TRUE)),
        'referrer' => 'Drupal',
        'credentials' => 'false',
        'target' => url($save_path . '/pixlr_editor', array('absolute' => TRUE)),
      ),
      'save_callback' => 'imageeditor_pixlr_editor_save_callback',
    ),
    'pixlr_express' => array(
      'name' => t('Pixlr Express'),
      'description' => t('Photo editor'),
      'class' => 'pixlr-express',
      'site' => 'http://pixlr.com',
      'api_key' => FALSE,
      'image_creation' => TRUE,
      'launch_type' => 'overlay',
      'image_url_param' => 'image',
      'options' => array(
        'launch_url' => ($is_https ? 'https' : 'http') . '://pixlr.com/express/',
        'exit' => url($close_path . '/pixlr', array('absolute' => TRUE)),
        'loc' => property_exists($user, 'language') ? $user->language : $language->language,
        //'referrer' => 'Drupal: ' . url('', array('absolute' => TRUE)),
        'referrer' => 'Drupal',
        'credentials' => 'false',
        'target' => url($save_path . '/pixlr_express', array('absolute' => TRUE)),
      ),
      'save_callback' => 'imageeditor_pixlr_express_save_callback',
    ),
    'picmonkey' => array(
      'name' => t('PicMonkey'),
      'description' => t('Photo editor'),
      'class' => 'picmonkey',
      'site' => 'http://www.picmonkey.com/',
      'api_key' => FALSE,
      'api_key_codename' => 'imageeditor_picmonkey_api_key',
      'image_creation' => TRUE,
      'launch_type' => 'overlay',
      'image_url_param' => '_import',
      'options' => array(
        '_apikey' => variable_get('imageeditor_picmonkey_api_key', ''),
        'launch_url' => ($is_https ? 'https' : 'http') . '://www.picmonkey.com/service/',
        '_close_target' => url($close_path . '/picmonkey', array('absolute' => TRUE)),
        '_export_agent' => 'browser',
        '_export_method' => 'GET',
        '_export_title' => 'Save to ' . variable_get('site_name', ''),
        '_host_name' => variable_get('site_name', ''),
        '_replace' => 'ask', // Picmonkey will ask: replace an image or create a new one.
        //'_expand_button' => 'true', //adds Expand button and calls onPicknikExpand function
        //'_original_thumb' => '', //url to thumbnail
        '_export' => url($save_path . '/picmonkey', array('absolute' => TRUE)),
      ),
      'lang_option' => '_locale',
      'lang_default' => 'en_US',
      'lang_map' => array(
        'en'=> 'en_US', //English
        'de'=> 'de_DE', //German
        'es'=> 'es_ES', //Spanish
        'fr'=> 'fr_FR', //French
        'it'=> 'it_IT', //Italian
        'ja'=> 'jp_JP', //Japanese
        'ru'=> 'ru_RU', //Russian
        'zh-hans'=> 'zh_CN', //Chinese simplified
        'zh-hant'=> 'zh_HK', //Chinese traditional
        'id' => 'id_ID', //Indonesian
        'ko' => 'ko_KR', //Korean
        'nn' => 'no_NO', //Norwegian Nynorsk
        'nb' => 'no_NO', //Norwegian Bokmal
        'pt-br' => 'pt_BR', //Portuguese Brazil
        'pt-pt' => 'pt_BR', //Portuguese Portugal
        'sv' => 'sv_SV', //Swedish
        'vi' => 'vi_VN', //Vietnamese
      ),
      'save_callback' => 'imageeditor_picmonkey_save_callback',
    ),
    'sumopaint' => array(
      'name' => t('Sumo Paint'),
      'description' => t('Advanced image editor'),
      'class' => 'sumopaint',
      'site' => 'http://www.sumopaint.com/home/',
      'api_key' => TRUE,
      'api_key_codename' => 'imageeditor_sumopaint_api_key',
      'image_creation' => TRUE,
      'launch_type' => 'overlay',
      'image_url_param' => 'url',
      'options' => array(
        'key' => variable_get('imageeditor_sumopaint_api_key', ''),
        'launch_url' => 'http://www.sumopaint.com/app/',
        'service' => 'Save to ' . variable_get('site_name', ''),
        //'opt' => 'test',
        'target' => url($save_path . '/sumopaint', array('absolute' => TRUE)),
      ),
      'save_callback' => 'imageeditor_sumopaint_save_callback',
    ),
    'aviary_feather' => array(
      'name' => t('Aviary Feather'),
      'description' => t('Simple photo editor - only edit images, no create new image option'),
      'class' => 'aviary-feather',
      'site' => 'http://www.aviary.com/',
      'api_key' => TRUE,
      'api_key_codename' => 'imageeditor_aviary_api_key',
      'image_creation' => FALSE,
      // Loading_url is used to show smth while the image is loading.
      'loading_url' => file_create_url(drupal_get_path('module', 'imageeditor') . '/css/images/sources/aviary.ico'),
      'options' => array(
        'apiKey' => variable_get('imageeditor_aviary_api_key', ''),
        'apiVersion' => 3,
        //'noCloseButton' => 'true',
        'theme' => variable_get('imageeditor_aviary_feather_theme', 'dark'),
        'tools' => variable_get('imageeditor_aviary_feather_tools', 'all'),
        'closeonsave' => variable_get('imageeditor_aviary_feather_closeonsave', 1),
      ),
      'initialize_callback' => 'imageeditor_aviary_feather_initialize_callback',
      'save_callback' => 'imageeditor_aviary_feather_save_callback',
      'settings_form_callback' => 'imageeditor_aviary_feather_settings_form_callback',
    ),
    'paintweb' => array(
      'name' => t('PaintWeb'),
      'description' => t('Open-source HTML 5 image editor'),
      'class' => 'paintweb',
      'site' => 'http://code.google.com/p/paintweb/',
      'api_key' => FALSE,
      'image_creation' => TRUE,
      'launch_type' => 'overlay',
      'options' => array(
        'configFile' => 'config-example.json',
        'saveurl' => url($save_path . '/paintweb', array('absolute' => TRUE)),
      ),
      'initialize_callback' => 'imageeditor_paintweb_initialize_callback',
      'save_callback' => 'imageeditor_paintweb_save_callback',
    ),
    'svgedit' => array(
      'name' => t('SVG-edit'),
      'description' => 'EXPERIMENTAL: ' . t('Open-source SVG image editor'),
      'class' => 'svgedit',
      'site' => 'http://code.google.com/p/svg-edit/',
      'api_key' => FALSE,
      'image_creation' => TRUE,
      'launch_type' => 'overlay',
      'image_url_param' => 'image',
      'options' => array(
        'saveurl' => url($save_path . '/svgedit', array('absolute' => TRUE)),
      ),
      'initialize_callback' => 'imageeditor_svgedit_initialize_callback',
      'save_callback' => 'imageeditor_svgedit_save_callback',
    ),
    'fotoflexer' => array(
      'name' => t('FotoFlexer'),
      'description' => t('Simple photo editor'),
      'class' => 'fotoflexer',
      'site' => 'http://fotoflexer.com/',
      'api_key' => FALSE,
      'image_creation' => TRUE,
      'launch_type' => 'popup',
      'image_url_param' => 'ff_image_url',
      'options' => array(
        'launch_url' => 'http://fotoflexer.com/API/API_Loader_v1_01.php',
        'ff_cancel_url' => url($close_path . '/fotoflexer', array('absolute' => TRUE)),
        'ff_callback_url' => url($save_path . '/fotoflexer', array('absolute' => TRUE)),
      ),
      'lang_option' => 'ff_lang',
      'lang_default' => 'en-US',
      'lang_map' => array(
        'en'=> 'en-US', //English
        'de'=> 'de-DE', //German
        'es'=> 'es-ES', //Spanish
        'fr'=> 'fr-FR', //French
        'it'=> 'it-IT', //Italian
        'ja'=> 'ja-JP', //Japanese
        'ru'=> 'ru-RU', //Russian
        'zh-hans'=> 'zh-CN', //Chinese simplified 
        'zh-hant'=> 'zh-TW', //Chinese traditional
        'ko' => 'ko-KR', //Korean
        'nb' => 'nb-NO', //Norwegian Bokmal
        'pl' => 'pl-PL', //Polish
        'pt-br' => 'pt-BR', //Portuguese Brazil
        'pt-pt' => 'pt-PT', //Portuguese Portugal
        'sv' => 'sv_SE', //Swedish
        'vi' => 'vi-VN', //Vietnamese
        'da' => 'da-DK', //Danish
        'nl' => 'nl-NL', //Dutch
        'fi' => 'fi-FI', //Finnish
        'tr' => 'tu-TR', //Turkish
      ),
      'save_callback' => 'imageeditor_fotoflexer_save_callback',
    ),
    'snipshot' => array(
      'name' => t('Snipshot'),
      'description' => t('Snipshot editor'),
      'class' => 'snipshot',
      'site' => 'http://snipshot.com/',
      'api_key' => FALSE,
      'image_creation' => TRUE,
      'launch_type' => 'overlay',
      'image_url_param' => 'snipshot_input',
      'options' => array(
        'launch_url' => 'http://services.snipshot.com',
        'snipshot_callback' => url($save_path . '/snipshot', array('absolute' => TRUE)),
        'snipshot_callback_agent' => 'user', //either 'snipshot' or 'user'
        'snipshot_output' => 'image',
      ),
      'save_callback' => 'imageeditor_snipshot_save_callback',
    ),
    'flauntr_styler' => array(
      'name' => t('flauntR stylR'),
      'description' => 'NOT SAVING BACK: ' . t('Advanced image editor'),
      'class' => 'flauntr-styler',
      'site' => 'http://www.flauntr.com/',
      'api_key' => FALSE,
      'image_creation' => TRUE,
      'launch_type' => 'overlay',
      'image_url_param' => 'url',
      'options' => array(
        'launch_url' => 'http://www.flauntr.com/flauntr/applauncher.do',
        'app' => 'styler',
      ),
    ),
    'deviantartmuro' => array(
      'name' => t('DeviantART Muro'),
      'description' => t('Advanced HTML5 editor'),
      'class' => 'deviantartmuro',
      'site' => 'http://sta.sh/muro/',
      'api_key' => FALSE,
      'image_creation' => TRUE,
      'launch_type' => 'overlay',
      'options' => array(
        'saveurl' => url($save_path . '/deviantartmuro', array('absolute' => TRUE)),
      ),
      'initialize_callback' => 'imageeditor_deviantartmuro_initialize_callback',
    ),
    'imageeditor_photobooth' => array(
      'name' => t('Image Editor Photobooth'),
      'description' => t('Take an image from an HTML5 Webcam'),
      'class' => 'imageeditor-photobooth',
      'site' => 'http://wolframhempel.github.com/photobooth-js/',
      'api_key' => FALSE,
      'image_creation' => TRUE,
      'launch_type' => 'overlay',
      'options' => array(
        'saveurl' => url($save_path . '/imageeditor_photobooth', array('absolute' => TRUE)),
      ),
      'initialize_callback' => 'imageeditor_imageeditor_photobooth_initialize_callback',
      'save_callback' => 'imageeditor_imageeditor_photobooth_save_callback',
    ),
    'imageeditor_webcam' => array(
      'name' => t('Image Editor Webcam'),
      'description' => 'NOT WORKING: ' . t('Take an image from a Webcam'),
      'class' => 'imageeditor-webcam',
      'site' => 'http://www.xarg.org/project/jquery-webcam-plugin/',
      'api_key' => FALSE,
      'image_creation' => TRUE,
      'launch_type' => 'overlay',
      'image_url_param' => 'image',
      'options' => array(
        'launch_url' => url('imageeditor/webcam'),
      ),
      'save_callback' => 'imageeditor_imageeditor_webcam_save_callback',
    ),
    'imageeditor_scriptcam' => array(
      'name' => t('Image Editor ScriptCam'),
      'description' => 'NOT WORKING: ' . t('Take an image from a Webcam'),
      'class' => 'imageeditor-scriptcam',
      'site' => 'http://www.scriptcam.com/',
      'api_key' => FALSE,
      'image_creation' => TRUE,
      'launch_type' => 'overlay',
      'image_url_param' => 'image',
      'options' => array(
        'launch_url' => url('imageeditor/scriptcam'),
      ),
      'save_callback' => 'imageeditor_imageeditor_scriptcam_save_callback',
    ),
  );

  return $editors;
}

function imageeditor_pixlr_editor_save_callback() {
  $image = '';
  if (isset($_GET['image'])) {
    $directory = imageeditor_temporary_directory();
    $data = drupal_http_request(rawurldecode($_GET['image']));
    $destination = $directory . '/' . $_GET['title'] . '.' . $_GET['type'];
    $file = file_unmanaged_save_data($data->data, $destination, FILE_EXISTS_REPLACE);
    $image = file_create_url($file);
  }
  $js_code = 'if (parent) {';
  $js_code .= 'parent.Drupal.settings.imageeditor.save.image = "' . $image . '";';
  $js_code .= 'parent.Drupal.imageeditor.save();';
  $js_code .= 'parent.Drupal.imageeditor.overlay.hide();';
  $js_code .= '}';
  drupal_add_js($js_code, 'inline');
}

function imageeditor_pixlr_express_save_callback() {
  imageeditor_pixlr_editor_save_callback();
}

function imageeditor_picmonkey_save_callback() {
  $image = '';
  if (isset($_GET['file'])) {
    $directory = imageeditor_temporary_directory();
    $data = drupal_http_request(rawurldecode($_GET['file']));
    $destination = $directory . '/' . $_COOKIE['imageeditor_filename'];
    $file = file_unmanaged_save_data($data->data, $destination, FILE_EXISTS_REPLACE);
    $image = file_create_url($file);
  }
  $js_code = 'if (parent) {';
  if (isset($_GET['_imageid'])) {
    $js_code .= 'parent.Drupal.settings.imageeditor.save.replace = ' . 1 . ';';
  }
  else {
    $js_code .= 'parent.Drupal.settings.imageeditor.save.replace = ' . 0 . ';';
  }
  $js_code .= 'parent.Drupal.settings.imageeditor.save.image = "' . $image . '";';
  $js_code .= 'parent.Drupal.imageeditor.save();';
  $js_code .= 'parent.Drupal.imageeditor.overlay.hide();';
  $js_code .= '}';
  drupal_add_js($js_code, 'inline');
}

function imageeditor_sumopaint_save_callback() {
  $directory = imageeditor_temporary_directory();
  $image = '';
  if (isset($_POST['data'])) {
    if ($_POST['url']) {
      $destination = $directory . '/' . basename($_POST['url']);
    }
    else {
      $destination = $directory . '/' . md5($_POST['data']) . '.png';
    }
    $file = file_unmanaged_save_data(base64_decode($_POST['data']), $destination);
    $image = file_create_url($file);
  }
  $js_code = 'if (opener) {';
  $js_code .= 'opener.Drupal.settings.imageeditor.save.image = "' . $image . '";';
  $js_code .= 'opener.Drupal.imageeditor.save();';
  $js_code .= 'self.close();';
  $js_code .= '}';
  drupal_add_js($js_code, 'inline');
}

function imageeditor_aviary_feather_initialize_callback(&$editor) {
  global $is_https;
  if ($is_https) {
    drupal_add_js('https://dme0ih8comzn4.cloudfront.net/js/feather.js', 'external');
  }
  else {
    drupal_add_js('http://feather.aviary.com/js/feather.js', 'external');
  }
  if (variable_get('imageeditor_aviary_feather_secret', '')) {
    $signature = md5(variable_get('imageeditor_aviary_api_key', '') . variable_get('imageeditor_aviary_feather_secret', '') . REQUEST_TIME);
    $editor['options']['timestamp'] = REQUEST_TIME;
    $editor['options']['signature'] = $signature;
  }
}

function imageeditor_aviary_feather_save_callback() {
  $image = '';
  if (isset($_POST['imageurl'])) {
    $image = rawurldecode($_POST['imageurl']);
  }
  elseif (isset($_GET['imageurl'])) {
    $image = rawurldecode($_GET['imageurl']);
  }
  $js_code = 'if (parent.parent) {';
  $js_code .= 'parent.parent.Drupal.settings.imageeditor.save.image = "' . $image . '";';
  $js_code .= 'parent.parent.Drupal.imageeditor.save();';
  $js_code .= 'parent.parent.Drupal.imageeditor.overlay.hide();';
  $js_code .= '}';
  drupal_add_js($js_code, 'inline');
}

function imageeditor_aviary_feather_settings_form_callback() {
  $form = array(
    '#type' => 'fieldset',
    '#title' => t('Special Aviary Feather options'),
    '#description' => t('Aviary Feather editor allows for additional options'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['imageeditor_aviary_feather_tools'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tools'),
    '#description'   => t('Specify comma-separated string of tools. See !link.',
      array('!link' => l(t('Aviary documentation'), 'http://developers.aviary.com/docs/web/setup-guide',
        array('external' => TRUE, 'fragment' => 'constructor-config-tools', 'attributes' => array('target' => '_blank'))))),
    '#default_value' => variable_get('imageeditor_aviary_feather_tools', 'all'),
    '#size'          => 100,
    '#maxlength'     => 150,
    '#required'      => TRUE,
    '#weight'        => 10,
  );
  $form['imageeditor_aviary_feather_theme'] = array(
    '#type' => 'select',
    '#title' => t('Theme'),
    '#description' => t('Choose color theme for Aviary Feather editor.'),
    '#options' => array(
      'dark' => 'dark',
      'light' => 'light',
      'minimum' => 'minimum',
    ),
    '#default_value' => variable_get('imageeditor_aviary_feather_theme', 'dark'),
    '#weight' => 15,
  );
  $form['imageeditor_aviary_feather_closeonsave'] = array(
    '#type' => 'checkbox',
    '#title' => t('Close on save.'),
    '#description' => t('Close Aviary Feather editor after clicking the Save button.'),
    '#default_value' => variable_get('imageeditor_aviary_feather_closeonsave', 1),
    '#weight' => 20,
  );
  $form['imageeditor_aviary_feather_secret'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Secret API key'),
    '#description'   => t('Secret API key is needed to edit high resolution images.'),
    '#default_value' => variable_get('imageeditor_aviary_feather_secret', ''),
    '#size'          => 50,
    '#maxlength'     => 100,
    '#required'      => FALSE,
    '#weight'        => 25,
  );

  return $form;
}

function imageeditor_paintweb_initialize_callback(&$editor) {
  if (module_exists('libraries')) {
    drupal_add_js(libraries_get_path('paintweb') . '/build/paintweb.src.js');
  }
  else {
    drupal_add_js('sites/all/libraries/paintweb' . '/build/paintweb.src.js');
  }
}

function imageeditor_paintweb_save_callback() {
  $directory = imageeditor_temporary_directory();
  if (isset($_POST['data'])) {
    if ($_POST['url'] && $_POST['url'] != 'undefined') {
      $destination = $directory . '/' . basename($_POST['url']);
    }
    else {
      $destination = $directory . '/' . md5($_POST['data']) . '.png';
    }
    list(, $data) = explode(',', $_POST['data']);
    $file = file_unmanaged_save_data(base64_decode($data), $destination);
    drupal_json_output(file_create_url($file));
    exit;
  }
}

function imageeditor_svgedit_initialize_callback(&$editor) {
  $language_default = language_default();
  $language_default->prefix = '';
  if (module_exists('libraries')) {
    $editor['options']['launch_url'] = url(libraries_get_path('svgedit') . '/svg-editor.html', array('query' => array('extensions' => 'ext-markers.js,ext-connector.js,ext-eyedropper.js,ext-arrows.js,ext-imageeditor.js'), 'absolute' => TRUE, 'language' => $language_default));
  }
  else {
    $editor['options']['launch_url'] = url('sites/all/libraries/svgedit' . '/svg-editor.html', array('query' => array('extensions' => 'ext-markers.js,ext-connector.js,ext-eyedropper.js,ext-arrows.js,ext-imageeditor.js'), 'absolute' => TRUE, 'language' => $language_default));
  }
}

function imageeditor_svgedit_save_callback() {
  $directory = imageeditor_temporary_directory();
  $image = '';
  if (isset($_POST['output_png'])) {
    $destination = $directory . '/' . md5($_POST['output_png']) . '.png';
    $file = file_unmanaged_save_data(base64_decode(substr($_POST['output_png'], 22)), $destination);
    $image = file_create_url($file);
  }
  $js_code = 'if (parent.parent) {';
  $js_code .= 'parent.parent.Drupal.settings.imageeditor.save.image = "' . $image . '";';
  $js_code .= 'parent.parent.Drupal.imageeditor.save();';
  $js_code .= 'parent.parent.Drupal.imageeditor.overlay.hide();';
  $js_code .= '}';
  drupal_add_js($js_code, 'inline');
}

function imageeditor_fotoflexer_save_callback() {
  $image = '';
  if (isset($_GET['image'])) {
    $image = rawurldecode($_GET['image']);
  }
  $js_code = 'if (opener) {';
  $js_code .= 'opener.Drupal.settings.imageeditor.save.image = "' . $image . '";';
  $js_code .= 'opener.Drupal.imageeditor.save();';
  $js_code .= 'self.close();';
  $js_code .= '}';
  drupal_add_js($js_code, 'inline');
}

function imageeditor_snipshot_save_callback() {
  $image = '';
  if (isset($_GET['image'])) {
    $image = rawurldecode($_GET['image']);
  }
  $js_code = 'if (parent) {';
  $js_code .= 'parent.Drupal.settings.imageeditor.save.image = "' . $image . '";';
  $js_code .= 'parent.Drupal.imageeditor.save();';
  $js_code .= 'parent.Drupal.imageeditor.overlay.hide();';
  $js_code .= '}';
  drupal_add_js($js_code, 'inline');
}

function imageeditor_deviantartmuro_initialize_callback(&$editor) {
  if (module_exists('libraries')) {
    $path = libraries_get_path('deviantartmuro');
    drupal_add_js($path . '/jquery.deviantartmuro.js');
    $editor['options']['sandbox'] = file_create_url($path . '/html/deviantart_muro_sandbox.html');
  }
  else {
    drupal_add_js('sites/all/libraries/deviantartmuro' . '/jquery.deviantartmuro.js');
    $editor['options']['sandbox'] = file_create_url('sites/all/libraries/deviantartmuro' . '/html/deviantart_muro_sandbox.html');
  }
}

function imageeditor_imageeditor_photobooth_initialize_callback(&$editor) {
  if (module_exists('libraries')) {
    drupal_add_js(libraries_get_path('photobooth') . '/photobooth_min.js');
  }
  else {
    drupal_add_js('sites/all/libraries/photobooth' . '/photobooth_min.js');
  }
}

function imageeditor_imageeditor_photobooth_save_callback() {
  $directory = imageeditor_temporary_directory();
  if (isset($_POST['data'])) {
    if ($_POST['url'] && $_POST['url'] != 'undefined') {
      $destination = $directory . '/' . basename($_POST['url']);
    }
    else {
      $destination = $directory . '/' . md5($_POST['data']) . '.png';
    }
    list(, $data) = explode(',', $_POST['data']);
    $file = file_unmanaged_save_data(base64_decode($data), $destination);
    drupal_json_output(file_create_url($file));
    exit;
  }
}

function imageeditor_imageeditor_webcam_save_callback() {
  $directory = imageeditor_temporary_directory();
  $image = '';
  if ($postdata = file_get_contents("php://input")) {
    $destination = $directory . '/' . md5($postdata) . '.jpg';
    $file = file_unmanaged_save_data(pack("H*", $postdata), $destination);
    $image = file_create_url($file);
  }
  $js_code = 'if (parent) {';
  $js_code .= 'parent.Drupal.settings.imageeditor.save.image = "' . $image . '";';
  $js_code .= 'parent.Drupal.imageeditor.save();';
  $js_code .= 'parent.Drupal.imageeditor.overlay.hide();';
  $js_code .= '}';
  drupal_add_js($js_code, 'inline');
}

function imageeditor_imageeditor_scriptcam_save_callback() {

}
