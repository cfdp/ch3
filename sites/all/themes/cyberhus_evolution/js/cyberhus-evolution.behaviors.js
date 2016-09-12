(function ($) {

  /**
   * The recommended way for producing HTML markup through JavaScript is to write
   * theming functions. These are similiar to the theming functions that you might
   * know from 'phptemplate' (the default PHP templating engine used by most
   * Drupal themes including Omega). JavaScript theme functions accept arguments
   * and can be overriden by sub-themes.
   *
   * In most cases, there is no good reason to NOT wrap your markup producing
   * JavaScript in a theme function.
   */
/*  Drupal.theme.prototype.cyberhusEvolutionMoreAuthorInfo = function (path, title) {
    // Create an anchor element with jQuery.

    return $('<a href="' + path + '" title="' + title + '">' + title + '</a>');
  };*/

  /**
   * Behaviors are Drupal's way of applying JavaScript to a page. In short, the
   * advantage of Behaviors over a simple 'document.ready()' lies in how it
   * interacts with content loaded through Ajax. Opposed to the
   * 'document.ready()' event which is only fired once when the page is
   * initially loaded, behaviors get re-executed whenever something is added to
   * the page through Ajax.
   *
   * You can attach as many behaviors as you wish. In fact, instead of overloading
   * a single behavior with multiple, completely unrelated tasks you should create
   * a separate behavior for every separate task.
   *
   * In most cases, there is no good reason to NOT wrap your JavaScript code in a
   * behavior.
   *
   * @param context
   *   The context for which the behavior is being executed. This is either the
   *   full page or a piece of HTML that was just added through Ajax.
   * @param settings
   *   An array of settings (added through drupal_add_js()). Instead of accessing
   *   Drupal.settings directly you should use this because of potential
   *   modifications made by the Ajax callback that also produced 'context'.
   */
  Drupal.behaviors.cyberhusEvolutionForms = {
    attach: function (context, settings) {
      // By using the 'context' variable we make sure that our code only runs on
      // the relevant HTML. Furthermore, by using jQuery.once() we make sure that
      // we don't run the same piece of code for an HTML snippet that we already
      // processed previously. By using .once('foo') all processed elements will
      // get tagged with a 'foo-processed' class, causing all future invocations
      // of this behavior to ignore them.

      /* General replacements */
      $('form', context).once('add-placeholders', function () {
        $(".field-name-field-navn input, .form-item-name input, .field-name-field-forum-forf-navn input").attr("placeholder", "Kaldenavn eller fornavn");
        // Age
        $('.field-name-field-brevk-alder select option:contains("- Vælg en værdi -")').text('Vælg alder');
        $('.field-name-field-brevk-alder select option:contains("- Ingen -")').text('Vælg alder');
        // Email
        $("#edit-node-notify-subscribe, .field-name-field-email input").attr("placeholder", "Skriv din email-adresse");
      });

      /* Handle errors */
      $('form', context).once('handle-errors', function () {
        if ($("input, select").hasClass("error")) {
          $("input.error").closest(".form-wrapper").addClass('error');
          $("select.error").closest(".form-wrapper").addClass('error');
          /* Scroll to first error */
          $('html, body').animate({
            scrollTop: $('.error:visible:first').offset().top
          }, 1000);
        }
      });

      /* Add placeholder element to search input form */
      $('#block-custom-search-blocks-1', context).once('add-placeholder-search', function () {
        $("#edit-custom-search-blocks-form-1--2").attr("placeholder", "Søg");
      });

      /* Add placeholder element to comment form, body item */
      $('.comment-form', context).once('add-placeholder-comment', function () {
        $(".form-textarea").attr("placeholder", "Skriv kommentar");
      });

      /* Node forms: Add placeholder elements and other manipulations */
      $('.node-form', context).once('various-ops', function () {
        // Title
        $("#edit-title").attr("placeholder", "Skriv titel");
      });

      /* Forum */
      $('.node-forum-form', context).once('add-placeholder-forum-node', function () {
$("#edit-body-und-0-value").attr("placeholder", "Skriv som om du skriver til en ven");

$('select#edit-taxonomy-forums-und option:contains("- Vælg en værdi -")').text('Vælg emne');

      });
    }
  };

  /* Add links to menu container elements */
  Drupal.behaviors.cyberhusEvolutionSVGMenu = {
    attach: function (context, settings) {
      /* Add link to containing li element in svg menus */
      $('#block-menu-menu-andet', context).once('attach-link', function () {
        // Add link
        $("li.svg-menu").click(function() {
          window.location = $(this).find("a").attr("href");
          return false;
        });
      });
    }
  };

  /* Manipulate more author info toggle fields on node comment forms */
  Drupal.behaviors.cyberhusEvolutionMoreAuthorInfo = {
    attach: function (context, settings) {
      $('body.page-node .comment-form', context).once('more-author-info', function () {
        // Move optional "more" elements to collapsible field group wrapper
        $( ".form-item-name" ).prependTo( ".group-more-author-info .fieldset-wrapper" );
        // Move submit button to bottom of form
        $( ".comment-form .form-submit" ).appendTo( $( ".comment-form" ) );
      });
    }
  };

})(jQuery);
