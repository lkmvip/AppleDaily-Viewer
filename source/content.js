/*
 * Key line:
 *     $('.ndAritcle_headPic,.ndArticle_margin,.mediabox,#playerVideo,.articulum').remove();
 *
 * Confitions:
 *     if contacts [mediabox, ndArticle_margin]
 *         div.thoracis
 *             div.mediabox
 *         div.ndArticle_contentBox
 *             atricle.ndArticle_content.clearmen
 *                 div.ndArticle_margin
 *
 *     if contacts [ndAritcle_headPic, ndArticle_margin]:
 *         div.thoracis
 *             div.ndAritcle_headPic
 *             div.ndArticle_contentBox
 *                 atricle.ndArticle_content.clearmen
 *                     div.ndArticle_margin
 */

if ($('ndArticle_margin').length <= 0) {
    var pathname = window.location.pathname; // returns path only (/path/example.html)
    var url = window.location.href;          // returns full URL  (https://example.com/path/example.html)
    var origin = window.location.origin;     // returns base URL  (https://example.com)

    $.ajax({
        type: "GET",
        url: url,
        datatype: "html",
        success: function (data) {
            if ($('.mediabox').length <= 0) {
                var mediabox = $('.mediabox', $(data));
                if (mediabox.length > 0)
                    $('.thoracis').prepend(mediabox);
            }

            if ($('.ndAritcle_headPic').length <= 0) {
                var headPic = $('.ndAritcle_headPic', $(data));
                if (headPic.length > 0)
                    $('.thoracis').prepend(headPic);
            }

            if ($('.ndArticle_margin').length <= 0) {
                var margin = $('.ndArticle_margin', $(data));
                if (margin.length > 0)
                    $('.ndArticle_content').prepend(margin);
            }
        }
    });
}