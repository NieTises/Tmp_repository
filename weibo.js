// ==UserScript==
// @name         weibo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://weibo.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=weibo.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.onload = function(){
        // 发布模块
        var f_iss = setInterval(function(){
            if(document.getElementsByClassName("woo-panel-main woo-panel-top woo-panel-right woo-panel-bottom woo-panel-left Card_wrap_2ibWe Card_bottomGap_2Xjqi")){
                document.getElementsByClassName("woo-panel-main woo-panel-top woo-panel-right woo-panel-bottom woo-panel-left Card_wrap_2ibWe Card_bottomGap_2Xjqi")[0].remove()
                clearInterval(f_iss)
                return
            }
        },10)
        // top广告
        var f_top = setInterval(function(){
            if(document.getElementsByClassName("woo-box-flex woo-box-alignCenter woo-box-justifyCenter TipsAd_wrap_3QB_0 TipsAd_bottomGap_1P4hW")){
                document.getElementsByClassName("woo-box-flex woo-box-alignCenter woo-box-justifyCenter TipsAd_wrap_3QB_0 TipsAd_bottomGap_1P4hW")[0].remove()
                clearInterval(f_top)
                return
            }
        },10)

        // 启动定时器
        const f = setInterval(() => {
            // console.log("...");
            ClearAD()
        }, 5000);

        // 清除函数
        function ClearAD(){
            var ad = 0;
            if(document.getElementsByClassName('wbpro-auth-tag head-info_authtag_29zK2').length !== 0 ){
                console.log(document.getElementsByClassName('wbpro-auth-tag head-info_authtag_29zK2')[0]);
                document.getElementsByClassName('wbpro-auth-tag head-info_authtag_29zK2')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
                ad++
            }
            if(document.getElementsByClassName('head-info_authtag_29zK2').length !== 0 ){
                console.log(document.getElementsByClassName('head-info_authtag_29zK2')[0]);
                document.getElementsByClassName('head-info_authtag_29zK2')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
                ad++
            }
            return
        }

        // 焦点
        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {clearInterval(f)}
            else {
                const f = setInterval(() => {
                    console.log("...");
                    ClearAD()
                }, 5000);
            }
        });
    }
})();