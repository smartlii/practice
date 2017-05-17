//入口函数
function init() {
	judge();
}
init();

//改变搜索栏形状。
function change() {
	var $wrapper = $('.wrapper');
	var $search = $('.search');
	var $circle = $('.circle');
	var $squ = $('.square');

	$wrapper.animate({
		width: '245px'
	}, 400);

	$search.animate({
		width: '140px'
	}, 400);
	$squ.animate({
		width: '40px',
		left: '190px'
	}, 400);

	setTimeout(inputChange, 400);
	setTimeout(function () {
		if($wrapper.css('width') == '210px') {
			//如果没有输入文字或者直接点击搜索，默认跳转到百度搜索界面
			if($search.val() == '请输入关键字' && $search.val() == ''){
				$('a').attr('href', 'https://www.baidu.com/s');
			}else{
				$('a').attr('href', 'https://www.baidu.com/s?wd=' + $search.val());
			}
		}
	}, 400);
}

//实现搜索栏的可拖拽效果。
function drag(elem) {
	var $wrapper = $('.wrapper');

	$wrapper.on({
    	mousedown: function(e){
            var _self=$(this);
            var offset = _self.offset(), 
            	dx = e.pageX-offset.left, 
            	dy = e.pageY-offset.top;
            $(document).on('mousemove.drag', function(e){ 
            	_self.offset({
            		top: e.pageY-dy, 
            		left: e.pageX-dx
            	}); 
            });
        },
  		mouseup: function(e){ 
  			$(document).off('mousemove.drag'); 
  		}
	});
}

//判断为拖拽事件还是点击事件
function judge() {
 	var firstTime,
       	lastTime,
       	flag = false;
	var $circle = $('.circle');
	var $wrapper = $('.wrapper');

	//根据时间差来确定事件类型。
 	$(document).on("mousedown", function (e) {
 		firstTime = new Date().getTime();
 	});

	$(document).on("mouseup", function (e) {
		lastTime = new Date().getTime();

 		if (lastTime - firstTime < 200) {
			flag = true;
 		}else {
 			flag = false;
 		}
	});

	//如果为点击事件。点击展开搜索框
	$wrapper.on('click', function(e) {
    	if (flag) {
			change();
 		}
    });
	//如果为拖拽事件。进行拖拽
	if(!flag) {
		drag();
	}
}

//改变输入框内的样式
function inputChange() {
	$('.search').on('focus', function(e) {
		if(this.value == '请输入检索关键字') {
			this.value = '';
		}

	})
	$('.search').on('blur', function(e) {
		if(this.value == '') {
			this.value = '请输入检索关键字';
		}
	})
	//保证搜索地址实时刷新。
	$('.search').on('keyup', function(e) {
		$('a').attr('href', 'https://www.baidu.com/s?wd=' + $('.search').val());
	})
}
