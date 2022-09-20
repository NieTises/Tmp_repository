// ==UserScript==
// @name         weibo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Nietises
// @match        https://weibo.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=weibo.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.onload = function(){
        // 开关,如果不想启用的把ture改成false
        var isHot = true    // 屏蔽热门推荐
        var isBlock = true  // 启用拉黑功能


        // top广告
        var f_top = setInterval(function(){
            if(document.getElementsByClassName("woo-box-flex woo-box-alignCenter woo-box-justifyCenter TipsAd_wrap_3QB_0 TipsAd_bottomGap_1P4hW")[0] != undefined){
                document.getElementsByClassName("woo-box-flex woo-box-alignCenter woo-box-justifyCenter TipsAd_wrap_3QB_0 TipsAd_bottomGap_1P4hW")[0].remove()
                clearInterval(f_top);f_top=null
            }
            clearInterval(f_top);f_top=null
        },10)


        // 移除信息流广告
        function ClearAD(){
            if(isHot){
                if(document.getElementsByClassName('wbpro-auth-tag head-info_authtag_29zK2').length !== 0 ){ //热推
                    var target = document.getElementsByClassName('wbpro-auth-tag head-info_authtag_29zK2')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
                    console.log("热推");
                    console.log(target);
                    // block() // 热推偶尔会出现正在关注的博主,防止误伤,不启用屏蔽功能
                    target.remove()
                }
            }
            if(isBlock){
                if(document.getElementsByClassName('head-info_authtag_29zK2').length !== 0 ){ //广告
                    var target2 = document.getElementsByClassName('head-info_authtag_29zK2')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
                    console.log("AD");
                    console.log(target2);
                    block() // 大部分广告低俗弱智,意义不明且反复出现,故屏蔽之
                    target2.remove()
                }
            }
            return
        }


        // 扩展(屏蔽功能)
        // 来自：https://github.com/overtrue/weibo-dogs-killer
        function block(){
            if(isBlock){
                var uid = document.getElementsByClassName("head-info_authtag_29zK2")[0].parentElement.parentElement.parentElement.parentElement.childNodes[0].href.replace("https://weibo.com/u/",'')
                var http = new XMLHttpRequest()
                var url = 'https://weibo.com/aj/filter/block?ajwvr=6'
                http.open('POST', url, true)
                http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
                http.send('uid='+uid+'&filter_type=1&status=1&interact=1&follow=1')
                http.onreadystatechange = function() {
                    if (http.readyState != 4 || http.status != 200) {
                        return;
                    }

                    var data = {
                        msg: '解析失败'
                    }
                    try {
                        data = JSON.parse(http.responseText)
                    } catch (err) {
                    }

                    if (data.code == 100000) {
                        console.log('[' + uid + '] => 成功:' + data.msg + ' - ' + http.status + ' - ' + http.responseText)
                    } else {
                        console.error('[' + uid + '] => 失败:' + data.msg + ' - ' + http.status + ' - ' + http.responseText)
                    }
                }
            }
        }


        // 启动定时器：移除信息流广告贴
        const f = setInterval(() => {
            ClearAD()
        }, 5000);



        // 浏览器失去焦点时清除定时器
        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {clearInterval(f);f=null}
            else {
                const f = setInterval(() => {
                    ClearAD()
                }, 5000);
            }
        });
    }
})();