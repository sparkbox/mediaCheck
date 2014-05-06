/*                    _ _        ____ _               _
   _ __ ___   ___  __| (_) __ _ / ___| |__   ___  ___| | __
  | '_ ` _ \ / _ \/ _` | |/ _` | |   | '_ \ / _ \/ __| |/ /
  | | | | | |  __/ (_| | | (_| | |___| | | |  __/ (__|   <
  |_| |_| |_|\___|\__,_|_|\__,_|\____|_| |_|\___|\___|_|\_\

  http://github.com/sparkbox/mediaCheck

  Version: 0.3.0, 06-05-2014
  Author: Rob Tarr (http://twitter.com/robtarr)
*/
(function() {
  window.mediaCheck = function(options) {
    var breakpoints, convertEmToPx, createListener, getPXValue, i, matchMedia, mmListener, mq, mqChange, pageWidth, throttle;
    mq = void 0;
    mqChange = void 0;
    createListener = void 0;
    convertEmToPx = void 0;
    getPXValue = void 0;
    matchMedia = window.matchMedia !== undefined && !!window.matchMedia("").addListener;
    if (matchMedia && false) {
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
      pageWidth = void 0;
      breakpoints = {};
      options.debounce = options.debounce || 250;
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
        var emElement;
        emElement = void 0;
        emElement = document.createElement("div");
        emElement.style.width = "1em";
        document.body.appendChild(emElement);
        return value * emElement.offsetWidth;
      };
      getPXValue = function(width, unit) {
        var value;
        value = void 0;
        switch (unit) {
          case "em":
            return value = convertEmToPx(width);
          default:
            return value = width;
        }
      };

      /*
      Throttle function from @rem http://remysharp.com/2010/07/21/throttling-function-calls/
       */
      throttle = function(fn, threshhold, scope) {
        var deferTimer, last;
        threshhold || (threshhold = 250);
        last = void 0;
        deferTimer = void 0;
        return function() {
          var args, context, now;
          context = scope || this;
          now = +(new Date);
          args = arguments;
          if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            return deferTimer = setTimeout(function() {
              last = now;
              return fn.apply(context, args);
            }, threshhold);
          } else {
            last = now;
            return fn.apply(context, args);
          }
        };
      };
      for (i in options) {
        breakpoints[options.media] = null;
      }
      mmListener = function() {
        var clientWidth, constraint, fakeMatchMedia, parts, value;
        console.log("fire");
        parts = options.media.match(/\((.*)-.*:\s*([\d\.]*)(.*)\)/);
        constraint = parts[1];
        value = getPXValue(parseInt(parts[2], 10), parts[3]);
        fakeMatchMedia = {};
        clientWidth = document.documentElement.clientWidth;
        if (pageWidth !== clientWidth) {
          fakeMatchMedia.matches = constraint === "max" && value > clientWidth || constraint === "min" && value < clientWidth;
          mqChange(fakeMatchMedia, options);
          return pageWidth = clientWidth;
        }
      };
      if (window.addEventListener) {
        window.addEventListener("resize", throttle(mmListener, options.debounce));
      } else {
        if (window.attachEvent) {
          window.attachEvent("onresize", throttle(mmListener, options.debounce));
        }
      }
      return mmListener();
    }
  };

}).call(this);
