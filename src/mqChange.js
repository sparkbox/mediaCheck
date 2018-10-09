const mqChange = function(mq, options) {
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

export default mqChange;
