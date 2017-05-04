function getStyle(obj,styleProp) {
    if(obj.currentStyle) {
        return obj.currentStyle[styleProp];
    }else{
        return window.getComputedStyle(obj,null)[styleProp];
    }
}