require.config({
    baseUrl: "/",
    paths: {
        "jquery": "lib/jquery/jquery-3.2.1",
        "header": "js/module/header",
        "swiper": "lib/swiper/js/swiper",
        "url": "js/url",
        "template":"lib/art-template/template-web",
        "footer":"js/module/footer",
        "zoom":"lib/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        "side":"js/module/side",
        "fly":"lib/jquery-plugins/jquery.fly",
        "cookie":"lib/jquery-plugins/jquery.cookie"
    },
   shim :{
       zoom:{
          deps :["jquery"] 
       },
       fly:{
           deps :["jquery"]
       },
       cookie:{
           deps: ["jquery"]
       }
   }

})
