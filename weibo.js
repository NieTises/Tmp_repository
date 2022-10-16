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
        var isHot = true; // 屏蔽热门推荐
        var isBlock = true; // 启用屏蔽用户功能  |  这个好像不管用，屏蔽了还是会出现
        var doublekiller = false // 


        function info(){
            if(isHot){console.log("开启热推屏蔽");}
            if(isBlock){console.log("开启屏蔽用户");}
            if(doublekiller){console.log("double killer open");}
        }
        info();


        // top广告
        var f_top = setInterval(function(){
            if(document.getElementsByClassName("woo-box-flex woo-box-alignCenter woo-box-justifyCenter TipsAd_wrap_3QB_0 TipsAd_bottomGap_1P4hW")[0] != undefined){
                console.log(document.getElementsByClassName("woo-box-flex woo-box-alignCenter woo-box-justifyCenter TipsAd_wrap_3QB_0 TipsAd_bottomGap_1P4hW")[0]);
                document.getElementsByClassName("woo-box-flex woo-box-alignCenter woo-box-justifyCenter TipsAd_wrap_3QB_0 TipsAd_bottomGap_1P4hW")[0].remove()
                clearInterval(f_top);f_top=null
            }
            clearInterval(f_top);f_top=null
        },40)


        // 移除信息流广告
        function ClearAD(){
            if(isHot){
                if(document.getElementsByClassName('wbpro-auth-tag head-info_authtag_29zK2').length !== 0 ){ //热推
                    var target = document.getElementsByClassName('wbpro-auth-tag head-info_authtag_29zK2')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
                    var tmp = document.getElementsByClassName('wbpro-auth-tag head-info_authtag_29zK2')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
                    if(target === tmp){doublekiller = true;console.log("double killer open")}
                    var id = document.getElementsByClassName("wbpro-auth-tag head-info_authtag_29zK2")[0].parentElement.parentElement.parentElement.parentElement.childNodes[0].href.replace("https://weibo.com/u/",'');
                    console.log("热推 uid:"+id+"\t"+target.outerHTML.replace(/<[^>]*>/g, ''));
                    // autoBlock() // 热推偶尔会出现正在关注的博主,防止误伤,不启用屏蔽功能
                    SimulationClose(); // 较优方法,模拟用户关闭动作
                    target.remove() // 该方法会使页面出现大片空白
                }
            }


            if(document.getElementsByClassName('head-info_authtag_29zK2').length !== 0 ){ //广告
                var target2 = document.getElementsByClassName('head-info_authtag_29zK2')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
                var tmp2 = document.getElementsByClassName('head-info_authtag_29zK2')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
                if(target2 === tmp2){doublekiller = true;console.log("double killer open")}
                var id2 = document.getElementsByClassName("head-info_authtag_29zK2")[0].parentElement.parentElement.parentElement.parentElement.childNodes[0].href.replace("https://weibo.com/u/",'');
                console.log("广告 uid:"+id2+"\t"+target2.outerHTML.replace(/<[^>]*>/g, ''));
                if(isBlock){
                    autoBlock() // 大部分账号低俗弱智,意义不明且反复出现,故屏蔽之
                }
                SimulationClose(); // 较优方法,模拟用户关闭动作
                target2.remove() // 该方法会使页面会存在大片空白
            }
            return
        }


        // 扩展(屏蔽用户功能)
        // 来自：https://github.com/overtrue/weibo-dogs-killer
        function autoBlock(uid){
            if(uid == undefined){
                uid = document.getElementsByClassName("head-info_authtag_29zK2")[0].parentElement.parentElement.parentElement.parentElement.childNodes[0].href.replace("https://weibo.com/u/",'');
            }
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


        // 模拟关闭广告动作
        function SimulationClose(){
            if(document.getElementsByClassName("woo-font woo-font--cross morepop_action_bk3Fq morepop_cross_1Q1PF")[0] != undefined){
                document.getElementsByClassName("woo-font woo-font--cross morepop_action_bk3Fq morepop_cross_1Q1PF")[0].click();
                setTimeout(() => {
                    // 模拟点击关闭广告的理由,默认为[2].     [0]不感兴趣   [1]投诉     [2]屏蔽此博主   [3]为何看到此广告?
                    document.getElementsByClassName("woo-box-flex woo-box-alignCenter woo-pop-item-main")[2].click();
                }, 20);
            }
        }


        // 开启定时器
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