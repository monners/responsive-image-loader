/* jshint browser: true, debug: true */

'use strict';
// EXAMPLE USAGE CALL:
//
// init({
//     baseUrl: 'data-img-desktop', // will be used as largest, AND default if no other responsive tags are used
//     responsive: [ // Array of breakpoint objects
//         {
//             breakpoint: 1024,
//             url: 'data-img-tablet'
//         },
//         {
//             breakpoint: 769,
//             url: 'data-img-mobile'
//         }
//     ],
//     lazyLoad: true
// });


var getClientWidth = function () {
    return document.body.clientWidth;
};

var getClientHeight = function () {
    return document.documentElement.clientHeight;
};

var getElemVerticalOffset = function (el) {
    return el.getBoundingClientRect().top;
};

var getImages = function (attr) {
    return [].slice.call(document.querySelectorAll('[' + attr + ']'));
};

var hasBackgroundImage = function (el) {
    return el.style.backgroundImage.length > 0;
};

var hasSameBackgroundImage = function (el, url) {
    // Match 'url([group 1])' format, so that address can be compared
    return el.style.backgroundImage.match(/url\((.+?)\)/)[1] === url;
};

var applyImage = function (el, url) {
    // If no backgroundImage, apply backgroundImage
    if (!hasBackgroundImage(el)) {
        el.style.backgroundImage = 'url("' + url + '")';
        return;

    // If there's already a backgroudImage, and it's the same as the responsive url, do nothing
    // This is important for mobile
    } else if (hasSameBackgroundImage(el, url)) {
        return;

    // Otherwise, the responsive url is new, and the image should be swapped
    } else {
        el.style.backgroundImage = 'url("' + url + '")';
        return;
    }
};

var orderBreakpoints = function(arr) {
    return arr.sort(function(a, b) {
        return a.breakpoint - b.breakpoint;
    });
};

var getFirstMatch = function(arr, size) {
    var breakpoints = orderBreakpoints(arr, 'breakpoint');
    for (var i = 0; i < breakpoints.length; i++) {
        if (size < breakpoints[i].breakpoint) {
            return breakpoints[i].url;
        }
    }
    return false;
};

var isInViewport = function (el) {
    return (getElemVerticalOffset(el) - 200) < getClientHeight(); // 200px buffer to trigger load shortly before image comes into view
};


var init = function(options) {
    var images = getImages(options.baseUrl);
    var size = getClientWidth();
    var url = getFirstMatch(options.responsive, size) || options.baseUrl;

    images.forEach(function(cur) {
        var setUrl = cur.attributes[url] || cur.attributes[options.baseUrl];
        // Lazyload variation
        if (isInViewport(cur) && options.lazyLoad) {
            applyImage(cur, setUrl.value);
        }

        // Non-lazyload variation
        if (!options.lazyLoad) {
            applyImage(cur, setUrl.value);
        }
    });
};

module.exports = init;
