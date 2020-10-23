export default function mediaCheck(options) {
  if (typeof window.matchMedia === 'undefined' || !window.matchMedia('!').addListener) {
    throw new Error('No matchMedia support');
  };

  const mqChange = (mq, options) => {
    console.log(mq);
    if (mq.matches) {
      if (typeof options.entry === 'function') { options.entry(mq) }
    } else {
      if (typeof options.exit === 'function') { options.exit(mq) }
      if (typeof options.both === 'function') { options.both(mq) }
    }
  }

  const createListener = () => {
    let mq = window.matchMedia(options.media);
    mq.addListener(() => mqChange(mq, options));

    window.addEventListener('orientationchange', () => {
      let mq = window.matchMedia(options.media);
      mqChange(mq, options);
    }, false);

    mqChange(mq, options);
  }

  createListener();
};
