<?php
/**
 * @file
 *   GA Push Browser event classes.
 */

 /**
  * CRUD controller for GA Push Browser events.
 */
class GAPushBrowserEventController extends EntityAPIController {

  /**
   * @brief Creates a GA Push Browser event.
   *
   * @param $values
   *   Intial values for the GA Push Browser event.
   *
   * @return
   *   A new GA Push Browser Event instance.
   **/
  public function create(array $values = array()) {

    $values += array(
      'id' => NULL,
      'name' => '',
      'status' => TRUE,
      'selector' => '',
      'bind' => '',
      'ga_category' => '',
      'ga_action' => '',
      'ga_label' => '',
      'ga_value' => '',
    );
    return parent::create($values);
  }
}


/**
 * @brief Entity class
 */
class GAPushBrowserEvent extends Entity {
  //TODO!
}