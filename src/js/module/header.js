define(["jquery"], function ($) {
	class Header {
		constructor() {
			this.init().then(() => {
				this.search();
				this.loning();
				this.cartNum();
			})
		}
		init() {
			return new Promise((resolve, reject) => {
				// 可以在加载路径后面写上空格加选择器，只加载一部分html
				$("#header-con").load("/html/module/header.html", () => {
					// 回调函数，指的是load加载结束以后执行的代码
					resolve();
				})
			})
		}
		// 搜索框
		search() {

			this.serchList = $(".srch_text");
			this.tat_lsit =$(".search_list")
			var _this = this
			this.serchList.on("keyup", function () {
				// 获取input的值
				let wroth = $(".srch_text").val();
				$.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd=" + wroth, res => {
					let list = res.s;
					let ul = $("<ul>")
					list.forEach(item => {
						//创建li 渲染 并添加到ul
						$("<li>").html(item).appendTo(ul);
					})
				    
					_this.tat_lsit.empty().show().append(ul);
				})

			})
			// this.serchList.on("blur", function () {
			// 	setInterval(() => {
			// 		_this.tat_lsit.hide();
			// 	}, 2000)

			// })
		}
		loning(){
			
			$(".longin_a").on("mouseenter",function(){
             $("#longin-list").css("display","block")
			})
			$(".longin_a").on("mouseleave",function(){
             $("#longin-list").css("display","none")
			})
			$("#longin-list").on("mouseenter",function(){
				$("#longin-list").css("display","block")
			   })
			$("#longin-list").on("mouseleave",function(){
			$("#longin-list").css("display","none")
			})
		}
		cartNum() {
			let cart = JSON.parse(localStorage.getItem("cart"))
			let num = 0;
			if (cart) {
				num = cart.reduce((n, shop) => {
					n += shop.num;
					return n;
				}, 0);
			}

			$(".shop_num").text(num);
		}
	}

	return new Header();
})