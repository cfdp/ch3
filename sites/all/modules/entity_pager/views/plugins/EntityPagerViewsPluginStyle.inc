<?php

/**
 * @file
 * Contains the Entity Pager style plugin.
 */

/**
 * Style plugin to render each item as a row in a table.
 *
 * @ingroup views_style_plugins
 */
class EntityPagerViewsPluginStyle extends views_plugin_style {

  /**
   * Render the display in this style.
   */
  public function render() {
    if ($this->uses_row_plugin() && empty($this->row_plugin)) {
      debug('views_plugin_style_default: Missing row plugin');
      return;
    }

    $pager = new EntityPagerOut($this->view);
    if ($links = $pager->getEntityPager()) {
      // Only show if it has contents.
      $variables= array(
        'links' => $links,
        'count_word' => $pager->getCountWord()
      );
      return theme('entity_pager', $variables);
    };
  }

  /**
   * Options form in Views for Entity Pager.
   *
   * @param array $form
   *   Nested array of form elements that comprise the form.
   * @param array $form_state
   *   A keyed array containing the current state of the form.
   */
  public function options_form(&$form, &$form_state) {

    parent::options_form($form, $form_state);

    $default = new EntityPager();

    // Setup an options form.
    $form['next_prev'] = array(
      '#type' => 'fieldset',
      '#title' => t('Next Previous links'),
      '#collapsible' => TRUE,
      '#collapsed' => FALSE,
      '#group' => 'next_prev',
      '#weight' => 0,
    );

    $form['next_prev']['link_next'] = array(
      '#title' => t('Next label'),
      '#description' => t('The text to display for the Next link. HTML is allowed.'),
      '#type' => 'textfield',
      '#default_value' => (isset($this->options['next_prev']['link_next'])
        ? $this->options['next_prev']['link_next']
        : $default->getDefault('link_next')),
    );

    $form['next_prev']['link_prev'] = array(
      '#title' => t('Previous label'),
      '#description' => t('The text to display for the Previous link. HTML is allowed.'),
      '#type' => 'textfield',
      '#default_value' => (isset($this->options['next_prev']['link_prev'])
        ? $this->options['next_prev']['link_prev']
        : $default->getDefault('link_prev')),
    );

    $form['next_prev']['link_all_url'] = array(
      '#title' => t('List All URL'),
      '#description' => t('The <strong>URL</strong> of the listing Link.<br>
          Examples include:
          <ul>
              <li>the URL of a Views listing page of the Entities.</li>
              <li><strong>@front</strong> for the <strong>homepage</strong></li>
              <li>a <a href="/admin/help/token"><strong>Token</strong></a> that
              relates to the Entity.  e.g. [node:edit-url]</li>
              <li>The token can also be an <strong>entity reference</strong> if the entity
              has one.  e.g. [node:field_company]</li>
          </ul>', array('@front' => '<front>')),
      '#type' => 'textfield',
      '#default_value' => (isset($this->options['next_prev']['link_all_url'])
        ? $this->options['next_prev']['link_all_url']
        : $default->getDefault('link_all_url')),
    );

    $form['next_prev']['link_all_text'] = array(
      '#title' => t('List All label'),
      '#description' => t("The <strong>text</strong>
          to display for the <strong>List All URL.
          </strong>
          <ul>
              <li>When an <strong>entity reference</strong> is used in
              the <strong>List All URL</strong> box above, just add the same
              entity reference in this box and the referenced
              <strong>Entity Title</strong> will automatically be displayed.
              </li>
              <li>HTML is allowed.</li>
          </ul>"
      ),
      '#type' => 'textfield',
      '#default_value' => (isset($this->options['next_prev']['link_all_text'])
        ? $this->options['next_prev']['link_all_text']
        : $default->getDefault('link_all_text')),
    );

    $form['next_prev']['display_count'] = array(
      '#title' => t('Display count'),
      '#description' => t('Display the number of records e.g. 5 of 8'),
      '#type' => 'checkbox',
      '#default_value' => (isset($this->options['next_prev']['display_count']))
      ? $this->options['next_prev']['display_count']
      : $default->getDefault('display_count'),
      '#weight' => 10,
    );
    $form['next_prev']['log_performance'] = array(
      '#title' => t('Log performance suggestions'),
      '#description' => t('Log performance suggestions to Watchdog, see: Reports > Recent Log Messages.'),
      '#type' => 'checkbox',
      '#default_value' => (isset($this->options['next_prev']['log_performance']))
      ? $this->options['next_prev']['log_performance']
      : $default->getDefault('log_performance'),
      '#weight' => 20,
    );

    $form['spacer_one'] = array(
      '#markup' => '&nbsp;',
    );

    // Remove unwanted inherited form elements.
    $form['grouping'] = '';

    if ($this->uses_fields()) {
      $form['row_class'] = '';
    }
    $form['default_row_class'] = '';
    $form['row_class_special'] = '';
  }

}
