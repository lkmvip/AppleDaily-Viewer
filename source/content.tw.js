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

const getVideoUrl = (text) => {
    const videoUrl = text.match(/(https?:)?\/\/.*mp4/);
    return videoUrl ? videoUrl[0] : null;
}

const getVideoBlock = (videoUrl) => {
    return `<div class="mediabox">
                <video width="100%" autoplay controls preload>
                    <source src="${videoUrl}"></source>
                </video>
            </div>`;
}

const appendMediaBox = (sourceElement, isArticulum = false) => {
    if ($('div.mediabox').length <= 0) {
        const videoUrl = getVideoUrl($(sourceElement).text());
        if (videoUrl !== null) {
            var videoBlock = getVideoBlock(videoUrl);
            if ($('#aniheadID').length > 0)
                $('#aniheadID').after(videoBlock);
            else if (isArticulum)
                $('article.mpatc').append(videoBlock);
            else
                $('div.thoracis').prepend(videoBlock);
        }
    }
}

const appendHeadPic = (sourceElement, isArticulum = false) => {
    if ($('.ndAritcle_headPic').length <= 0) {
        const headPic = $('.ndAritcle_headPic', sourceElement);
        if (headPic.length > 0)
            if (isArticulum)
                $('article.mpatc').append(headPic);
            else
                $('div.thoracis').prepend(headPic);
    }
}

const appendContent = (sourceElement) => {
    if ($('.ndArticle_margin').length <= 0) {
        const margin = $('.ndArticle_margin', sourceElement);
        if (margin.length > 0)
            $('article.ndArticle_content').prepend(margin);
    }
}

const appendArticulum = (sourceElement) => {
    if ($('div.articulum.trans').length <= 0) {
        const articulum = $('div.articulum.trans', sourceElement);
        if (articulum.length > 0)
            $('article.mpatc').append(articulum);
    }
}

const insertTW = (url) => {
    if ($('div.ndArticle_margin').length <= 0 && $('div.articulum').length <= 0) {
        fetch(url)
            .then(response => response.text())
            .then(respText => {
                const isArticulum = $('article.mpatc').length > 0;
                appendMediaBox($(respText), isArticulum);
                appendHeadPic ($(respText), isArticulum);
                if (isArticulum)
                    appendArticulum($(respText));
                else
                    appendContent($(respText));
            })
            .catch(error => {
                $('div.thoracis').prepend(
                    `<p style="color: red; font-size: 16px; font-weight: bold;">
                        AppleDaily Viewer fetch failed:
                        <br />
                        ${error}
                    </p>`);
            });
    }
};