$ = jQuery;

$(document).ready(function() {

    $(".wide").parents('.field-item').addClass("wide-element");
    $(".narrow").parents('.field-item').addClass("narrow-element");
    $(".paragraphs-item-ungi-alm-tekst").parents('.field-item').addClass("add-bg");
    // Remove bg class to elements integrating the cim chat
    if ($(".paragraphs-item-ungi-alm-tekst").hasClass('cim-chat-embedded')) {
        $(".paragraphs-item-ungi-alm-tekst").parent('.field-item').removeClass("add-bg");
    };
    $(".paragraphs-item-ungi-lokale-tilbud").parents('.field-item').addClass("add-bg");
    $(".paragraphs-item-ungi-iframe-embed").parents('.field-item').addClass("add-bg grey");

});
