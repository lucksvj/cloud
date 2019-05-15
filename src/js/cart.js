require(["require.config"], () => {
    require(["template", "header", "footer",], (template) => {
        class Cart {
            constructor() {
                this.init();
                this.shopid();
                this.cartNum();
                this.cartPrice();
                this.delet();
                this.dis();
                this.allche();
                this.addnum();
               
            }
            init() {
               let shopcart = JSON.parse(localStorage.getItem("cart"));
                // console.log(this.shopcart)
                this.renod(shopcart)
            }
            renod(list) {
                $("#mian-m").html(template("shop-sp", { list }));
               
            }
            dis(){
                if(this.shopcart){
                    $(".cart-n").css("display","block");
                    $(".cart-back").css("display","none")
                }else{
                    $(".cart-n").css("display","none");
                    $(".cart-back").css("display","block")
                }
            }
            shopid() {
                // 获取localstorage 的id
                this.a = [];
                let cart = JSON.parse(localStorage.getItem("cart"))
                if (cart) {
                    cart.forEach(element => {
                        console.log(element)
                        this.a.push(element.id);
                    });
                }
            }
            // 购物车加减
            addnum() {
                let _this = this;
                $("#mian-m").on("click", "a", function () {
                    let caoord = Number($(this).parents(".num").siblings(".title").find("a").attr("data-id"));
                    let shopId = _this.a;
                
                    this.shopNum = Number($(this).siblings(".shopNum").val());
                    console.log()
                    let cart = JSON.parse(localStorage.getItem("cart"))
                    if ($(this).attr("class") === "down") {
                        if (this.shopNum < 2) {
                            this.shopNum = 2;
                        }
                        this.shopNum--;
                        $(this).siblings(".shopNum").val(this.shopNum)
                        shopId.forEach((element, index) => {
                            console.log(element)
                            if (element.id == caoord.id) {
                                let scart = JSON.parse(localStorage.getItem("cart"));
                                scart.forEach(index => {
                                    console.log(index)
                                    index.num = this.shopNum;
                                })
                                localStorage.setItem("cart", JSON.stringify(scart))
                            }
                        })
                    } else if ($(this).attr("class") === "btn") {
                        this.shopNum++;
                        $(this).siblings(".shopNum").val(this.shopNum)

                        shopId.forEach((element, index) => {
                            console.log(element == caoord)
                            if (element == caoord) {
                                let scart = JSON.parse(localStorage.getItem("cart"));
                                 console.log(scart)
                                scart.forEach(index => {
                                    console.log(index)
                                    index.num = this.shopNum;
                                })
                             localStorage.setItem("cart", JSON.stringify(scart))
                            }
                        })
                    }
                    _this.cartNum();
                    _this.cartPrice();
                })
            }
            // 总数量
            cartNum() {
                let cart = JSON.parse(localStorage.getItem("cart"))
                let num = 0;
                if (cart) {
                    num = cart.reduce((n, shop) => {
                        n += shop.num;
                        return n;
                    }, 0);
                }

                $("#shoping").text(num);
            }
            //总价
            cartPrice() {
                let cart = JSON.parse(localStorage.getItem("cart"))
                let price = 0;
                if (cart) {
                    price = cart.reduce((n, shop) => {
                        n += shop.num * shop.price;
                        return n;
                    }, 0);
                }

                $("#shop-price").html(price);
            }

            delet(){
                this.list=$(".shop-list-a");
                console.log(this.list)
                let _this=this;
                $("#mian-m").on("click","div",function(){

                    if($(this).attr("class") === "delete"){
                        let listLI=$(this).parents(".shop-list-a");
                        listLI.remove();
                        var data=JSON.parse(localStorage.getItem("cart"));  
                        data.some((element,index)=>{
                              this.index=index;
                              return element.id=this.id
                          })
                          data.splice(this.index,1)//删除
                          //data从新插入到缓存
                          localStorage.setItem("cart",JSON.stringify(data));
                         if(localStorage.getItem("key")===null){
              
                        //   this.calcMoney();
                          $('#chebox')[0].checked=false;
                         }
                    }
                })
            }
           allche(){
               $(".checked").on("click",()=>{
                   //查找checked 的下标
                   let len=$(".checked").length;
                   //总的数
                   let lnum=0;
                   //遍历 判断状态
                 $(".checked").each((index,item)=>{
                     if(item.checked) lnum++;
                })
                var checked = len ===lnum? true:false;
                $('#checka')[0].checked = checked ;
               })
               $('#checka').on("click",()=>{
                // let len=$(".checked").length;
                $(".checked").each((index,item)=>{
                    item.checked=$('#checka')[0].checked ;
                })
                
               })
           }
        }
        new Cart();
    })
})