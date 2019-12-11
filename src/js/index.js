

// 菜单悬浮事件
var menuOne = document.getElementsByClassName('service-cd');
var menuTwo = document.getElementsByClassName('service-float');
menuOne.onmouseenter = function(){
    menuTwo.display = "block";
}
menuOne.onmouseleave = function(){
    menuTwo.display = "none";
}
function showMenoTwo() {
    
}
//轮播图
var mySwiper1 = new Swiper ('#swiper1', {
	direction: 'horizontal', // 垂直切换选项
	loop: true, // 循环模式选项

	// 如果需要分页器
	pagination: {
	  el: '.swiper-pagination',
	  clickable: true,
	},

	// 如果需要前进后退按钮
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev',
	  hideOnClick: true,
	},
	// 自动播放
	//autoplay:true,//等同于以下设置
  	autoplay: {
    delay: 2000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
    },
})   
//鼠标移出隐藏按钮，移入显示按钮
mySwiper1.el.onmouseover=function(){
	mySwiper1.navigation.$nextEl.removeClass('hide');
	mySwiper1.navigation.$prevEl.removeClass('hide');
}
mySwiper1.el.onmouseout=function(){
	mySwiper1.navigation.$nextEl.addClass('hide');
	mySwiper1.navigation.$prevEl.addClass('hide');
}   

var mySwiper2 = new Swiper ('#swiper2', {
	direction: 'horizontal', // 垂直切换选项
	loop: true, // 循环模式选项

	// 如果需要分页器
	pagination: {
	  el: '.swiper-pagination',
	  clickable: true,
	},
	// 如果需要前进后退按钮
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev',
	},
	// 自动播放
	//autoplay:true,//等同于以下设置
  	autoplay: {
	    delay: 4000,
	    stopOnLastSlide: false,
	    disableOnInteraction: false,
    },
})   
mySwiper2.el.onmouseover=function(){
	mySwiper2.navigation.$nextEl.removeClass('hide');
	mySwiper2.navigation.$prevEl.removeClass('hide');
}
mySwiper2.el.onmouseout=function(){
	mySwiper2.navigation.$nextEl.addClass('hide');
	mySwiper2.navigation.$prevEl.addClass('hide');
} 
// clo-right
var noticeUl = document.getElementById('notice-ul');
var noticeLis = noticeUl.getElementsByTagName('li');
var noticeDiv = document.getElementById('notice-div');
var ndUl = noticeDiv.getElementsByTagName('ul');
for(var i=0; i<noticeLis.length; i++) {
    noticeLis[i].setAttribute('index',i);
    noticeLis[i].onmouseenter = function(){
        for (var i = 0; i < noticeLis.length; i++) {
            ndUl[i].style.display = "none";
        }
        var index = this.getAttribute('index');
        ndUl[index].style.display = "block";
    }
}

//slidebar
var slidebar = document.getElementById('slidebar');
var aSlidebar = slidebar.getElementsByTagName('a');
document.onscroll = function(){
	var height = window.innerHeight;
	var scrollTotal = scroll().top;
	if(scrollTotal>=height){
		slidebar.className = "slidebar slideScroll";
	} else {
		slidebar.className = "slidebar";
	}
}
//跳楼
slidebar.onclick = function(e){
	var e = e||window.event;
	var target = e.target||e.srcElement;
	if(target.className=='fixedtool-1'){
		document.documentElement.scrollTop = document.querySelector('.layer').offsetTop;
	}
	if(target.className=='fixedtool-2'){
		document.documentElement.scrollTop = document.querySelector('.buy').offsetTop;
	}
	if(target.className=='fixedtool-3'){
		document.documentElement.scrollTop = document.querySelector('.buy').offsetTop;
	}
	if(target.className=='fixedtool-3'){
		document.documentElement.scrollTop = 0;
	}
}
//scroll 页面被卷曲的高度
function scroll(){
	return {
		left:document.documentElement.scrollLeft||document.body.scrollLeft,
		top:document.documentElement.scrollTop||document.body.scrollTop
	}
}
//ajax
function ajax(option){
	//获取默认值
	var url = option.url;//请求路径
	if(!url){
		console.error('请求路径必须传入');
		return;
	}
	var method = (option.method||'get').toLowerCase();//请求方法
	var data = option.data||{};
	//处理请求参数/请求主体
	var params = ""
	for(var key in data){
		params+=key+"="+data[key]+"&"
	}
	params = params.slice(0,-1);
	//获取响应成功的回调函数
	var success = option.success;
	//获取响应出错的回调函数
	var error = option.error
	//获取是否使用xhr进去数据请求
	var dataType = (option.dataType||'json').toLowerCase();
	//如果使用script标签请求数据,传给后台的回调函数名的键,默认是callback
	var jsonp = option.jsonp||'callback';
	//如果使用script标签请求数据,传给后台的回调函数名,默认是随机
	var cb = option.cb||('phone'+new Date().getTime()+Math.random().toString().slice(2));

	//如果使用xhr对象(json)请求数据
	if(dataType=="json"){
		//创建xhr对象
		var xhr = new XMLHttpRequest;
		//请求
		if(method=="get"){
			xhr.open('get',url+"?"+params);
			xhr.send(null)
		}
		if(method=="post"){
			xhr.open('post',url);
			xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
			xhr.send(params)
		}
		//响应
		xhr.onreadystatechange = function(){
			if(xhr.readyState==4){
				if(xhr.status==200){					
					success(xhr.response);
				}else{
					if(error){
						error();
					}
				}
			}
		}
	}
	//如果使用script标签请求(jsonp)数据
	//创建script标签
	var script = document.createElement('script');

	//设置该标签的src属性
	script.src =url+"?"+params+"&"+jsonp+"="+cb;								
	//定义一个函数,以备调用
	window[cb] = function(data){
		success(data);
		script.remove()
	}
	document.body.appendChild(script);
}
// ajax({
//     method:,
//     url:,
//     data:{},请求主体
//     success:function(res){}
//     error:function(res){}
//     dataType:'json/jsonp',是使用xhr请求json数据，还是用script请求jsonp数据
//     jsonp:如果使用script请求数据，传给后台的回调函数名是callback
//     cb:如果使用script标签请求数据，传给后台的回调函数名，默认是随机。
// })
