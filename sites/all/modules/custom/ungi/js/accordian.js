/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function($) {
    Drupal.behaviors.ungi = {
        attach: function(context, settings) {
            $( "#ungi-nodes article" ).each(function() {
                $("<h3><a href='#'>" + $(this).find('.node-title').html() + "</a></h3>").insertBefore(this)
            });
            $('#ungi-nodes').accordion({
                header: 'h3',
                animated: 'slide',
                active: false,
                collapsible: true,
                autoHeight: false
                        /*event: this.event,
                         fillSpace: this.fillspace,
                         navigation: this.navigation,
                         clearstyle: this.clearstyle*/
            });
        }
    }
})(jQuery);
