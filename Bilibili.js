// ==UserScript==
// @name         Hide Ad
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Nietises
// @match        https://t.bilibili.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.onload=function(){
        var tmpArry = null;
        var ms = 0; // 定时器用时
        var timer = setInterval(()=>{
            ms+=10;
            tmpArry = document.querySelectorAll("section")
            if(tmpArry.length>6){
                console.log("定时器用时:"+ms);
                rm();
                clearInterval(timer);
            }
        },10)

        function rm(){
            tmpArry[6].remove();
            delete tmpArry[6];tmpArry[6]=null
            if(tmpArry[6] != undefined){
                tmpArry[6].remove();
            }
        }
    }
})();