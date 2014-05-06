/*                    _ _        ____ _               _
   _ __ ___   ___  __| (_) __ _ / ___| |__   ___  ___| | __
  | '_ ` _ \ / _ \/ _` | |/ _` | |   | '_ \ / _ \/ __| |/ /
  | | | | | |  __/ (_| | | (_| | |___| | | |  __/ (__|   <
  |_| |_| |_|\___|\__,_|_|\__,_|\____|_| |_|\___|\___|_|\_\

  http://github.com/sparkbox/mediaCheck

  Version: 0.3.0, 06-05-2014
  Author: Rob Tarr (http://twitter.com/robtarr)
*/
!function(){window.mediaCheck=function(a){var b,c,d,e,f,g,h,i,j,k,l;if(i=void 0,j=void 0,d=void 0,c=void 0,e=void 0,g=void 0!==window.matchMedia&&!!window.matchMedia("").addListener)return j=function(a,b){return a.matches?"function"==typeof b.entry&&b.entry():"function"==typeof b.exit&&b.exit(),"function"==typeof b.both?b.both():void 0},d=function(){return i=window.matchMedia(a.media),i.addListener(function(){return j(i,a)}),window.addEventListener("orientationchange",function(){return i=window.matchMedia(a.media),j(i,a)},!1),j(i,a)},d();k=void 0,b={},a.debounce=a.debounce||250,j=function(a,c){return a.matches?"function"!=typeof c.entry||b[c.media]!==!1&&null!=b[c.media]||c.entry():"function"!=typeof c.exit||b[c.media]!==!0&&null!=b[c.media]||c.exit(),"function"==typeof c.both&&c.both(),b[c.media]=a.matches},c=function(a){var b;return b=void 0,b=document.createElement("div"),b.style.width="1em",document.body.appendChild(b),a*b.offsetWidth},e=function(a,b){var d;switch(d=void 0,b){case"em":return d=c(a);default:return d=a}},l=function(a,b,c){var d,e;return b||(b=250),e=void 0,d=void 0,function(){var f,g,h;return g=c||this,h=+new Date,f=arguments,e&&e+b>h?(clearTimeout(d),d=setTimeout(function(){return e=h,a.apply(g,f)},b)):(e=h,a.apply(g,f))}};for(f in a)b[a.media]=null;return h=function(){var b,c,d,f,g;return console.log("fire"),f=a.media.match(/\((.*)-.*:\s*([\d\.]*)(.*)\)/),c=f[1],g=e(parseInt(f[2],10),f[3]),d={},b=document.documentElement.clientWidth,k!==b?(d.matches="max"===c&&g>b||"min"===c&&b>g,j(d,a),k=b):void 0},window.addEventListener?window.addEventListener("resize",l(h,a.debounce)):window.attachEvent&&window.attachEvent("onresize",l(h,a.debounce)),h()}}.call(this);