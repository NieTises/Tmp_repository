// ==UserScript==
// @name         Bilibili
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Nietises
// @match        https://t.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    window.onload=function(){
        var timer = 0;
        var f = setInterval(function(){
            var i = document.querySelectorAll("section")
            if(i[6]){
                console.log(i[6]);
                i[6].remove()
                if(i.length == 5){
                    clearInterval(f)
                }
                return
            }
        },10)
        console.log((++timer)*10);
    }
})();
