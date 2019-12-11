//直接打开就有购物车
//先根据localstorage取得数据渲染
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
window.onload = function(){
(function(){
	var products = [
		{
			pic:"../images/cart1.jpg",
			des:"青蛙王子儿童面霜宝宝霜秋冬季滋润补水保湿润肤乳牛奶小孩擦脸油",
			info: "面霜加唇膏",
			price:43.90,
			id:1
		},
		{
			pic:"../images/cart2.jpg",
			des:"青蛙王子儿童专用润唇膏男女孩保湿补水宝宝滋养防干裂婴儿护唇膏",
			info: "颜色分类：草莓+苹果香味：草莓味",
			price:16.80,
			id:2
		},
		
		{
			pic:"../images/cart3.jpg",
			des:"阿迪达斯官网 adidas neo HOOPS VL W 女子休闲运动鞋CG7146",
			info: "颜色分类：白色/一号黑/白色鞋码：36",
			price:499.00,
			id:3
		},
	];
	//每次往container里面添加一个ul
	class ShoppingCart{
		constructor(coontainerId,products){
			//商品列表，购物车列表
			this.container = document.getElementById('container');
			this.shopList = document.createElement('div');
			this.shopList.className= "good-info";
			this.cartList = document.createElement('div');
			//购物车里面商品初始化
			this.cartProducts = this.getStorage()||[];
			this.products = products;//共享products
			this.container.appendChild(this.shopList);
			this.container.appendChild(this.shopList);
		}
		setStorage(json){
			localStorage.setItem('cart',JSON.stringify(json));
		}
		getStorage(){
			return JSON.parse(localStorage.getItem('cart'))||[];
		}
		init(){
			console.log(1);
			this.initShopList();//初始化商品列表
			if(this.getStorage().length>0){
				//如果本地存储有数据，就调用一次渲染购物车函数
				this.renderCartList();
			}
			console.log(1);
		}
		//初始化的商品列表方法
		initShopList(){
			//products有显示几个ul
			var str = '';
			this.products.forEach((value)=>{
				str+='<ul class="item-content clearfix">';
				str+=`
				<li class="td td-chk">
                	<input type="checkbox">
           		</li>
				<li class="td td-item">
					<div class="item-pic">
						<a href="#"><img src="${value.pic}" alt=""></a>
					</div>
					<div class="item-info">
						<div class="item-basic-info">
							<a href="#">${value.des}</a>
						</div>
						<div class="item-other-info"></div>
					</div>
				</li>
				<li class="td td-info">
					<p>${value.info}</p>
				</li>
				<li class="td td-price">￥${value.price}</li>
				<li class="td td-amout">
					<a href="#" class="add">+</a>  
						1
					<a href="#" class="sub">-</a></li>
				<li class="td td-sum">￥34.90 </li>
				<li class="td td-op">
					<a href="#" class="delete">删除</a>
				</li>
				`
				str+='</ul>';
				
			});
			this.shopList.innerHTML = str;
			console.log(this.shopList);
			this.addCartListEvent();//给购物车添加按钮事件
		}
		//添加购物车事件
		addCartListEvent(){
			var that = this;
			var outerDiv = this.container.querySelector('.good-info');
			var addCartBtnArr = outerDiv.querySelectorAll('[type=checkbox]');
			addCartBtnArr.forEach((addCartBtn)=>{
				addCartBtn.onclick = function(){
					var ul = this.parentNode.parentNode;//当前被点击的ul
					// that.addToCartProducts(currentProduct);
					// that.renderCartList();

					// var currentProduct = {
					// 	pic:ul.children[2].children[0].children[0].children[0].getAttribute('src'),
					// 	price:ul.children[3].innerHTML,
					// 	num:ul.children[4].children[0].nextElementSibling.innerHTML,
					// 	amout:ul.children[5].innerHTML
					// };
					var m = ul.children[2].children[0].children[0].children[0].getAttribute('src');
					console.log(m);
				}
			})
		}
		//加入购物车，本地存储
		//渲染购物车列表
		//商品列表的删除添加
	}
	var car = new ShoppingCart("container",products);
	car.init();
})();
}
