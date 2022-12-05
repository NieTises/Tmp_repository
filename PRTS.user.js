// ==UserScript==
// @name         PRTS
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://prts.wiki/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=prts.wiki
// @grant        none
// ==/UserScript==

(function () {

    function main() {
        try {
            var blocker = document.getElementById("sys_blocker") || document.getElementById("sys_blocker")[0]
            var fullscreen = document.getElementById("button_fullscreen") || document.getElementById("button_fullscreen")[0]
            var playback = document.getElementById("button_playback") || document.getElementById("button_playback")[0]
        } catch (err) {
            alert(err)
            console.log(err);
        }

        finally {
            window.onkeydown = function sys_keyEnter(e) {
                // console.log(e);
                if (e.keyCode == 13 || e.keyCode == 32) {
                    blocker.click()
                }
                else if (e.keyCode == 70) {
                    fullscreen.click()
                }
                else if (e.keyCode == 9) {
                    playback.click()
                }
            }
        }
    }

    window.onload = function () {
        main()
    }
})();