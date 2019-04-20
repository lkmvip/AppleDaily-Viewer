var pathname = window.location.pathname; // Returns path only (/path/example.html)
var url = window.location.href;          // Returns full URL  (https://example.com/path/example.html)
var origin = window.location.origin;     // Returns base URL  (https://example.com)

if (origin.indexOf('//hk.') !== -1)
    insertHK();

if (origin.indexOf('//tw.') !== -1)
    insertTW();