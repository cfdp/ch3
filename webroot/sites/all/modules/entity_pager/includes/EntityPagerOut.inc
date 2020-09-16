<?php

/**
 * @file
 * Provides the Business Logic for the EntityPager module.
 */

/**
 * Class EntityPagerOut.
 *
 * The business logic class.
 *
 * The main class for the entity_pager module that does Business Logic.
 * For best practice Business Logic is kept separate from general Class
 * maintenance tasks. This class extents entity_pager which performs
 * general Class duties.
 */
class EntityPagerOut extends EntityPagerAdvice {

  /**
   * Entity Pager return links.
   *
   * The main method for returning links & counts etc.. for Entity Pager.
   * Use this to get Entity Pager links.
   *
   * @return array|bool|void
   *   Get the results for an entity pager.
   */
  public function getEntityPager() {

    $entity = $this->getEntity();
    $view = $this->getView();
    $settings = $this->getSettings($view);

    if (!$entity) {
      $this->runAdviceLogic('no-records', 'No Entity on page');
      return FALSE;
    }

    $entity_type = $this->getEntityInfo('entity_type');

    // Process to 'All' link.
    $this->tokenLink(
      $entity_type,
      $entity,
      $settings['next_prev']['link_all_url'],
      $settings['next_prev']['link_all_text']
    );

    // Create links for 'Next', 'All' and 'Prev' values.
    $links = $this->calculateNextAllPrevValuesFromView($entity, $view);

    return $links;
  }

  /**
   * Process Token link.
   *
   * The 'All' link can have tokens set in it in the Views > settings form
   * 'Entity Pager' section.  This function processes the values added.
   * E.g. it can turn things like entity references into Titles with links.
   *
   * @param string $entity_type
   *   The type of entity.
   * @param object $entity
   *   The entity object.
   * @param string $url
   *   The url to be added to link.
   * @param string $title
   *   The title for the link.
   */
  private function tokenLink($entity_type, $entity, $url, $title) {

    $detokened = array();
    $detokened['url'] = token_replace($url, array($entity_type => $entity));
    $detokened['title'] = token_replace($title, array($entity_type => $entity));

    if ($detokened['url'] == $url) {
      // No tokens used.
      $new_url = $url;
    }
    elseif (drupal_valid_path($detokened['url'])) {
      // A valid url e.g. edit node.
      $new_url = $detokened['url'];
    }
    else {
      // Entity reference process.
      $new_url = $this->entityRefUrlFromToken($entity_type, $entity, $url);
    }
    $this->setAllUrl($new_url);
    $this->setAllTitle($detokened['title']);
  }

  /**
   * Process Entity Reference URL from tokens.
   *
   * If it is established the Tokens are Entity References, this method
   * converts them into useful information.
   *
   * @param string $entity_type
   *   The type of entity.
   * @param object $entity
   *   The entity object.
   * @param string $link_with_token
   *   The link with the token in.
   *
   * @return bool|mixed|null|string
   *   return a url from an Entity Reference.
   */
  protected function entityRefUrlFromToken($entity_type, $entity, $link_with_token) {

    $link_all_url = '';

    // Get URL of token.
    // Example token:  [node:field_company]
    $trimmed = trim($link_with_token, '[]');
    $token_in_url = explode(':', $trimmed);
    // E.g. field_company.
    $field = $token_in_url[1];
    // Set the id field.
    $this->setField('id_field', $field);

    // E.g. $node->field_company['und'][0]['entity']->nid;
    $field_long = $entity->$field;

    // E.g. $field_value = $field_value[LANGUAGE_NONE][0]['entity']->nid;
    $field_value = $field_long[LANGUAGE_NONE][0]['target_id'];

    if (isset($field_value) && is_numeric($field_value)) {
      $link_all_url = drupal_get_path_alias($entity_type . '/' . $field_value);
    }

    return $link_all_url;
  }

  /**
   * Calculate the values for the links.
   *
   * E.g.
   *    < prev   All  next >
   *
   * @param object $entity
   *   The entity object.
   * @param object $view
   *   The view object.
   *
   * @return array|bool
   *   An array of links.
   */
  private function calculateNextAllPrevValuesFromView($entity, $view) {

    // Extract the info required from the View.
    // I.e. info from Views > Format > settings.
    $settings = $this->getSettings($view);
    $view_result = $this->getViewResult($view);
    // Field.
    $field_name = $this->getIdFieldName();
    // Entity.
    $entity_type = $this->getEntityInfo('entity_type');
    $entity_field = $this->getEntityInfo('field');
    $entity_url = str_replace('_', '/', $entity_type);

    // Next or Previous.
    $next = FALSE;
    $match = FALSE;
    // Set short, convenient incoming values to process below.
    $n = array(
      'cur' => '',
      'count' => count($view_result),
      'next' => $settings['next_prev']['link_next'],
      'prev' => $settings['next_prev']['link_prev'],
    );

    $this->runAdviceLogic('quantity', 'Consider caching View result');

    // Set defaults for output.
    $links = array(
      'next' => '<span class="inactive">'.$n['next'].'</span>',
      'prev' => '<span class="inactive">'.$n['prev'].'</span>',
      'count' => '',
    );

    $cnt = $current_cnt = 0;

    foreach ($view_result as $result) {

      $cnt++;
      // Keep a record of the previous nid in the loop, so when the nid is
      // matched, we can reference the previous nid to create the 'prev' link.
      $n['cur_prev'] = $n['cur'];
      // The current value.
      $n['cur'] = $result->$field_name;

      if ($next) {
        $links['next'] = l($n['next'],
          $entity_url . '/' . $result->$field_name, array('html' => TRUE));
        break;
      }

      if ($entity->$entity_field == $result->$field_name) {
        // Must be beyond the first record to have a previous.
        $match = TRUE;
        $current_cnt = $cnt;
        if ($cnt > 1) {
          $links['prev'] = l($n['prev'], $entity_url . '/' . $n['cur_prev'], array('html' => TRUE));
        }
        // There is a next value.
        $next = TRUE;
      }
    }

    if (!$match) {
      $this->runAdviceLogic('no-records', 'No results in View');
      // Return nothing.
      return FALSE;
    }

    // Display the Count stats.
    if ($settings['next_prev']['display_count']) {
      $links['count'] = t('@cnt of <span class="total">@count</span>',
        array(
          '@cnt' => number_format($current_cnt),
          '@count' => number_format($n["count"]),
        )
      );
    }

    // Create the link for the 'all' link.
    $all_tle = $this->getAllTitle();
    $all_url = $this->getAllUrl();
    if ($all_tle && $all_url) {
      $links['all_link'] = l($all_tle, $all_url, array('html' => TRUE));
    }

    $links = $this->orderLinks($links);
    return $links;
  }

  /**
   * Order links.
   *
   * Put links (and count) in the most appropriate order.
   * If extra links have been added from the 4 in the orders array below,
   * they will still appear in the links array.
   *
   * @param array $links
   *   The links array to be ordered.
   *
   * @return array link.
   *   An array of links ordered in the most appropriate way.
   */
  private function orderLinks(array $links) {
    // Define the most usable array order.
    $orders = array('prev', 'all_link', 'next', 'count');
    foreach ($orders as $order) {
      if (isset($links[$order])) {
        // Remove key => value link from middle of array.
        $link = $links[$order];
        // Add the key => value link to the end of  array.
        unset($links[$order]);
        $links[$order] = $link;
      }
    }
    return $links;
  }

}
