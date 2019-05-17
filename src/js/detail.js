

require(["require.config"], () => {
    require(["jquery", "url", "template","side", "header","zoom", "footer","fly"], function ($, url, template,side,header) {
        class Details {
            constructor() {
                this.render().then(() => {
                    this.zoom();
                    this.addCart();
                    this.addshop();
                })
            }
            render() {
                return new Promise((resolve, reject) => {
                    //  console.log(data)
                    var id = location.search.slice(4);
                    $.ajax({
                        url: url.baseUrl + "detail?id=" + id,
                        method: "GET",
                        dataType: "json",
                        success: res => {
                            console.log(res)
                          
                            if (res.res_conde === 1) {
                                this.detail = res.res_body.data.detail;
                                //由于rap2返回的ID都一样，所以手动的修改ID，真实开发中不用这行
                                this.detail.id = id;
                                this.data=res.res_body.data;
                                // this.render(res.res_body.data);
                            }
                            var html = template("page", { ...res.res_body.data.detail });
                            $("#big-picture").html(html);
                            // this. addCart();
                            resolve()
                        }

                    })
                })
            }
            //    放大镜
            zoom() {
                $(".zoom-img").elevateZoom({
                    gallery: 'gal1',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize: '1',
                    borderColor: '#888'
                });
            }
            // 添加数量
            addshop() {
                
                this.shopnum = Number($("#shop-num").val());
                console.log(  this.shopnum)
               let _this = this;
                
                $(".count").on("click", "a", function () {
                 
                    if ($(this).attr("id") === "pusl") {
                        let Num = ++_this.shopnum;
                        console.log( Num)
                        $("#shop-num").val(Num);
                    }else if($(this).attr("id")==="reduce"){
                         
                         if(_this.shopnum <2){
                            _this.shopnum=2;
                         } 
                         _this.shopnum--;
                        $("#shop-num").val(_this.shopnum);
                         
                      }

                })
            }
            // 添加购物车
            addCart() {
                let _this=this;
                let shopNum = Number($("#shop-num").val());
                console.log(shopNum)
                $(".addcart").on("click", (e) => {
                    
                    $(`<img src='${_this.data.detail.bigimg[0]}' style='width:30px;height:30px'>`).fly({
                        start: {
                          left: e.clientX,
                          top: e.clientY
                        },
                        end: {
                          left: $("#shop-item").offset().left,
                          top: $("#shop-item").offset().top - $(window).scrollTop()
                          // left: 1300,
                          // top: 300
                        },
                        onEnd: function () {
                          this.destroy(); //销毁抛物体
                        //   articl.calcCartNum(); // 调用一次计算购物车数量的方法
                        }
                      })  
                    
        
                    let shopNum = Number($("#shop-num").val());
                    console.log(shopNum)

                    let cart = localStorage.getItem("cart");

                    if (cart) {
                       
                        //购物车已有数据
                        cart = JSON.parse(cart);

                        let index;
                        //判断购物车是否已有数据
                        if (cart.some((last, i) => {
                            index = i;
                            return last.id == this.detail.id;
                        })) {
                            // 索引为index的这条数据就是当前数据
                            console.log( cart[index].num)
                            cart[index].num = cart[index].num + shopNum;
                           


                        } else {
                            cart.push({ ...this.detail, num: shopNum })
                        }

                        localStorage.setItem("cart", JSON.stringify(cart))
                    } else {
                        cart = [{ ...this.detail, num: shopNum }]
                    }
                    localStorage.setItem("cart", JSON.stringify(cart))
                    side.addNum();
                    header.cartNum();
                })

            }

        }
        new Details();
    })
})