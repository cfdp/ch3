<?php

/**
 * @file
 * General setup base Class for Entity Pager module.
 */

/**
 * Class EntityPager.
 *
 * Provides a base Class setup for the EntityPagerOut Class.
 * This Class contains house keeping functions for EntityPager.
 * EntityPagerOut inherits this class and does the Business Logic.
 *
 * The main things that happening in this class:
 *
 * 1) the $view is used to automatically work out the Entity & Field of interest
 * e.g. it is a Node and the nid is the field of interest.
 * e.g. it is a User and the uid is the field of interest.
 *
 * 2) now the entity type and $field of interest is established, this
 * Entity record is pulled from the database.
 *
 * 3) the specific information of interest for the web-page is then gathered up
 * and made convenient to use & quick to access.  This is done so it is easy
 * to work with when constructing the Business Logic in the sub-class
 * EntityPagerOut.
 */
class EntityPager {

  protected $default;

  /**
   * The constuctor for EntityPager class.
   */
  public function __construct() {
    $this->setDefaults();
  }

  /**
   * Set the default values for Entity Pager.
   */
  public function setDefaults() {

    $this->default = array(
      'link_next' => 'next >',
      'link_prev' => '< prev',
      'link_all_url' => '<front>',
      'link_all_text' => 'Home',
      'display_count' => TRUE,
      'log_performance' => TRUE,
    );
  }

  /**
   * Get Default value.
   *
   * Use this one method to get all default values in a consistent way.
   * If a field is specified return just that field value.
   * If no field is specified return the whole array.
   *
   * @param string|null $field
   *   The field the default value is required for.
   *
   * @return bool|array|string
   *   The value of the the field requested.
   */
  public function getDefault($field = NULL) {

    $value = FALSE;
    if (is_null($field)) {
      $value = $this->default;
    }
    elseif (isset($this->default[$field])) {
      $value = $this->default[$field];
    }
    return $value;
  }

}
