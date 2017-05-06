// 注册界面
function login() {
	var $content = $('<div class="close">x</div>\
		<p><label for="emial">邮箱</label><input type="text" value="可用于登陆和找回密码" id="email"></p>\
		<p><label for="password">密码</label><input type="text" value="密码" id="password"></p>\
		<p><label for="textNum">验证码</label><input type="text" value="验证码" id="textNum"></p>\
		<p><input type="button" value="获取短信验证码" id="textBtn"></p>\
		<p><input type="checkbox" checked id="checkBtn"><span>阅读并接受<a href="#">《德邦用户协议》</a></span></p>\
		</div>');
	$('.loginText1').on('click' ,insertLogin);
	function insertLogin() {
		$('.login').append($content);
		$('.mask').css('width',$(window).width())
				.css('height',$(window).height());
		console.log(1)
		redirection1($('.login'));
		redirection2($('.mask'));
		$('.mask').css('display','block');
		$('.login').css('display','block');
		$(window).on('scroll',function (e){
			redirection1($('.login'));
			redirection2($('.mask'));
		});
		loginEvent();
	}
	//重新给定位登陆框
	function redirection1 (obj){
		console.log(2)
		obj.css('left',($(window).width() - obj.outerWidth())/2 + $(window).scrollLeft())
			.css('top',($(window).height() - obj.outerHeight())/2 + $(window).scrollTop());
	}
	//重新定义背景长度
	function redirection2 (obj){
		console.log(3)
		obj.css('width',($(window).width()+$(window).scrollLeft()))
			.css('height',($(window).height()+$(window).scrollTop()));
	}
	// 注册界面的事件
	function loginEvent(){
		//关闭按钮
		$('.close').on('click',function(){
			$('.mask').css('display','none');
			$('.login').css('display','none');
			$content.remove();
		});
		//email
		$('#email').on('focus', function(){
			if(this.value == "可用于登陆和找回密码") {
				this.value = "";
			}
		});
		$('#email').on('blur', function(){
			if(this.value == ""){
				this.value = "可用于登陆和找回密码";
			}
		});
		//密码
		$('#password').on('focus',function(){
			if(this.value == "密码"){
				this.value = "";
			}
		});
		$('#password').on('blur',function(){
			if(this.value == ""){
				this.value ="密码";
			}
		});
		//验证码
		$('#textNum').on('focus',function(){
			if(this.value == "验证码"){
				this.value = "";
			}
		});
		$('#textNum').on('blur',function(){
			if(this.value == ""){
				this.value = "验证码";
			}
		});
	}
}
login();
//城市选择
function chooCity() {
	//请输入关键字
	$('.key').on('focus',function (e){
		if(this.value == "请输入职位关键字"){
			this.value = "";
		}
	});
	$('.key').on('blur',function (e){
		if(this.value == ""){
			this.value = "请输入职位关键字";
		}
	});
	

	$('.chooCity').css('display', 'none');
	$('.default').on('mouseover', function(){
		$('.chooCity').css('display', 'block');
		$('.chooCity').on('mouseover', function(){
			$('.chooCity').css('display', 'block');
		})
		$('.chooCity').on('mouseout', function(){
			$('.chooCity').css('display', 'none');
		})
	})
	//城市类型选择
	function createCity(){
	// $('.chooCity').css('dispaly','block');
	var index = 0;
	var cityLet = ['热门', 'A-C', 'D-G', 'H-J', 'K-N', 'P-T', 'W-Z']
	var city = [
		['石家庄', '北京', '上海', '天津', '重庆', '广州', '深圳', '东莞', '杭州', '成都', '沈阳', '大连', '南京', '苏州', '哈尔滨', '武汉', '长沙', '不限'],
		['巴音郭楞', '包头', '宝鸡', '北京', '博罗', '沧州', '常州', '长春', '长沙', '成都', '西双版纳', '重庆'],
		['大连', '大庆', '德宏', '东莞', '佛山', '福州', '广州', '桂林', '贵港', '贵阳'],
		['哈尔滨', '海安', '海口', '海门', '海宁', '杭州', '合肥', '河池', '贺州', '呼和浩特', '淮安', '惠州', '鸡西', '吉林', '济南', '佳木斯', '江门', '金华', '晋江'],
		['开封', '昆明', '临沧', '柳州', '洛阳', '南安', '南昌', '南京', '南宁', '南通', '南阳', '宁波'],
		['莆田', '普洱', '七台河', '齐齐哈尔', '启东', '黔东南', '钦州', '青岛', '泉州', '如皋', '三门峡', '三明', '汕头', '汕尾', '上海', '深圳', '沈阳', '石家庄', '石狮', '松原', '苏州', '宿迁', '台州', '太原', '天津'],
		['威海', '潍坊', '温州', '乌鲁木齐', '无锡', '梧州', '武汉', '西安', '厦门', '湘潭', '新沂', '信阳', '徐州', '许昌', '延边', '阳江', '伊春', '义务', '益阳', '玉溪', '岳阳', '云浮', '肇庆', '郑州', '中山', '周口', '珠海', '株洲', '驻马店', '淄博', '遵义']
	];
	$('.chooCity').append('<ul class="cityLet"></ul>');
	$('.chooCity').append('<ul class="cityGath"></ul>')
	//城市首字母
	for(var i = 0; i < cityLet.length; i ++){
		$('.cityLet').append('<li></li>');
		$('.cityLet li').eq(i).text(cityLet[i]);
	}
	//城市选择 初始化
	for(var i = 0; i < city[0].length; i ++){
		$('.cityGath').append('<li></li>');
		$('.cityGath li').eq(i).text(city[index][i]);
	}
	//城市选择
	for(var i = 0; i < $('.cityLet li').length; i ++){
		(function(j){
			$('.cityLet li').eq(j).on('mouseover', function(){
				var index = j;
				$('.cityGath li').detach();
				for(var i = 0; i < city[j].length; i ++){
					$('.cityGath').append('<li></li>');
					$('.cityGath li').eq(i).text(city[index][i]);
					$('.cityLet li').eq(i).removeClass('select');
					$('.cityLet li').eq(j).addClass('select');
				}
			})
		}(i))
	}
	$('.default').text('哈尔滨');
	$('.cityGath').on('click', function(event){
		var event = window.event || e;
		$('.default').text($(event.target).text());
		console.log($(event.target).text())
	})
	}
	createCity();
}
chooCity();
//工作类型样式

