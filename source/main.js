/*
 * ORIGIN
 *     TW/HK Apple Daily
 *
 * CAUSES
 *     Use `setInterval` and `setTimeout` to remove elements.
 *
 * SOLUTION
 *     1. Insert JavaScript code into now page to disable all `setInterval` and `setTimeout`.
 *     2. Reload page and get page source.
 *     3. Insert contents into now page.
 */

const pathname = window.location.pathname; // Returns path only (/path/example.html)
const url = window.location.href;          // Returns full URL  (https://example.com/path/example.html)
const origin = window.location.origin;     // Returns base URL  (https://example.com)

let isAppleDailyHK = false;
let isAppleDailyTW = false;
let isNextmag      = false;

if (origin.indexOf('//hk.')   !== -1) isAppleDailyHK = true;
if (origin.indexOf('//tw.')   !== -1) isAppleDailyTW = true;
if (origin.indexOf('nextmag') !== -1) isNextmag      = true;

const script = document.createElement('script');
script.appendChild(
    document.createTextNode(
                          `(${() => { Object.defineProperty(window, 'setInterval', { value: () => {}, writable: false }); }})();` +
        (isAppleDailyHK ? `(${() => { Object.defineProperty(window, 'setTimeout' , { value: () => {}, writable: false }); }})();` : '')
    )
);
(document.head || document.documentElement).appendChild(script);

$(() => {
    if (isAppleDailyHK) insertHK(url);
    if (isAppleDailyTW) insertTW(url);
    if (isNextmag)      insertNextmag(url);
});