//__inline 将我们的模板引入进来，模板函数

// 数据接口地址
 var dataUrl = './data/data.json';

 // 音频管理对象

 var audioManager;

 // 作用域
 var $scope = $(document.body);

 // 定义audio管理对象

 var AudioManager = function (dataList) {
 	this.dataList = dataList;
 	//数据索引
 	this.index = 0;
 	// 数据长度
 	this.len = dataList.length;
 	// audio对象
 	this.audio = new Audio();
 	// 设置preload属性
 	this.audio.preload = 'auto';
 	this.duration = dataList[0].duration;
 	this.autoPlay = false;
 	this.setAudio();
 	this.bindAudioEvent();
 }

 AudioManager.prototype = {
 	// 播放下一首
 	playNext: function () {
 		this.index++;
 		if (this.index === this.len) {
 			this.index = 0;
 		}

 		// 调用一个方法
 		this.setAudio();
 	},
 	// 播放上一首
 	playPrev: function () {
 		this.index--;
 		if (this.index === -1) {
 			this.index = this.len - 1;
 		}
 		// 调用一个方法
 		this.setAudio();
 	},
 	// 播放指定一首
 	playIndex: function (index) {
 		this.index = index;
 		// 调用一个方法
 		this.setAudio();
 	},
 	setAudio: function () {
 		// 首先获取到当前歌曲的信息
 		var data = this.dataList[this.index];

 		this.duration = data.duration;
 		this.audio.src = data.audio;

 		//触发changeAudio事件
 		$scope.trigger('changeAudio');
 	},
 	// 给audio对象绑定事件
 	bindAudioEvent: function () {
 		// ended当我们有首歌播放结束以后，直接播放下一首
 		var _self = this;
 		$(this.audio).on('ended', function () {
 			_self.playNext();
 		});
 		// loadedmetadata
 		$(this.audio).on('loadedmetadata', function () {
 			if (_self.autoPlay) {
 				this.play();
 			}

 			// $loadingLayer.hide();
 		});
 	},
 	// 播放函数
 	play: function () {
 		this.autoPlay = true;
 		this.audio.play();
 	},
 	// 暂停函数
 	pause: function () {
 		this.autoPlay = false;
 		this.audio.pause();
 	},
 	//获取当前歌曲信息
 	getCurInfo: function () {
 		return this.dataList[this.index];
 	},
 	// 获取当前播放的百分比
 	getPlayRatio: function () {
 		return this.audio.currentTime / this.duration;
 	},
 	// 获取当前的播放时间
 	getCurrentTime: function (ratio){
 		// 要进行取整的处理
 		var curTime = this.audio.currentTime;
 		if (ratio) {
 			curTime = ratio * this.duration;
 		}
 		return Math.round(curTime);
 	},
 	// 从当前时间开始播放
 	jumpToPlay: function (ratio) {
 		var time = ratio * this.duration;
 		this.autoPlay = true;
 		// 下面一行代码可以让当前audio从time开始播放
 		this.audio.currentTime = time;
 		// 为了避免是在暂停的情况下拖拽小点
 		this.audio.play();
 	}
 }

 //audioManager end

