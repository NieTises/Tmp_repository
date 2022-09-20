// ==UserScript==
// @name         Hide Ad
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://t.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==


// @version:    0.1
// (function() {
//     'use strict';
//     window.onload=function(){
//         window.onmousemove=function(){
//             var i = document.querySelectorAll("section")
//             if(i[6]){
//                 console.log(i[6]);
//                 console.log('remove');
//                 i[6].remove()
//             }else{
//                 window.onmousemove = null
//             }
//         }
//         var f = setInterval(function(){
//             var i = document.querySelectorAll("section")
//             if(i[6]){
//                 console.log(i[6]);
//                 i[6].remove()
//             }else{
//                 clearInterval(f)
//             }
//         },100)
//         setTimeout(() => {
//             document.querySelectorAll("section")[6].remove()
//             document.querySelectorAll("section")[6].remove()
//         }, 1000);
//     }
// })();


// @version:    0.2
// window.onload=function(){
//     var timer = 0;
//     var i = document.querySelectorAll("section")
//     const f = setInterval(() => {
//         if(!i[6]){
//             timer += 100;
//             console.log(timer);
//             return
//         }
//         setTimeout(() => {
//             console.log(i[6]);
//             document.querySelectorAll("section")[6].remove()
//             console.log(i[6]);
//             document.querySelectorAll("section")[6].remove()
//         }, 100);
//         clearInterval(f)
//     }, 100);
//     console.log(`Runtime: ${timer}`);
// }


// @version:    0.3
// 屏蔽网页版动态页话题板块
// (function() {
//     'use strict';
//     window.onload=function(){
//         var timer = setInterval(function(){
//             console.log('...');
//             var i = document.querySelectorAll("section")
//             if(i[6] != undefined){
//                 console.log(i[6]);
//                 i[6].remove()
//                 // if(i[6] == undefined){
//                 //     clearInterval(f)
//                 // }
//             }
//         },10)
//         clearInterval(timer)
//     }
// })();

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
            if(tmpArry[6]){
                tmpArry[6].remove();
            }
        }
    }
})();