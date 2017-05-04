function getScrollOffset() {
    if (window.pageYOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    }

    return {
        x: document.documentElement.scrollLeft + document.body.scrollLeft,
        y: document.documentElement.scrollTop + document.body.scrollTop
    }
}

function getViewportOffset() {

    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    }
    if (document.compatMode == "CSS1Compat") {
        return {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight
        }
    } else if (document.compatMode == "BackCompat") {
        return {
            w: document.body.clientWidth,
            h: document.body.clientHeight
        }
    }
}

function getElementOffset(ele) {
    var box = ele.getBoundingClientRect();
    var w = box.width || (box.right - box.left);
    var h = box.height || (box.bottom - box.top);
    return {
        w: w,
        h: h
    }
}

function getElementPostion(ele) {

    var x = 0,
        y = 0;

    while (ele != document.body) {
        x += ele.offsetLeft;
        y += ele.offsetTop;
        ele = ele.offsetParent;
    }

    return {
        x: x,
        y: y
    }
}

function getStyle(obj, styleProp) {

    if (obj.currentStyle) {
        return obj.currentStyle[styleProp];
    } else {
        return window.getComputedStyle(obj, null)[styleProp];
    }
}
