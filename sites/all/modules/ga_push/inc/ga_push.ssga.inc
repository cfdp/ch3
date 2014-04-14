<?php
/**
 * @file
 * SSGA: method and functions
 */

/**
 * Method: SSGA
 */
function ga_push_method_ssga($push, $type) {

  if (class_exists('ssga')) {

    $ga = new ssga();

    //Set your Google Analytics key
    $id = variable_get('googleanalytics_account', '');
    $ga->setAccountId($id);

    //Set your charset
    $ga->setCharset("UTF-8");

    //Set your hostname
    $ga->setHostName($GLOBALS['base_url']); //TODO: domain?

    //Set language
    $ga->setLanguage($GLOBALS['language']->language);

    //Set an event (based on http://code.google.com/apis/analytics/docs/tracking/eventTrackerGuide.html)

    switch ($type) {

      case GA_PUSH_TYPE_EVENT:
        
        // Complete optional parameters
        $push += array(
          'label' => '',
          'value' => 1,
        );

        $ga->setEvent($push['category'], $push['action'], $push['label'], $push['value']);
        break;
      /*
      case '_trackPageview': //TODO: is useful?

        //Set a pageview
        $ga->setPageView("/de/serverside/test"); 
        //Set page title
        $ga->setPageTitle("Test");

        break;
      */
    }

    //Submit an event
    $ga->create(); //createEvent

  }
  else {
    //Throw an error
  }

}