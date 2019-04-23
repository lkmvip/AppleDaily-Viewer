/*
 * ORIGIN
 *     HK Apple Daily
 *
 * CAUSES
 *     Use `setTimeOut` to remove elements every 2000ms.
 *         in function `uReadDisplayMsgBox`
 *
 * SOLUTION
 *     Insert JavaScript code into now page to clear all timeout.
 *     But I also access the page resources to double check.
 *
 *        ```javascript
 *        <script type="text/javascript">
 *            var timeouts = setTimeout(function() { }, 0);
 *                while (timeouts--)
 *                    window.clearTimeout(timeouts);
 *        </script>
 *        ```
 */

const insertHK = () => {
    $(document.body).append(
        `<script type="text/javascript">
             var timeouts = setTimeout(function() { }, 0);
             while (timeouts--)
                 window.clearTimeout(timeouts);
         </script>`);
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
}