import mqChange from './mqChange';

const mediaCheck = function(options) {
  if (typeof window === 'undefined') return null;

  const mq = window.matchMedia(options.media);

  mq.addListener(function() {
    return mqChange(mq, options);
  });

  window.addEventListener("orientationchange", (function() {
    const orientationMQ = window.matchMedia(options.media);
    return mqChange(orientationMQ, options);
  }), false);

  return mqChange(mq, options);
};

export default mediaCheck;
