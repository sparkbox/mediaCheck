var mediaCheck = function(options) {
  var mq,
      matchMedia = window.matchMedia !== undefined;
      
  if (matchMedia) {
    mqChange = function(mq, options) {
      if (mq.matches) {
        options.entry();
      } else {
        options.exit();
      }
    };
    
    createListener = function(mqDetails) {
      mq = window.matchMedia(mqDetails.media);
      mq.addListener(function() {
        mqChange(mq, mqDetails);
      });
      mqChange(mq, mqDetails);
    };
    
    createListener(options);
  }
};