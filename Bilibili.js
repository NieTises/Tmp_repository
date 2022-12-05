// ==UserScript==
// @name         Hide Ad
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Nietises
// @match        https://t.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

// ==快速查找元素工具==================================================================
function el(e) {
    let a = document.querySelectorAll(e);
    if (a.length == 0) {
        return 0;
    }
    if (a.length == 1) {
        return a[0];
    } else {
        return a;
    }
}

window.onload = main();

function main() {
    var ms = 0;

    var timer = setInterval(() => {
        ms += 6;
        var ad = el(".bili-dyn-ads")
        var topic = el(".topic-panel").parentNode

        if (topic && ad) {
            console.log("time:" + ms);

            console.log("ad", ad);
            console.log("topic", topic);

            ad.remove()
            topic.remove()
            clearInterval(timer);
            timer = null;
        }

    }, 6)
}