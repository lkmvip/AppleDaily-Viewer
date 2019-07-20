/*
 * ORIGIN
 *     TW Apple Daily
 *
 * CAUSES
 *     Use `setInterval` to remove elements every 3000ms.
 *         $('.ndAritcle_headPic,.ndArticle_margin,.mediabox,#playerVideo,.articulum').remove();
 *
 * SOLUTION
 *     1. Insert JavaScript code into now page to disable all `setInterval`.
 *     2. Reload page and get page source.
 *     3. Insert contents into now page.
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
 *
 *     if contacts [abdominis]
 *         div.thoracis
 *         div.abdominis
 *             article.mpatc
 *                 div.mediabox
 *                 div.articulum.trans
 */

const findVideoUrl = (text) => {
    const videoUrl = text.match(/(https?:)?\/\/.*mp4/);
    return videoUrl ? videoUrl[0] : null;
}

const createVideoBlock = (videoUrl) => {
    return `<video width="100%" autoplay controls preload>
                <source src="${videoUrl}"></source>
            </video>`;
}

const insertContent = (respElement) => {
    const margin = $('.ndArticle_margin', respElement);
    if ($('div.ndArticle_margin').length <= 0 && margin.length > 0) {
        if ($('article.ndArticle_content').length > 0)
            $('article.ndArticle_content').prepend(margin);
        else
            $('article.ndArticle_leftColumn').append($('div.thoracis', respElement));
    }
}

const insertVideo = (respElement) => {
    const videoUrl = findVideoUrl(respElement.text());
    if (videoUrl !== null)
        $('article.ndArticle_content').prepend(createVideoBlock(videoUrl));
}

const insertTW = (url) => {
    fetch(url)
        .then(response => response.text())
        .then(respText => {
            insertContent($(respText));
            insertVideo  ($(respText));
        })
};