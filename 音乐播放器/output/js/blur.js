(function ($, w) {
    'use strict';

    var root = w.player ? w.player : w.player = {};

    function blurImg(img, wrap) {

        var w = img.width,
            h = img.height;

        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        canvas.width = w;
        canvas.height = h;

        ctx.drawImage(img, 0, 0, w, h);

        var pixel = ctx.getImageData(0, 0, w, h);

        var worker = new Worker('./gaussBlur.js');

        var newPixel = gaussBlur1(pixel, 10);

        ctx.putImageData(newPixel, 0, 0);

        var imageData = canvas.toDataURL();

        wrap.css('background-image', 'url(' + imageData + ')');
    }

    // 绑定到 window.player 下面

    root.blurImg = blurImg;

})($, window);