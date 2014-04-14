<?php
/**
 * @file
 * UTMP Javascript: method and functions
 */



function ga_push_method_utmp_js($push, $type) {
  $push_info = array(
    'push' => $push,
    'type' => $type,
  );
  $_SESSION['ga_push_utmp'][] = $push_info;
}


/**
 * Send the ga push to JS on page load using Universal Analytics Event Tracking.
 */
function ga_push_method_utmp_js_push() {
  if (isset($_SESSION['ga_push_utmp'])) {
    $id = variable_get('googleanalytics_account', '');
    if (!empty($id)) {
      $script = "var ga = ga || [];\n ";

      // Process each push data that needs to be sent to Google Analytics.
      foreach ($_SESSION['ga_push_utmp'] as $queued) {
        $push = $queued['push'];
        $type = $queued['type'];

        switch ($type) {
          case GA_PUSH_TYPE_EVENT:
            $script .= _ga_push_method_utmp_js_push_event_script($push);
          break;

          case GA_PUSH_TYPE_ECOMMERCE:
            $script .= _ga_push_method_utmp_js_push_ecommerce_script($push);
          break;
        }
      }
      _ga_push_method_utmp_js_add_script($script);
      unset($_SESSION['ga_push_utmp']);
    }
  }
}


/**
 * Generates the ga JS code for pushing an event to GA.
 *
 * @param array $push
 *   Event data.
 *
 * @return string
 *   JS code with push code.
 */
function _ga_push_method_utmp_js_push_event_script($push) {

  // Optional: default values
  $push += array(
    'label' => '',
    'value' => 1,
    'non-interaction' => FALSE,
  );

  $event_value = is_numeric($push['value']) ? $push['value'] : 1;
  $script = "ga('send', 'event', {\n
    eventCategory: '" . $push['category'] . "',\n
    eventAction: '" . $push['action'] . "',\n
    eventLabel: '" . $push['label'] . "',\n
    eventValue: " . $event_value . "
  });";

  return $script;
}



/**
 * Generates the ga JS code for pushing an ecommerce to GA.
 *
 * @param array $push
 *   Event data.
 *
 * @return string
 *   JS code with push code.
 */
function _ga_push_method_utmp_js_push_ecommerce_script($push) {

  // Include needed additional ga e-commerce library.
  $script = "ga('require', 'ecommerce', 'ecommerce.js');\n";

  // Build up the transaction.
  $script .= "ga('ecommerce:addTransaction', {
    id:          '" . $push['trans']['order_id'] . "',
    affiliation: '" . $push['trans']['affiliation'] . "',
    revenue:     '" . $push['trans']['total'] . "',
    shipping:    '" . $push['trans']['total_shipping'] . "',
    tax:         '" . $push['trans']['total_tax'] . "'
  });\n";

  // Build up the items.
  foreach ($push['items'] as $value) {
      $script .= "ga('ecommerce:addItem', {
        id:       '" . $value['order_id'] . "',
        sku:      '" . $value['sku'] . "',
        name:     '" . $value['name']  . "',
        category: '" . $value['category'] . "',
        price:    '" . $value['price'] . "',
        quantity: '" . $value['quantity'] . "'
      });\n";
  }
  $script .= "ga('ecommerce:send');";

  return $script;
}


/**
 * Adds generated script with push data.
 *
 * Used by ga_push_method_utmp_js_push.
 *
 * @see ga_push_method_utmp_js_push().
 *
 * @param string $script
 *   Generated script code to add.
 */
function _ga_push_method_utmp_js_add_script($script) {
  $options = array(
    'type' => 'inline',
    'scope' => 'footer',
    //'weight' => 0,
    //'group' => JS_DEFAULT,
  );
  drupal_add_js($script, $options);
}