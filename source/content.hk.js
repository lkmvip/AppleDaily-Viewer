/*
 * ORIGIN
 *     HK Apple Daily
 *
 * CAUSES
 *     Use `setTimeout` to remove elements every 2000ms.
 *         in function `uReadDisplayMsgBox`
 *
 * SOLUTION
 *     Insert JavaScript code into now page to disable all `setTimeout`.
 *     But I also access the page resources to double check.
 */

const insertHK = (url) => {
    fetch(url)
        .then(response => response.text())
        .then(respText => {
            if ($('.ArticleContent_Outer').length !== $('.ArticleContent_Outer', respText).length)
                $('#articleContent').replaceWith($('#articleContent'), srcElement);
        })
        .catch(error => {
            $('.LHSBorderBox').prepend(
                `<p style="color: red; font-size: 16px; font-weight: bold;">
                    AppleDaily Viewer fetch failed:
                    <br />
                    ${error}
                </p>`);
        });
};