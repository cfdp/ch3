<?php

/**
 * @file
 * General setup base Class for Entity Pager module.
 */

/**
 * Class EntityPagerSetup.
 *
 * Provides a base Class setup for the EntityPagerOut Class.
 * This Class contains house keeping functions for EntityPager.
 * EntityPagerOut inherits this class and does the Business Logic.
 *
 * The main things that happening in this class:
 *
 * 1) $view is used to automatically work out the Entity & Field of interest.
 * E.g. it's a 'Node' and the 'nid' is the field of interest.
 * E.g. it's a 'User' and the 'uid' is the field of interest.
 *
 * 2) now the entity type and $field of interest is established, this
 * Entity record is pulled from the database.
 *
 * 3) the specific information of interest for the webpage is then gathered up
 * and made convenient to use & quick to access.  This is done so it is easy
 * to work with when constructing the Business Logic in the sub-class
 * entity_pager_out.
 */
class EntityPagerSetup extends EntityPager {

  // E.g. $node.
  protected $entity;
  // The information returned from the View.
  protected $view;
  // Generic information about Entities.
  protected $entityInfo;
  // The information to be passed to the template.
  protected $outSettings;

  /**
   * Setup Entity Pager with minimum values to work with.
   *
   * The construct class for a the class entity_pager_setup.
   *
   * @param object $view
   *   The view object.
   */
  public function __construct($view) {
    // Set function to allow for dependency injection and coding best practices.
    $this->setDefaults();
    $this->setView($view);
    $this->outSettings = new stdClass();
    $this->establishEntity($view);
  }

  /**
   * Generic 'Setter' for fields.
   *
   * A generic setter to set the values of a field.
   *
   * @param string $field
   *   The field to set.
   * @param string $value
   *   The value of the field to set.
   */
  protected function setField($field, $value) {
    $this->outSettings->$field = $value;
  }

  /**
   * Generic 'Getter' for fields.
   *
   * A generic getter to get the values of a field.
   *
   * @param string $field
   *   Get a specific field.
   *
   * @return bool
   *   The value of the field a specific field.
   */
  protected function getField($field) {

    if (isset($this->outSettings->$field)) {
      return $this->outSettings->$field;
    }
    return FALSE;
  }

  /**
   * Set Entity.
   *
   * Store the entity object. e.g. $node or $user etc..
   *
   * @param object $entity
   *   Set the entity object.
   */
  public function setEntity($entity) {
    $this->entity = $entity;
  }

  /**
   * Get Entity.
   *
   * Get the entity object. e.g. $node or $user etc..
   *
   * @return object $entity
   *   An the entity object.
   */
  public function getEntity() {
    return $this->entity;
  }

  /**
   * Set View.
   *
   * Set the View object to be processed.
   *
   * @param object $view
   *   The view object.
   */
  public function setView($view) {
    $this->view = $view;
    $this->view->result_count = count($this->getViewResult($view));
  }

  /**
   * Get View.
   *
   * Get the View object to be processed.
   *
   * @return object $view
   *   The View object.
   */
  public function getView() {
    return $this->view;
  }

  /**
   * Get Views Settings.
   *
   * Get the values input in Views > Settings > Options from the View.
   * To allow the class to take advantage of dependency injection
   * the whole $view has been injected into the class. This
   * function uses the part of the view data that is to be consistently used
   * to get the options settings.
   *
   * @param object $view
   *   The view object.
   *
   * @return array
   *   The settings the were selected in the View.
   */
  public function getSettings($view) {
    if (!isset($view->style_plugin->options['next_prev'])) {
      $view->style_plugin->options['next_prev'] = $this->getDefault();
    }
    return $view->style_plugin->options;
  }

  /**
   * Get View Result.
   *
   * Get the part of the View object that contains the Views result data.
   *
   * @param object $view
   *   The view object.
   *
   * @return array
   *   The view result.
   */
  public function getViewResult($view) {
    return $view->result;
  }

  /**
   * Get View result count.
   *
   * Return the part of the View object that has the count of results.
   *
   * @return int
   *   Get the count of results.
   */
  public function getViewResultCount() {
    return $this->view->result_count;
  }

  /**
   * Get All URL.
   *
   * This 'get' could have been pulled from the dynamic function, but
   * listing it's full name means IDE's will prompt (help) developers with
   * the possible 'get' choices. This is helpful for speedy development
   * when sharing code on Open Source projects.
   *
   * @return text
   *   The value that was set in the options of the View for the All URL.
   */
  public function getAllUrl() {
    return $this->getField('all_url');
  }

  /**
   * Get All Title.
   *
   * Form more information see comments about: getAllUrl().
   *
   * @return text
   *   Get the value that was set in the options of the View for the All Title.
   */
  public function getAllTitle() {
    return $this->getField('all_title');
  }


  /**
   * Get result count word.
   *
   * Get the word associated with the count of results.
   * i.e. one, many
   * The number in the result converted to a summary word for privacy.
   *
   * @return text
   *   Get a text representation the number of records e.g. none, one or many.
   */
  public function getCountWord() {

    $count = 'invalid';

    if (isset($this->view->result_count)){
      switch ($this->view->result_count) {
        case 0:
          $count = 'none';
          break;
        case 1:
          $count = 'one';
          break;
        default:
          $count = 'many';
      };
    }

    return $count;
  }

