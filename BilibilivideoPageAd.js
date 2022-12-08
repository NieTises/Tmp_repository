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

(function () {
    "use strict";
    // 移除视频页侧边栏和直播广告
    window.onload = function () {
        // Timeout
        let i = 0;
        function 防超时() {
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
            防超时();
            rmAd();
        }, 10);

        //rmAd
        function rmAd() {
            var vcd = el(".vcd");
            var sideAd = el(".side_ad")
            if (!vcd) { return }
            try {
                console.log("vcd:", vcd);
                console.log("sideAd:", sideAd);
                vcd.remove();
                sideAd.remove();

                rmInterval();
            } catch (e) {
                console.log(`Error:${e.name}\t${e.message}`);
            }
        }

        // Live
        function rmLive() {
            let live = el("#live_recommand_report")
            if (live) {
                console.log(live.outerHTML.replace(/<[^>]*>/g, '') + live);
                live.remove()
                rmListener();
                return
            } console.log("No Live");
        }

        // right-bottom-banner
        function rmBanner() {
            let banner = el("#right-bottom-banner")
            if (banner) {
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
    };
})