/**
 * @file  vue-webp 指令 方便使用webp格式
 * @author webaifei
 * @date 2018年 7月23日 星期一
 * @use
 * 1. src方式使用远程图片
 * <img v-webp="https://h5.u51.com/99fenqi/vue//static/home_top_bg.png"/>
 * 2. src方式使用本地图片
 * <img v-webp="static/home_top_bg.png"/>
 * 3. background-image方式使用
 * <img v-webp:bg="static/home_top_bg.png"/>
 * @TIPS
 *  1. base64格式的图片资源自动忽略webp
 */
/* eslint-disable */
(function() {
  const canUseWebp = (function() {
    const elem = document.createElement("canvas");
    if (!!(elem.getContext && elem.getContext("2d"))) {
      return elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
    } else {
      return false;
    }
  })();
  const mimeTypes = ['.jpg', '.jpeg', '.png'];

  // 核心逻辑
  function update(el, binding) {
    // 支持 src 和 background
    var attr = binding.arg || "src",
      // 图片的地址 格式 base64格式 or 连接
      value = binding.value;
    // base64
    if (value.indexOf("data:image") > -1) {
      setImg(el, attr, value);
    } else {
      setImg(el, attr, value, true);
    }
  }

  /**
   *
   * @param {DOM} el 修改的dom元素
   * @param {Stirng} attr 通过何种方式显示 支持 src 和 background-image
   * @param {String} originUrl 图片的地址  支持base64 和 图片地址
   * @param {Boolean} replace 是否尝试使用webp格式
   */
  function setImg(el, attr, originUrl, replace) {
    let webpUrl = originUrl;
    if (replace && canUseWebp) {
      const extReg = /\.\w{3,}$/ig;
      webpUrl = originUrl.replace(extReg,  ".webp");
      onErrorLoadWebp(el, attr, webpUrl, originUrl);
    }
    if (attr === "bg") {
      el.style.backgroundImage = "url(" + webpUrl + ")";
    } else {
      el.setAttribute(attr, webpUrl);
    }
  }
  // 加载webp格式图片出错 使用原格式再次尝试
  function onErrorLoadWebp(el, attr, webpUrl, originUrl) {
    let img = new Image();
    img.src = webpUrl;
    img.onerror = function() {
      setImg(el, attr, originUrl);
      img = null;
    };
  }
  /*
  * 获取文件后缀
  */
  function getExtname(url) {
    
    const _extname = extReg.exec(url);
  }

  // 指令
  var vueWebp = {
    install: function(Vue) {
      Vue.directive("webp", {
        // 被绑定元素插入到父元素中（但是不定被插入到文档中）
        inserted: function(el, binding) {
          update(el, binding);
        },
        // 指令所在组件和其子Vnode全部更新之后
        componentUpdated: function(el, binding) {
          if (binding.value !== binding.oldValue) {
            update(el, binding);
          }
        }
      });
    }
  };
  if (typeof exports == "object") {
    module.exports = vueWebp;
  } else if (typeof define == "function" && define.amd) {
    define([], function() {
      return vueWebp;
    });
  } else if (window.Vue) {
    window.VueWebp = vueWebp;
    Vue.use(vueWebp);
  }
})();
