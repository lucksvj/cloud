require(["require.config"], function () {
    require(["jquery", "swiper"], function ($, swiper) {
        class Wheel {
            constructor() {
                this.paint();
            }
            paint() {
                new swiper('.swiper-container', {
                    autoplay: 5000,
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
                })
                this.logon();
            }
            //   注册事件
            logon() {
                this.resiser = $(".get_zc")
                this.agree = $(".agree")
                this.agbox = $(".agbox")
                this.agreement = $(".agreement")
                let _this = this;
                this.resiser.on("click", () => {
                    if (_this.agbox.css("display") === "block") {
                        console.log(2)

                    }
                })

                //选中事件
                this.agreement.on("click", "span", function () {

                    if ($(this).css("display") === "block") {
                        if ($(this).attr("id") === "agrea") {
                            $(this).css("display", "none")
                            _this.agbox.css("display", "block");
                            console.log($(this))
                        } else if (_this.agbox.css("display") === "block") {
                            if ($(this).attr("id") === "agbos") {
                                $(this).css("display", "none")
                                _this.agree.css("display", "block");
                            }
                        }

                    }
                })

            }
        }
        new Wheel();
    })
})