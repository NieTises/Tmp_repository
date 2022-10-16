// ==UserScript==
// @name         videoPageAd
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.bilibili.com/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function () {
    "use strict";
    window.onload = function () {
        // Timeout
        let i = 0;
        function check() {
            i++;
            if (i > 25) {
                console.log("No Ad");
                rmInterval();
            }
        }
        function rmInterval() {
            console.log('clearInterval(f)'); clearInterval(f);
        }

        // Ad
        const f = setInterval(() => {
            check();
            rmAd();
        }, 10);

        //rmAd
        function rmAd() {
            var vcd = document.getElementsByClassName("vcd")[0];
            if (vcd == null || vcd == undefined) { return }
            try {
                console.log("vcd:", vcd);
                vcd.remove();
                rmInterval();
            } catch (e) {
                console.log(`Error:${e.name}\t${e.message}`);
            }
        }

        // Live
        function rmLive() {
            let live = document.getElementById("live_recommand_report")
            if (live != null || live != undefined) {
                console.log(live.outerHTML.replace(/<[^>]*>/g, '') + live);
                live.remove()
                rmListener();
                return
            } console.log("No Live");
        }

        // right-bottom-banner
        function rmBanner() {
            let banner = document.getElementById("right-bottom-banner")
            if (banner != null || banner != undefined) {
                console.log(banner.outerHTML.replace(/<[^>]*>/g, '') + banner);
                banner.remove()
                rmListener();
                return
            } console.log("No Banner");
        }

        // Scrool
        function scroll() {
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if (t !== 0) {
                rmListener();
            }
            rmLive();
            rmBanner();
        }

        // rmScrollListener
        function rmListener() {
            // window.removeEventListener("scroll")
            window.onscroll = null
        }

        // ScrollListener
        // window.addEventListener("scroll", scroll)
        window.onscroll = function () {
            scroll();
        }

        // rec-list
        // setTimeout(() => {
        //     var rec = document.getElementsByClassName("rec-list")[0].childNodes
        //     if(rec.length >= 10){
        //         if (rec[0].className = "video-page-special-card-small") {
        //             rec[0].remove();
        //         }
        //     }
        // }, 5000);

        // This code for to fix a bug, but I'm so mad that don't know how to resolve
        // setTimeout(() => {
        //     document.getElementsByClassName("vcd")[0].remove()
        // }, 100);
        // setTimeout(() => {
        //     document.getElementsByClassName("vcd")[0].remove()
        // }, 200);
        // setTimeout(() => {
        //     document.getElementsByClassName("vcd")[0].remove()
        // }, 300);
        // setTimeout(() => {
        //     document.getElementsByClassName("vcd")[0].remove()
        // }, 400);
        // setTimeout(() => {
        //     document.getElementsByClassName("vcd")[0].remove()
        // }, 500);
    };

})();