var controlManager = (function () {
	var $playBtn = $('.play-btn'),
		$nextBtn = $('.next-btn'),
		$prevBtn = $('.pre-btn'),
		$likeBtn = $('.like-btn'),
		$songImg = $('.song-img img'),
		$songInfo = $('.song-info'),
		infoTmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h1 class="song-name">'+
((__t=( obj.song ))==null?'':__t)+
'</h1>\n<h3 class="singer-name">'+
((__t=( obj.singer ))==null?'':__t)+
'</h3>\n<h3 class="album-name">专辑：'+
((__t=( obj.album ))==null?'':__t)+
'</h3>\n<h3 class="rhythm">编曲：'+
((__t=( obj.rhythm ))==null?'':__t)+
'</h3>\n<h3 class="lyric">歌词：'+
((__t=( obj.lyric ))==null?'':__t)+
'</h3>';
}
return __p;
},
		$timeCur = $('.cur-time'),
		$timeDuration = $('.all-time'),
		likeList = [false, false, false, false,  false],
		frameId;
	// 点赞
	// 一般 我们点赞之后会发送到服务器
	// 我们演示，就存到js文件里面的变量里
	// 绑定事件
	function addClickEvent () {
		$playBtn.on('click', function () {
			if ($(this).hasClass('playing')) {
				// 暂停
				audioManager.pause();
			} else {
				// 播放
				audioManager.play();
				setProcess();
			}
			$(this).toggleClass('playing');
		});

		$nextBtn.on('click', function () {
			audioManager.playNext();
		});
		$prevBtn.on('click', function () {
			audioManager.playPrev();
		});
		$likeBtn.on('click', function () {
			var index = audioManager.index;
			if(likeList[index]){
				return;
			}else {
				//为了修改点赞按钮的样式
				$(this).addClass('disabled');
				//标记当前歌曲已经点赞
				likeList[index] = true;
			}
		});
	}
	// controlManager初始函数
	var init = function () {
		renderInfo();
		addClickEvent();
		addProcessEvent();
		// 绑定changeAudio事件
		// 解耦
		// 在audioManager --> controlManager -- > 事件机制
		$scope.on('changeAudio', function () {
			renderInfo();
			setProcess();
		});
	}
	// 渲染页面
	function renderInfo () {
		var curData = audioManager.getCurInfo(),
			setImage = function (src) {
				var img = new Image();
				$(img).on('load', function () {
					$songImg.attr('src', src);
					blurImg(this, $('.content-wrap'));
				});
				img.src = src;
			};

		// 设置歌曲信息
		$songInfo.html(infoTmpl(curData));

		//设置图片和模糊背景
		setImage(curData.image);

		//设置当前歌曲的总时长
		$timeDuration.text(formatTime(audioManager.duration));
		// 渲染like按钮
		if (likeList[audioManager.index]) {
			$likeBtn.addClass('disabled');
		} else {
			$likeBtn.removeClass('disabled');
		}

	}

	// 格式化时间
	function formatTime (during) {
		var minute = Math.floor(during / 60),
			second = Math.floor(during - minute * 60);
		//取到的分钟是一位数，格式化成两位数
		if (minute < 10) {
			minute = '0' + minute;
		}
		if (second < 10) {
			second = '0' + second;
		}

		return minute + ':' + second;
	}

	// 设置播放进度条
	function setProcess () {
		// 先清除掉frameId
		cancelAnimationFrame(frameId);
		var $proTop = $('.pro-top'),
			frame = function () {
				// 首先需要获得到当前播放的比例
				var playRatio = audioManager.getPlayRatio(),
					translatePercent = (playRatio - 1) * 100,
					time = formatTime(audioManager.getCurrentTime());
				// 渲染当前的播放时间
				$timeCur.text(time);

				// 渲染进度条
				if (translatePercent < 0) {
					$proTop.css({
						transform: 'translateX(' + translatePercent + '%)',
						'-webkit-transform': 'translateX(' + translatePercent + '%)',
					});
					frameId = requestAnimationFrame(frame);
				}else {
					$proTop.css({
						transform: 'translateX(0)',
						'-webkit-transform': 'translateX(0)'
					});
					cancelAnimationFrame(frameId);
				}
			};
		frame();
	}

	// 设置拖拽事件
	function addProcessEvent () {
		var $slidePoint = $('.slide-point'),
			$proTop = $('.pro-top'),
			offsetX = $('.pro-wrap').offset().left,
			width = $('.pro-wrap').width();
		$slidePoint.on('touchstart', function () {
			// 我们要先取消掉AnimationFrame
			cancelAnimationFrame(frameId);
		}).on('touchmove', function (e) {
			var x = e.changedTouches[0].clientX - offsetX,
				ratio = x / width,
				translatePercent = (ratio - 1) * 100,
				time = formatTime(audioManager.getCurrentTime(ratio));
			
			if (ratio < 0 || ratio > 1) {
				return;
			}
			$timeCur.text(time);
			// 设置进度条样式
			$proTop.css({
				transform: 'translateX(' + translatePercent + '%)',
				'-webkit-transform': 'translateX(' + translatePercent + '%)'
			})
			return false;//为了阻止默认事件
		}).on('touchend', function (e) {
			var ratio = (e.changedTouches[0].clientX - offsetX) / width;
			audioManager.jumpToPlay(ratio);
			$playBtn.addClass('playing');
			setProcess();
		})
	}

	return {
		init: init
	}

})();

//controlManager end

// 通过ajax获取数据
var success = function (d) {
	// alert('success');
	// 初始化audioManager
	audioManager = new AudioManager(d);
	controlManager.init();
}
function getData (url, cb) {
	$.ajax({
		url: url,
		type: 'GET',
		success: cb,
		error: function () {
			alert('deal wrong');
		}
	})
}

getData(dataUrl, success);

//end