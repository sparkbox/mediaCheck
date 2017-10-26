/*                    _ _        ____ _               _
   _ __ ___   ___  __| (_) __ _ / ___| |__   ___  ___| | __
  | '_ ` _ \ / _ \/ _` | |/ _` | |   | '_ \ / _ \/ __| |/ /
  | | | | | |  __/ (_| | | (_| | |___| | | |  __/ (__|   <
  |_| |_| |_|\___|\__,_|_|\__,_|\____|_| |_|\___|\___|_|\_\

  http://github.com/sparkbox/mediaCheck

  Version: 0.4.6, 10-30-2017
  Author: Rob Tarr (http://twitter.com/robtarr)
*/

/*                    _ _        ____ _               _
   _ __ ___   ___  __| (_) __ _ / ___| |__   ___  ___| | __
  | '_ ` _ \ / _ \/ _` | |/ _` | |   | '_ \ / _ \/ __| |/ /
  | | | | | |  __/ (_| | | (_| | |___| | | |  __/ (__|   <
  |_| |_| |_|\___|\__,_|_|\__,_|\____|_| |_|\___|\___|_|\_\

  http://github.com/sparkbox/mediaCheck

  Version: 0.4.6, 10-21-2016
  Author: Rob Tarr (http://twitter.com/robtarr)
*/

window.mediaCheck = function(options) {
  const hasMatchMedia = window.matchMedia !== undefined && !!window.matchMedia("!").addListener;

  if (!hasMatchMedia) {
    mqChange = (mq, options) => {
      if (mq.matches) {
        if (typeof options.entry === "function") {
          options.entry(mq);
        }
      } else {
        if (typeof options.exit === "function") {
          options.exit(mq);
        }
      }
      if (typeof options.both === "function") {
        return options.both(mq);
      }
    };

    const createListener = () => {
      const mq = window.matchMedia(options.media);
      mq.addListener(() => mqChange(mq, options));

      window.addEventListener("orientationchange", (() => {
        mq = window.matchMedia(options.media);
        return mqChange(mq, options);
      }), false);

      return mqChange(mq, options);
    };

    return createListener();
  } else {
    const breakpoints = {};

    const mqChange = (mq, options) => {
      if (mq.matches) {
        if (typeof options.entry === "function" && (breakpoints[options.media] === false || (breakpoints[options.media] == null))) {
          options.entry(mq);
        }
      } else {
        if (typeof options.exit === "function" && (breakpoints[options.media] === true || (breakpoints[options.media] == null))) {
          options.exit(mq);
        }
      }
      if (typeof options.both === "function") {
        options.both(mq);
      }

      breakpoints[options.media] = mq.matches;
    };

    const convertEmToPx = (value) => {
      const emElement = document.createElement("div");
      let px = null;

      emElement.style.width = "1em";
      emElement.style.position = "absolute";
      document.body.appendChild(emElement);
      px = value * emElement.offsetWidth;
      document.body.removeChild(emElement);

      return px;
    };

    const getPXValue = (width, unit) => unit === 'em' ? convertEmToPx(width) : width;

    const checkQuery = (parts) => {
      const constraint = parts[1];
      const dimension = parts[2];
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      let matches = null;
      let ratio = null;
      let value = null;

      if (parts[4]) {
        value = getPXValue(parseInt(parts[3], 10), parts[4]);
      } else {
        value = parts[3];
      }

      if (dimension === 'width') {
        matches = constraint === "max" && value > windowWidth || constraint === "min" && value < windowWidth;
      } else if (dimension === 'height') {
        matches = constraint === "max" && value > windowHeight || constraint === "min" && value < windowHeight;
      } else if (dimension === 'aspect-ratio') {
        ratio = windowWidth / windowHeight;
        matches = constraint === "max" && eval(ratio) < eval(value) || constraint === "min" && eval(ratio) > eval(value);
      }

      return matches;
    };

    const mmListener = () => {
      const matches = options.media
        .split(/\sand\s|,\s/)
        .reduce((matches, media) => (
          !(matches && !checkQuery(media.match(/\((.*?)-(.*?):\s([\d\/]*)(\w*)\)/)))
        ), true);

      mqChange({
        media: options.media,
        matches: matches
      }, options);
    };

    if (window.addEventListener) {
      window.addEventListener("resize", mmListener, false);
    } else {
      if (window.attachEvent) {
        window.attachEvent("onresize", mmListener);
      }
    }

    mmListener();
  }
};
