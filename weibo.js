// ==UserScript==
// @name         weibo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Nietises
// @match        https://weibo.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=weibo.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  window.onload = main();
})();

function main() {
  var isHot = true; // 屏蔽热门推荐
  var isBlock = false; // 启用屏蔽用户功能  |  这个好像不管用，屏蔽了还是会出现
  var doublekiller = false; //
  var slt = 2; // 模拟关闭广告时的选项 ==>[0]不感兴趣   [1]投诉     [2]屏蔽此博主   [3]为何看到此广告?

  function info() {
    if (isHot) {
      console.log("开启热推屏蔽");
    }
    if (isBlock) {
      console.log("开启屏蔽用户");
    }
    if (doublekiller) {
      console.log("double killer open");
    }
  }
  info();

  // ==快速查找元素工具==================================================================
  function el(e, log) {
    let a = document.querySelectorAll(e);
    if (a.length == 0) {
      if (!log) {
        console.log("No target" + e);
      }
      return 0;
    } else if (a.length == 1) {
      if (!log) {
        console.log(a[0]);
      }
      return a[0];
    } else {
      if (!log) {
        console.log(a);
      }
      return a;
    }
  }

  // top广告
  function closeTipsAd() {
    var TipsAd = ".TipsAd_text_6NjMH"; // 头条广告
    let i = 0;
    var f_top = setInterval(() => {
      i++;
      if (i >= 40) {
        console.log("tipsAd timout");
        clearInterval(f_top);
      }

      var tipsAd = el(TipsAd);
      if (tipsAd) {
        console.log("TipsAD");
        tipsAd.click(); // 点击关闭按钮
        clearInterval(f_top);
        return;
      }
    }, 30);
  }

  // 移除信息流广告
  function ClearAD() {
    if (isHot) {
      if (
        document.getElementsByClassName(
          "wbpro-auth-tag head-info_authtag_29zK2"
        ).length !== 0
      ) {
        // 热推(粉丝头条也是这)
        var target = document.getElementsByClassName(
          "wbpro-auth-tag head-info_authtag_29zK2"
        )[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
          .parentNode.parentNode;
        var id = document
          .getElementsByClassName("wbpro-auth-tag head-info_authtag_29zK2")[0]
          .parentElement.parentElement.parentElement.parentElement.childNodes[0].href.replace(
            "https://weibo.com/u/",
            ""
          );
        console.log(
          "热推 uid:" + id + "\t" + target.outerHTML.replace(/<[^>]*>/g, "")
        );
        SimulationClose(target); // 较优方法,模拟用户关闭动作
        //target.remove() // 该方法会使页面出现大片空白
      }
    }

    if (
      document.getElementsByClassName("head-info_authtag_29zK2").length !== 0
    ) {
      // 广告
      var target2 = document.getElementsByClassName(
        "head-info_authtag_29zK2"
      )[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        .parentNode.parentNode;
      var id2 = document
        .getElementsByClassName("head-info_authtag_29zK2")[0]
        .parentElement.parentElement.parentElement.parentElement.childNodes[0].href.replace(
          "https://weibo.com/u/",
          ""
        );
      console.log(
        "广告 uid:" + id2 + "\t" + target2.outerHTML.replace(/<[^>]*>/g, "")
      );
      if (isBlock) {
        autoBlock(); // 大部分账号低俗弱智,意义不明且反复出现,屏蔽之
      }
      SimulationClose(); // 较优方法,模拟用户关闭动作
      //target2.remove() // 该方法会使页面会存在大片空白
    }
  }

  // 根据元素类型(热推|广告)决定关闭广告动作
  function SimulationClose() {
    if (
      document.getElementsByClassName(
        "woo-font woo-font--cross morepop_action_bk3Fq morepop_cross_1Q1PF"
      )[0] != undefined
    ) {
      document
        .getElementsByClassName(
          "woo-font woo-font--cross morepop_action_bk3Fq morepop_cross_1Q1PF"
        )[0]
        .click();
      var label =
        document.getElementsByClassName("woo-pop-wrap-main")[0].children;
      setTimeout(() => {
        if (label.length == 3) {
          console.log("粉丝头条");
          // setTimeout(() => {
          //     document.getElementsByClassName("woo-box-flex woo-box-alignCenter woo-pop-item-main")[1].click();
          // }, 20);
        } else {
          console.log("广告");
          setTimeout(() => {
            document
              .getElementsByClassName(
                "woo-box-flex woo-box-alignCenter woo-pop-item-main"
              )
              [slt].click();
          }, 20);
        }
      }, 20);
    }
  }

  // 开启定时器
  window.timer = 0;
  const f = setInterval(() => {
    window.timer++;
    ClearAD();
  }, 5000);

  // 扩展(屏蔽用户功能)
  // 来自：https://github.com/overtrue/weibo-dogs-killer
  function Block(uid) {
    if (uid == undefined) {
      uid = document
        .getElementsByClassName("head-info_authtag_29zK2")[0]
        .parentElement.parentElement.parentElement.parentElement.childNodes[0].href.replace(
          "https://weibo.com/u/",
          ""
        );
    }
    var http = new XMLHttpRequest();
    var url = "https://weibo.com/aj/filter/block?ajwvr=6";
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("uid=" + uid + "&filter_type=1&status=1&interact=1&follow=1");
    http.onreadystatechange = function () {
      if (http.readyState != 4 || http.status != 200) {
        return;
      }

      var data = {
        msg: "解析失败",
      };
      try {
        data = JSON.parse(http.responseText);
      } catch (err) {}

      if (data.code == 100000) {
        console.log(
          "[" +
            uid +
            "] => 成功:" +
            data.msg +
            " - " +
            http.status +
            " - " +
            http.responseText
        );
      } else {
        console.error(
          "[" +
            uid +
            "] => 失败:" +
            data.msg +
            " - " +
            http.status +
            " - " +
            http.responseText
        );
      }
    };
  }
  window.Block = Block; // window.block(uid)

  // 浏览器失去焦点时清除定时器
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      clearInterval(f);
      f = null;
    } else {
      const f = setInterval(() => {
        ClearAD();
      }, 5000);
    }
  });
}
