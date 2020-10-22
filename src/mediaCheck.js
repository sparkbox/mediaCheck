export default mediaCheck = (options) => {
  if (window.matchMedia === `undefined` || !window.matchMedia('!').addListener) {
    throw new Error('No matchMedia support');
  };

  const mqChange = (mq, options) => {
    if (mq.matches) {
      if (typeof options.entry === 'function') { options.entry(mq) }
    } else {
      if (typeof options.exit === 'function') { options.exit(mq) }
      if (typeof options.both === 'function') { options.both(mq) }
    }
  }

  const createListener = () => {
    mq = window.matchMedia(options.media);
    mq.addListener => mqChange(mq, options);

    window.addEventListener('orientationchange', (=>
      mq = window.matchMedia(options.media);
      mqChange(mq, options);
    ), false);

    mqChange(mq, options);
  }

  createListener();
};
