	//封装好的 Ajax ：打开方式 地址 是否异步 回调函数 提交数据
	function Ajax (method,address,flag,callBacks,data) {
		var xhr = null;
		if(window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		if (method == 'get') {
			xhr.open('get',address,flag);
			xhr.send();		
		}else if (method == 'post') {
			xhr.open('post',address,flag);
			xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
			xhr.send(data);			
		}
		
		xhr.onreadystatechange = function() {

			if ( xhr.readyState == 4 ) {
				if ( xhr.status == 200 ) {
					callBacks(xhr.responseText);
				} else {
					alert('出错了,Err：' + xhr.status);
				}
			}
		}	
		
	}