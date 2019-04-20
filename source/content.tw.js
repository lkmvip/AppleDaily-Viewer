/*
 * ORIGIN
 *     TW Apple Daily
 *
 * CAUSES
 *     After page loaded, script will remove elements.
 *         $('.ndAritcle_headPic,.ndArticle_margin,.mediabox,#playerVideo,.articulum').remove();
 *
 * SOLUTION
 *     1. Reload page and get page source.
 *     2. Insert contents into now page.
 *
 * PAGE STRUCTURE
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

function insertTW() {
    if ($('ndArticle_margin').length <= 0) {
        $.ajax({
            type: 'GET',
            url: url,
            datatype: 'html',
            success: function (data) {
                if ($('.mediabox').length <= 0) {
                    var videoUrlLine = $('.mediabox', $(data)).text().match(new RegExp(/var videoUrl = '.*';/))[0];
                    if (videoUrlLine !== 'undefined') {
                        var videoUrl = videoUrlLine.substring(videoUrlLine.indexOf("'") + 1, videoUrlLine.lastIndexOf("'"));
                        $('.thoracis').prepend(
                            `<div class="mediabox">
                                 <video width="100%" autoplay controls preload>
                                     <source src="${videoUrl}"></source>
                                 </video>
                            </div>`
                        );
                    }
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
}