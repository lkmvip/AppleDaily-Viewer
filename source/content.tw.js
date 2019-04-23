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

const getVideoUrl = (text) => {
    const videoUrl = text.match(/(https?:)?\/\/.*mp4/);
    return videoUrl ? videoUrl[0] : null;
};

const getVideoBlock = (videoUrl) => {
    return `<div class="mediabox">
                <video width="100%" autoplay controls preload>
                    <source src="${videoUrl}"></source>
                </video>
            </div>`;
};

const appendMediaBox = (sourceElement) => {
    if ($('.mediabox').length <= 0) {
        const videoUrl = getVideoUrl($(sourceElement).text());
        if (videoUrl !== null) {
            var videoBlock = getVideoBlock(videoUrl);
            if ($('#aniheadID').length > 0)
                $('#aniheadID').after(videoBlock);
            else
                $('.thoracis').prepend(videoBlock);
        }
    }
};

const appendHeadPic = (sourceElement) => {
    if ($('.ndAritcle_headPic').length <= 0) {
        const headPic = $('.ndAritcle_headPic', sourceElement);
        if (headPic.length > 0)
            $('.thoracis').prepend(headPic);
    }
};

const appendContent = (sourceElement) => {
    if ($('.ndArticle_margin').length <= 0) {
        const margin = $('.ndArticle_margin', sourceElement);
        if (margin.length > 0)
            $('.ndArticle_content').prepend(margin);
    }
};

const insertTW = () => {
    if ($('ndArticle_margin').length <= 0) {
        fetch(url)
            .then(response => response.text())
            .then(respText => {
               appendMediaBox($(respText));
               appendHeadPic($(respText));
               appendContent($(respText));
            })
            .catch(error => {
                $('.thoracis').prepend(
                    `<p style="color: red; font-size: 16px; font-weight: bold;">
                        AppleDaily Viewer fetch failed:
                        <br />
                        ${error}
                    </p>`);
            });
    }
};