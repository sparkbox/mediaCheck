/*                    _ _        ____ _               _
   _ __ ___   ___  __| (_) __ _ / ___| |__   ___  ___| | __
  | '_ ` _ \ / _ \/ _` | |/ _` | |   | '_ \ / _ \/ __| |/ /
  | | | | | |  __/ (_| | | (_| | |___| | | |  __/ (__|   <
  |_| |_| |_|\___|\__,_|_|\__,_|\____|_| |_|\___|\___|_|\_\

  http://github.com/sparkbox/mediaCheck

  Version: 0.4.3, 12-05-2014
  Author: Rob Tarr (http://twitter.com/robtarr)
*/
(function() {
  window.mediaCheck = function(options) {
    var breakpoints, convertEmToPx, createListener, getPXValue, hasMatchMedia, i, mmListener, mq, mqChange;
    mq = void 0;
    mqChange = void 0;
    createListener = void 0;
    convertEmToPx = void 0;
    getPXValue = void 0;
    hasMatchMedia = window.matchMedia !== undefined && !!window.matchMedia("!").addListener;
    if (hasMatchMedia) {
      mqChange = function(mq, options) {
        if (mq.matches) {
          if (typeof options.entry === "function") {
            options.entry();
          }
        } else {
          if (typeof options.exit === "function") {
            options.exit();
          }
        }
        if (typeof options.both === "function") {
          return options.both();
        }
      };
      createListener = function() {
        mq = window.matchMedia(options.media);
        mq.addListener(function() {
          return mqChange(mq, options);
        });
        window.addEventListener("orientationchange", (function() {
          mq = window.matchMedia(options.media);
          return mqChange(mq, options);
        }), false);
        return mqChange(mq, options);
      };
      return createListener();
    } else {
      breakpoints = {};
      mqChange = function(mq, options) {
        if (mq.matches) {
          if (typeof options.entry === "function" && (breakpoints[options.media] === false || (breakpoints[options.media] == null))) {
            options.entry();
          }
        } else {
          if (typeof options.exit === "function" && (breakpoints[options.media] === true || (breakpoints[options.media] == null))) {
            options.exit();
          }
        }
        if (typeof options.both === "function") {
          options.both();
        }
        return breakpoints[options.media] = mq.matches;
      };
      convertEmToPx = function(value) {
        var emElement, px;
        emElement = void 0;
        emElement = document.createElement("div");
        emElement.style.width = "1em";
        emElement.style.position = "absolute";
        document.body.appendChild(emElement);
        px = value * emElement.offsetWidth;
        document.body.removeChild(emElement);
        return px;
      };
      getPXValue = function(width, unit) {
        var value;
        value = void 0;
        switch (unit) {
          case "em":
            value = convertEmToPx(width);
            break;
          default:
            value = width;
        }
        return value;
      };
      for (i in options) {
        breakpoints[options.media] = null;
      }
      mmListener = function() {
        var constraint, fakeMatchMedia, parts, value, windowWidth;
        parts = options.media.match(/\((.*)-.*:\s*([\d\.]*)(.*)\)/);
        constraint = parts[1];
        value = getPXValue(parseInt(parts[2], 10), parts[3]);
        fakeMatchMedia = {};
        windowWidth = window.outerWidth || document.documentElement.clientWidth;
        fakeMatchMedia.matches = constraint === "max" && value > windowWidth || constraint === "min" && value < windowWidth;
        return mqChange(fakeMatchMedia, options);
      };
      if (window.addEventListener) {
        window.addEventListener("resize", mmListener);
      } else {
        if (window.attachEvent) {
          window.attachEvent("onresize", mmListener);
        }
      }
      return mmListener();
    }
  };

}).call(this);
