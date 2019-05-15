require(["require.config"], function () {
	require(["jquery", "header", "swiper","url","template","footer","side"], function ($, header, swiper,url,template) {
		class Index {
			constructor() {
				this.swiper();
				this.shopList()
			}

			swiper() {
				new swiper('.swiper-container', {
					direction: 'horizontal', // 垂直切换选项
					loop: true, // 循环模式选项

					// 如果需要分页器
					pagination: {
						el: '.swiper-pagination',
					},

					// 如果需要前进后退按钮
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					autoplay: {
						delay: 2000,//1秒切换一次
					},

					effect: 'fade',
					fade: {
						crossFade: false,
					}
					// 如果需要滚动条
					/*	scrollbar: {
						  el: '.swiper-scrollbar',
						},*/
				})
			}
		shopList(){
			//   请求商品数据
            $.ajax({
				//请求地址
				url: url.baseUrl + "/list/get",
				//请求方式
				method:"GET",
				//请求格式
				dataType:"json",
				//回调
				success: function(res){
					console.log(res)
						if(res.res_code === 1){
						let list= res.res_body.data.list;
						//获取到的数据通过template模板赋值
					    let Tat=template("sell-shop",{list})
						$("#well").html(Tat);
					}
				}
			})
		}
		}
		new Index();
	})
})