  /**
   * Set Link All Url.
   *
   * This 'set' could have been left as a dynamic function
   * (i.e. setField(), but listing it's full name (i.e. setAllUrl() )
   * means developers IDEs will prompt (help) them with the possible
   * 'set' choices.  This IDE prompting makes it easy for other developers
   * to work with the code quickly and easily on this Open Source project.
   *
   * @param string $url
   *   Set the value that was set in the options of the View for the All Title.
   */
  public function setAllUrl($url) {
    $this->setField('all_url', $url);
  }

  /**
   * Set All Title.
   *
   * For more info see description for: function setAllUrl($url).
   *
   * @param string $title
   *   Set the value that was set in the options of the View for the All Title.
   */
  public function setAllTitle($title) {
    $this->setField('all_title', $title);
  }

  /**
   * Get Fields.
   *
   * Get the fields returned from a View.
   *
   * @return array
   *   Get the fields that are returned by the View.
   */
  public function getFields() {
    $view = $this->getView();
    return $view->query->pager->display->handler->handlers['field'];
  }

  /**
   * Set Field Name of ID field.
   *
   * Work out and store the field 'id' that is to be used.
   * This is set in the out Settings object.
   *
   * @return text
   *   Get the ID field name, that has just been set in the outSettings object.
   */
  protected function setIdFieldName() {

    if (isset($this->entityInfo['alias'])) {
      $field_name = $this->entityInfo['alias'];
    }
    else {
      $field_name = $this->entityInfo['field'];
    }
    $this->outSettings->id_field_name = $field_name;
    return $this->outSettings->id_field_name;
  }

  /**
   * Get ID Field Name.
   *
   * Get the name of the Field that is to be used for the ID value.
   *
   * @return bool
   *   Get the ID field name that was previously set in the outSettings object.
   */
  protected function getIdFieldName() {

    if (isset($this->outSettings->id_field_name)) {
      return $this->outSettings->id_field_name;
    }
    else {
      drupal_set_message(t(
        'Entity Pager Module:  you need to select an ID field in your View
         e.g. nid for nodes, or uid for user etc..',
        'warning'));
      // This should never happen.
      return FALSE;
    }
  }

  /**
   * Establish Entity.
   *
   * Use View result to establish the Entity type of interest.
   * i.e. a node entity or a user entity etc..
   * Then load that type of entity from the menu object.
   * Then store all the information that has been worked out so it can be
   * conveniently and efficiently used by this Class.
   *
   * @param object $view
   *   The view object.
   */
  protected function establishEntity($view) {

    $entity_info = $this->establishEntityInfo($view);
    $position = 1 + substr_count($entity_info['entity_type'], '_');
    // Position is normally 1, (e.g. node/8 ), but things like taxonomy_term
    // get turned into taxonomy/term (e.g. taxonomy/term/8).
    $entity = menu_get_object($entity_info['entity_type'], $position);
    $this->setEntity($entity);
    $this->setEntityInfo($entity_info);
    $this->setIdFieldName();
  }

  /**
   * Establish the Entity Info from the View.
   *
   * Use the View result to automatically establish the Entity type of interest.
   * E.g. node or user etc..
   * Then return an array of information about the entity type and how the View
   * is using it.
   * E.g
   *  entity_type = "user"
   *  field       = "uid"
   *  table       = "users"
   *  alias       = "uid"
   *
   * @param object $view
   *   The View object.
   *
   * @return array
   *   Get the entity info array.
   */
  protected function establishEntityInfo($view) {

    $entity_info = NULL;
    $entity_keys = $this->getEntityKeys();

    $view_fields = $view->query->fields;
    // Reverse order to get the last id e.g. nid or uid.
    rsort($view_fields);
    foreach ($view_fields as $view_field) {

      if (in_array($view_field['field'], $entity_keys)) {
        $entity_flip = array_flip($entity_keys);
        $entity_info = $view_field;
        $entity_info['entity_type'] = $entity_flip[$view_field['field']];
        break;
      }
    }
    return $entity_info;
  }

  /**
   * Get Entity Keys.
   *
   * Get the key ID fields of each entity type on the site.
   * E.g.
   *   node = nid
   *   user = uid
   * etc.
   *
   * @return array
   *   Get an array of the id fields used for each Entity on the site.
   */
  protected function getEntityKeys() {

    $entity_keys = array();
    $entities = entity_get_info();
    foreach ($entities as $key => $value) {
      $entity_keys[$key] = $value['entity keys']['id'];
    }
    return $entity_keys;
  }

  /**
   * Set Entity Information.
   *
   * This stores generic information about the Entity type.
   * E.g. the entity is a 'node' and its main id field is 'nid'.
   * It is required to make the module universal, so it can process entities
   * as oppose to being hardcoded and only working for nodes.
   *
   * @param object $entity_info
   *   Set the Entity info object.
   */
  protected function setEntityInfo($entity_info) {
    $this->entityInfo = $entity_info;
  }

  /**
   * Get Entity Information.
   *
   * Get generic information about the Entity Type.
   * If no field is declared it will return the complete array of Entity
   * Information. If a $field is entered only information on that field
   * is returned.
   *
   * @param string|null $field
   *   Either leave as null for the whole object or specify an individual field.
   *
   * @return bool|object $entityInfo
   *   Get the Entity Info object.
   */
  public function getEntityInfo($field = NULL) {

    $entity_info = FALSE;
    if (is_null($field)) {
      // The whole array.
      $entity_info = $this->entityInfo;
    }
    elseif (isset($this->entityInfo[$field])) {
      // A specific field.
      $entity_info = $this->entityInfo[$field];
    }
    return $entity_info;
  }

}
