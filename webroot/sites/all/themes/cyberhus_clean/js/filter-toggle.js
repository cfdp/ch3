$ = jQuery;

$(document).ready(function() {

  // Filter toggle
  if ($(window).width() < 768) {
    $('div[id^=block-views-exp-frontpage-stream-page] > h2').on('click touch', function() {
      $('div[id^=block-views-exp-frontpage-stream-page] > .content').slideToggle(250);
      $(this).toggleClass('open');
    });
  }

});

Drupal.behaviors.streamFilterReset = {
  attach: function (context, settings) {

		// Reset all values in the form
		$('#edit-reset').once('resetStream', function(e) {
			$(this).click(function(e) {
				e.preventDefault();

        $('div[id^=block-views-exp-frontpage-stream-page] select').each(function() {
				  $(this).val('All');
        });

        $('#edit-submit-frontpage-stream').click();
			});
		});
	}
}

Drupal.behaviors.streamFilterCategory = {
  attach: function (context, settings) {

		// Filter form from category link
		$('.meta-category a').not('.view-frontpage-stream.view-display-id-block_1 .meta-category a').once('metaCategory', function(e) {
			$(this).click(function(e) {
				e.preventDefault();

        var tid = $(this).attr('href').split('kategori=')[1];
        $('#edit-kategori').val(tid);
        $('#edit-submit-frontpage-stream').click();
			});
		});
	}
}
