var $slider = document.getElementsByClassName('slider')[0],
    $sliderPage = document.getElementsByClassName('slider-page')[0],
    sliderIndex = 0,
    slideTimer;



function move(obj, targetDistance) {
    var speed,
        count = 0,
        startStatus = parseInt(getStyle(obj, 'left')),
        timer;

    speed = targetDistance > 0 ? 20 : -20;

    timer = window.setInterval(function() {

        obj.style.left = parseInt(getStyle(obj, 'left')) + speed + 'px';
        count += speed;
        if(Math.abs(count) > Math.abs(targetDistance)) {
            obj.style.left = startStatus + targetDistance + 'px';
            window.clearInterval(timer);
        }
    }, 15);
}

function sliding(obj, direction) {

    var sliderCollection = obj.children,
        len = sliderCollection.length,
        moveDistance = parseInt(getStyle(sliderCollection[0], 'width'));

    if(direction < 0) {
        moveDistance = -moveDistance;
    }
    window.clearInterval(slideTimer);
    slideTimer = window.setInterval(function() {


        if(direction < 0 && parseInt(getStyle(obj, 'left')) == (len - 1) * moveDistance ) {
            obj.style.left = '0px';
        }else if(direction > 0 && parseInt(getStyle(obj, 'left')) == 0) {
            obj.style.left = -(len - 1) * moveDistance + 'px';
        }
        computesIndex(direction);
        move(obj, moveDistance);
        transformIndex(sliderIndex);

    }, 3000);
}

function computesIndex(direction) {
    var len = $sliderPage.children.length;
    if(direction < 0) {
        sliderIndex ++;
        if(sliderIndex > 3) {
            sliderIndex = 0;
        }
    }else if(direction > 0) {
        sliderIndex --;
        if(sliderIndex < 0) {
            sliderIndex = 3;
        }
    }
}

function transformIndex(index) {

    var child = $sliderPage.children,
        len = child.length;
    for(var i = 0; i < len; i++ ) {
        child[i].setAttribute('class', '');
    }
    child[index].setAttribute('class', 'active');
}


function init() {
    sliding($slider, -1);
}


init();




// sliding($slider, -1);

