define(["jquery"], function ($) {
	class Footer {
		constructor () {
			this.init().then(() => {
              
			})
		
		}
		init(){
		   		return new Promise((resolve,rejects)=>{
					   // 加载HTML
                    $("#footer").load("/html/module/footer.html",()=>{
				     // 结束后执行的回调
                      resolve();
					})
				})
		}
	}

	return new Footer();
})