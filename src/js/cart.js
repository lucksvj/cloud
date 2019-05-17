require(["require.config"], () => {
    require(["template", "header", "footer",], (template) => {
        class Cart {
            constructor() {
                this.init();
                // this.cartNum();
                this.cartPrice();
                this.delet();

                this.allche();
                this.addnum();
            }
            init() {
                this.shopcart = JSON.parse(localStorage.getItem("cart"));
                console.log()
                this.renod(this.shopcart)
                if ( this.shopcart.length != 0 && this.shopcart != []) {

                    $(".cart-n").css("display", "block");
                    $(".cart-back").css("display", "none")

                } else {

                    $(".cart-n").css("display", "none");
                    $(".cart-back").css("display", "block")
                }
              //  $("#shop-price").html(price);
            }
            renod(list) {
                $("#mian-m").html(template("shop-sp", { list }));

                this.dis();
            }
            // 判断购物车是否显示
            dis() {
                console.log()

            }

            // 购物车加减
            addnum() {
                let _this = this;
                $("#mian-m").on("click", "a", function () {
                    // 获取到当前点击的id
                    let caoord = Number($(this).parents(".num").siblings(".title").find("a").attr("data-id"));
                    //获取到小计
                    let price = $(this).parents(".num").siblings(".z-price");
                    //获取到当前的数量
                    this.shopNum = $(this).siblings(".tot").find(".shopNum").val();
                    //获取localStorage的数据
                    let cart = JSON.parse(localStorage.getItem("cart"))
                    //判断当前的点击的class 是否是减
                    if ($(this).attr("class") === "down") {
                        //数量减
                        this.shopNum--;
                        //用来接收cart下的下标
                        let index = -1;
                        // 用some 判断cart的id与当前id是否相等;
                        //相等则返回true 
                        if (cart.some(function (item, i) {
                            index = i;
                            return item.id == caoord
                        })) {
                            //相同下标的的数量减；
                            cart[index].num--;
                            //判断数量是否小于1 小于1的话 则等于1
                            cart[index].num = cart[index].num < 1 ? 1 : cart[index].num
                        }
                        //渲染到页面上
                        $(this).siblings(".tot").find(".shopNum").val(cart[index].num)
                        //进行转换
                        localStorage.setItem("cart", JSON.stringify(cart))
                            // _this.cartNum();
                            // _this.cartPrice();
                        _this.Subtotal(caoord, price, cart)
                    } else if ($(this).attr("class") === "btn") {
                        this.shopNum++;
                        $(this).siblings(".tot").find(".shopNum").val(this.shopNum)

                        let index = -1;
                        // 获取到购物车
                        let scart = JSON.parse(localStorage.getItem("cart"));

                        if (scart.some(function (item, i) {
                            // index等于i  把i的值赋给index
                            console.log(i)
                            index = i;
                            // 把相等的id 返回出去；
                            return item.id == caoord
                        })) {
                            // 判断等于true 的话相同下标的数量加
                            scart[index].num++
                        }
                        localStorage.setItem("cart", JSON.stringify(scart))
                        // _this.cartNum();
                        // _this.cartPrice();
                        _this.Subtotal(caoord, price, scart)
                    }

                })
            }
            // 总数量
            // cartNum() {
            //     let cart = JSON.parse(localStorage.getItem("cart"))
            //     let num = 0;
            //     if (cart) {
            //         num = cart.reduce((n, shop) => {
            //             n += shop.num;
            //             return n;
            //         }, 0);
            //     }

            //     $("#shoping").text(num);
            // }
            //总价
            cartPrice() {
                console.log(1)
                let cart = JSON.parse(localStorage.getItem("cart"))
                let price = 0;
                $(".checked").each(function(item,index){
                    
                  if (index.checked){
                    price+=Number( $(index).parents(".shop-list-a").find(".z-price").html());
                   
                  }
                })
                $("#shop-price").html(price)
               
             
            }
            //  删除
            delet() {
                this.list = $(".shop-list-a");
                let _this = this;
                $("#mian-m").on("click", "div", function () {
                    if ($(this).attr("class") === "delete") {
                        let listLI = $(this).parents(".shop-list-a");
                        listLI.remove();
                        var data = JSON.parse(localStorage.getItem("cart"));
                        data.some((element, index) => {
                            this.index = index;
                            return element.id = this.id
                        })
                        data.splice(this.index, 1)//删除
                        //data从新插入到缓存
                        localStorage.setItem("cart", JSON.stringify(data));
                        // if (localStorage.getItem("key") === null) {
                        //     $('#chebox')[0].checked = false;
                        // }
                    }
                    // _this.cartNum();
                    _this.cartPrice();
                })
            }
            // 单选
            allche() {
                let _this=this
                $(".checked").on("click", () => {
                    //查找checked 的下标
                    let len = $(".checked").length;
                    //创建一空容器
                    let lnum = 0;
                    //遍历判断状态
                    $(".checked").each((index, item) => {
                        if (item.checked) lnum++;
                    })
                    
                    var checked = len === lnum ? true : false;
                    $('#checka')[0].checked = checked;
                    $("#shoping").html(lnum);
                    _this.cartPrice()
                     
                })
                //全选
                $('#checka').on("click", () => {
                    // let len=$(".checked").length;
                    $(".checked").each((index, item) => {
                        item.checked = $('#checka')[0].checked;
                    })
               

                })
            }
            // 计算小计
            Subtotal(id, price, cart) {

                let index;
                if (cart.some(function (item, i) {
                    index = i;
                    return item.id == id;
                })) {
                    console.log(1)
                    cart[index].num * cart[index].price;
                    price.html(cart[index].num * cart[index].price)
                    console.log(price)
                }
            }
            //选中事件
            selection(){
                 
            }
        }
        new Cart();
    })
})