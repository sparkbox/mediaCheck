var mediaCheck = function(options) {
  var mq,
      matchMedia = window.matchMedia !== undefined;
      
  if (matchMedia) {
  
    function mqChange() {
      if (mq.matches) {
        options.entry();
      } else if (!mq.matches) {
        options.exit();
      }
    }

    mq = window.matchMedia(options.media),
    mq.addListener(mqChange);
    mqChange();
  }
};