function kind() {
	$('.kind li').eq(0).css('backgroundColor','#373c64');
	$('.kind li a').eq(0).css('color','#fff');
	for(var i = 1; i < $('.kind li').length; i ++){
		(function(j){
			$('.kind li').eq(j).on('mouseover',function(){
				$('.kind li').eq(j).css('backgroundColor','#373c64');
				$('.kind li a').eq(j).css('color','#fff');
			});
			$('.kind li').eq(j).on('mouseout',function(){
				$('.kind li').eq(j).css('backgroundColor','#fff');
				$('.kind li a').eq(j).css('color','#000');
			});
		}(i))
	}
}
kind();
//生成职位信息
function getPosition() {
	var index = 1;//代表页数
	var start = (index-1)*10;//起始li角标
	var end = index*10;//末位li
	var $a = $('.page a').not('.last')
							.not('.next');
	// console.log(last)
	var posClass = ['spl1', 'spl2', 'spl3', 'spl4', 'spl5', 'spl6'];
	var posName = ['职位名称', '工作地点', '薪资', '工作经验', '最低学历', '发布时间'];
	var posText = [
		['会展德邦6千诚聘快递员1', '哈尔滨-南岗', '5000-8000', '工作经验：不限', '学历要求：高中', '2016-05-27'],
		['哈尔滨德邦物流聘电叉司机', '哈尔滨-哈尔滨', '3000-5000', '工作经验：1-2年', '学历要求：不限', '2016-05-23'],
		['德邦3千5聘跟车接送货员', '哈尔滨-平房', '3000-5000', '工作经验：不限', '学历要求：不限', '2016-05-26'],
		['学府路德邦5千诚聘快递员', '哈尔滨-香坊周边', '5000-8000', '工作经验：不限', '学历要求：高中', '2016-05-27'],
		['德邦5千诚聘教化街快递员', '哈尔滨-南岗', '5000-8000', '工作经验：不限', '学历要求：高中', '2016-05-27'],
		['神州德邦5千诚聘快递员', '哈尔滨-道外', '5000-8000', '工作经验：不限', '学历要求：高中', '2016-05-27'],
		['德邦5千诚聘靖宇街快递员', '哈尔滨-靖宇', '3000_5000', '工作经验：不限', '学历要求：高中', '2016-05-24'],
		['哈尔滨德邦5千聘快递员', '哈尔滨-哈尔滨', '5000_8000', '工作经验：不限', '学历要求：高中', '2016-05-30'],
		['哈尔滨德邦5千聘快递员', '哈尔滨-哈尔滨', '5000_8000', '工作经验：不限', '学历要求：高中', '2016-05-30'],
		['会展德邦6千诚聘快递员2', '哈尔滨-南岗', '5000-8000', '工作经验：不限', '学历要求：高中', '2016-05-27'],
		['哈尔滨德邦物流聘电叉司机', '哈尔滨-哈尔滨', '3000-5000', '工作经验：1-2年', '学历要求：不限', '2016-05-23'],
		['德邦3千5聘跟车接送货员', '哈尔滨-平房', '3000-5000', '工作经验：不限', '学历要求：不限', '2016-05-26'],
		['学府路德邦5千诚聘快递员', '哈尔滨-香坊周边', '5000-8000', '工作经验：不限', '学历要求：高中', '2016-05-27'],
		['德邦5千诚聘教化街快递员', '哈尔滨-南岗', '5000-8000', '工作经验：不限', '学历要求：高中', '2016-05-27'],
		['神州德邦5千诚聘快递员', '哈尔滨-道外', '5000-8000', '工作经验：不限', '学历要求：高中', '2016-05-27'],
		['德邦5千诚聘靖宇街快递员', '哈尔滨-靖宇', '3000_5000', '工作经验：不限', '学历要求：高中', '2016-05-24'],
		['哈尔滨德邦5千聘快递员', '哈尔滨-哈尔滨', '5000_8000', '工作经验：不限', '学历要求：高中', '2016-05-30'],
		['哈尔滨德邦5千聘快递员', '哈尔滨-哈尔滨', '5000_8000', '工作经验：不限', '学历要求：高中', '2016-05-30'],
		['哈尔滨德邦物流聘电叉司机', '哈尔滨-哈尔滨', '3000-5000', '工作经验：1-2年', '学历要求：不限', '2016-05-23'],
		['德邦3千5聘跟车接送货员', '哈尔滨-平房', '3000-5000', '工作经验：不限', '学历要求：不限', '2016-05-26'],
		['学府路德邦5千诚聘快递员', '哈尔滨-香坊周边', '5000-8000', '工作经验：不限', '学历要求：高中', '2016-05-27'],
		['德邦5千诚聘教化街快递员', '哈尔滨-南岗', '5000-8000', '工作经验：不限', '学历要求：高中', '2016-05-27'],
		['神州德邦5千诚聘快递员', '哈尔滨-道外', '5000-8000', '工作经验：不限', '学历要求：高中', '2016-05-27'],
		['德邦5千诚聘靖宇街快递员', '哈尔滨-靖宇', '3000_5000', '工作经验：不限', '学历要求：高中', '2016-05-24'],
		['德邦5千诚聘靖宇街快递员', '哈尔滨-靖宇', '3000_5000', '工作经验：不限', '学历要求：高中', '2016-05-24']
	];
	//职位头部的初始化
	function posTittle() {
		var oul = document.createElement('ul');
		oul.className = "name";
		// console.log(1)
		for(var i =0; i < posName.length; i ++){
			var li = document.createElement('li');
			li.className = posClass[i];
			li.innerText = posName[i];
			oul.appendChild(li);
		}
		$('.insert').append(oul);
		// console.log(oul)
	}
	posTittle();
	//进行职位信息的初始化
	function posInformation(){
		$('.introduce ul').detach();
		posTittle();
		var div2 = document.createElement('div');
		div2.className = "insert2";
		for(var i = start; i < end; i++){
			var oul2 = document.createElement('ul');
			for(var j = 0; j < posText[0].length; j++){
				var li = document.createElement('li');
				li.innerText = posText[i][j];
				oul2.appendChild(li);
				console.log(1)
			}
			console.log(2)
			div2.appendChild(oul2);
		}
		console.log(3)
		$('.insert').append(div2);
	}
	posInformation();
	// 控制页数变换
	function pageChange(){
		$('.1').addClass('select');
		$('.last').css('display','none');
		//点击1-3的时候
		
		for(var i = 0; i < $a.length; i ++){
			(function(k){
				$a.eq(k).on('click',function(){
					for(var j = 0;j < $a.length; j++){
						$a.eq(j).removeClass('select');
						$(this).addClass('select');
					}

					index = k + 1;
					start = (index - 1) * 10;//三个参数传不到上一个函数
					end = index * 10;
					if(posText.length - start < 10){
						end = posText.length;
					}
					posInformation();
					console.log(index);
					$('.last').css('display','inline-block');
					$('.next').css('display','inline-block');
					if($(this).text() == 1){
						$('.last').css('display','none');
					}
					if($(this).text() == 3) {
						$('.next').css('display','none');
					}					
				});
			}(i));
		}
	}
	pageChange();

	//上一页，下一页
	function pageTurn() {
		//下一页
		$('.next').on('click',function(){
			$('.page a').eq(index).removeClass('select');
			$('.page a').eq(index+1).addClass('select');
			index = index + 1;
			start = (index - 1) * 10;//三个参数传不到上一个函数
			end = index * 10;
			if(posText.length - start < 10){
				end = posText.length;
			}
			posInformation();
			if(index == 3){
				$('.next').css('display','none');
				$('.last').css('display','inline-block');
			}else if(index == 2){
				$('.last').css('display','inline-block');
			}
		});
		//上一页
		$('.last').on('click',function(){
			$('.page a').eq(index).removeClass('select');
			$('.page a').eq(index-1).addClass('select');
			index = index - 1;
			start = (index - 1) * 10;//三个参数传不到上一个函数
			end = index * 10;
			posInformation();
			if(index == 1 ){
				$('.last').css('display','none');
				$('.next').css('display','inline-block');
			}else if(index == 2){
				$('.next').css('display','inline-block');
			}
		})
	}
	pageTurn();
}
getPosition();


