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

function insertHK() {
    $(document.body).append(
        `<script type="text/javascript">
             var timeouts = setTimeout(function() { }, 0);
             while (timeouts--)
                 window.clearTimeout(timeouts);
         </script>`);
    $.ajax({
        type: 'GET',
        url: url,
        datatype: 'html',
        success: function (data) {
            if ($('.ArticleContent_Outer').length !== $('.ArticleContent_Outer', $(data)).length)
                $('#articleContent').replaceWith($('#articleContent'), $(data));
        }
    });
}