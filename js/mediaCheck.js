(function() {
  window.mediaCheck = function(options) {
    var breakpoints, convertEmToPx, createListener, getPXValue, i, matchMedia, mmListener, mq, mqChange, pageWidth;
    mq = void 0;
    mqChange = void 0;
    createListener = void 0;
    convertEmToPx = void 0;
    getPXValue = void 0;
    matchMedia = window.matchMedia !== undefined && !!window.matchMedia("").addListener;
    if (matchMedia) {
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
      for (i in options) {
        breakpoints[options.media] = null;
      }
      mmListener = function() {
        var clientWidth, constraint, fakeMatchMedia, parts, value;
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