//轮播图
function picLunbo(){
	var move = $('.main .feel .pic .move');
	var index = 0;
	var flag = true;

	function init(){	//初始化
		// move.css('left', '0');
		move.eq(0).css({'width': '330px','height': '190px','top': '50%','left': '0px','margin-top': '-95px','margin-left': '0px','opacity': '0.4','z-index': '1'})
		move.eq(1).css({'width': '415px','height': '240px','top': '50%','left': '45px','margin-top': '-120px','margin-left': '0px','opacity': '0.6','z-index': '2'})
		move.eq(2).css({'width': '520px','height': '300px','top': '50%','left': '90px','margin-top': '-150px','margin-left': '0px','opacity': '0.8','z-index': '3'})
		move.eq(3).css({'width': '640px','height': '370px','top': '50%','left': '135px','margin-top': '-185px','margin-left': '0px','opacity': '1','z-index': '4'})
		move.eq(4).css({'width': '520px','height': '300px','top': '50%','left': '300px','margin-top': '-150px','margin-left': '0px','opacity': '0.8','z-index': '3'})
		move.eq(5).css({'width': '415px','height': '240px','top': '50%','left': '450px','margin-top': '-120px','margin-left': '0px','opacity': '0.6','z-index': '2'})
		move.eq(6).css({'width': '330px','height': '190px','top': '50%','left': '580px','margin-top': '-95px','margin-left': '0px','opacity': '0.4','z-index': '1'})
	}
	function rightMove(){
		if(flag){
			flag = false;
			move.eq(index % 7).animate({'width': '330px','height': '190px','top': '50%','left': '0px','margin-top': '-95px','margin-left': '0px','opacity': '0.4','z-index': '1'})
			move.eq((index + 1) % 7).animate({'width': '415px','height': '240px','top': '50%','left': '45px','margin-top': '-120px','margin-left': '0px','opacity': '0.6','z-index': '2'})
			move.eq((index + 2) % 7).animate({'width': '520px','height': '300px','top': '50%','left': '90px','margin-top': '-150px','margin-left': '0px','opacity': '0.8','z-index': '3'})
			move.eq((index + 3) % 7).animate({'width': '640px','height': '370px','top': '50%','left': '135px','margin-top': '-185px','margin-left': '0px','opacity': '1','z-index': '4'})
			move.eq((index + 4) % 7).animate({'width': '520px','height': '300px','top': '50%','left': '300px','margin-top': '-150px','margin-left': '0px','opacity': '0.8','z-index': '3'})
			move.eq((index + 5) % 7).animate({'width': '415px','height': '240px','top': '50%','left': '450px','margin-top': '-120px','margin-left': '0px','opacity': '0.6','z-index': '2'})
			move.eq((index + 6) % 7).animate({'width': '330px','height': '190px','top': '50%','left': '580px','margin-top': '-95px','margin-left': '0px','opacity': '0.4','z-index': '1'}, function(){
				index ++;
				flag = true;
			})	
		}
	}
	function leftMove(){
		if(flag){
			flag = false;
			move.eq((index - 1) % 7).animate({'width': '330px','height': '190px','top': '50%','left': '0px','margin-top': '-95px','margin-left': '0px','opacity': '0.4','z-index': '1'})
			move.eq(index % 7).animate({'width': '415px','height': '240px','top': '50%','left': '45px','margin-top': '-120px','margin-left': '0px','opacity': '0.6','z-index': '2'})
			move.eq((index + 1) % 7).animate({'width': '520px','height': '300px','top': '50%','left': '90px','margin-top': '-150px','margin-left': '0px','opacity': '0.8','z-index': '3'})
			move.eq((index + 2) % 7).animate({'width': '640px','height': '370px','top': '50%','left': '135px','margin-top': '-185px','margin-left': '0px','opacity': '1','z-index': '4'})
			move.eq((index + 3) % 7).animate({'width': '520px','height': '300px','top': '50%','left': '300px','margin-top': '-150px','margin-left': '0px','opacity': '0.8','z-index': '3'})
			move.eq((index + 4) % 7).animate({'width': '415px','height': '240px','top': '50%','left': '450px','margin-top': '-120px','margin-left': '0px','opacity': '0.6','z-index': '2'})
			move.eq((index + 5) % 7).animate({'width': '330px','height': '190px','top': '50%','left': '580px','margin-top': '-95px','margin-left': '0px','opacity': '0.4','z-index': '1'}, function(){
				index --;
				flag = true;
			})	
		}
	}
	$('.prev').on('click', function(){
		leftMove();
	})
	$('.next').on('click', function(){
		rightMove();
	})

	timer = setInterval(leftMove, 3000);

	$('.pic').on('mousemove', function(){
		clearInterval(timer);
	})
	$('.pic').on('mouseout', function(){
		timer = setInterval(leftMove, 3000);
	})
	init();
}
picLunbo()
