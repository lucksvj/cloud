define(["jquery"], function($) {
    class Side{
        constructor(){
            this.init().then(()=>{
                 this.addNum()
            })
        }
        init(){
            return new Promise((resolve, reject) => {
				// 可以在加载路径后面写上空格加选择器，只加载一部分html
				$("#side-l").load("/html/module/side.html", () => {
					// 回调函数，指的是load加载结束以后执行的代码
					resolve();
				})
			})
        }
        addNum(){
            let cart = JSON.parse(localStorage.getItem("cart"))
            let num=0;
            if(cart){
                num = cart.reduce((n, shop) => {
                    n += shop.num;
                    return n;
                  }, 0);
          
            }
            $("#add-sop-a").text(num);
          
        }
    }
   return new Side();
});