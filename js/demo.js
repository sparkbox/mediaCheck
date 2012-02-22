$(function() {
  var $test = $('test');

  // var mql = matchMedia("screen and (max-width:420px)");
  // mql.addListener(function(mql) {
  //   console.log("Changed!");
  //   console.log(mql.matches);
  //   console.log(mql.media);
  // });
  // 
  // var mql1 = matchMedia("screen and (max-width:800px)");
  // mql1.addListener(function(mql1) {
  //   console.log("Changed!");
  //   console.log(mql1.matches);
  //   console.log(mql1.media);
  // });
  
  mediaCheck({
    media: '(max-width: 420px)',
    entry: function() {
      $('#test').text('This is a smaller screen.');
    },
    exit: function() {
      $('#test').text('This is a larger screen.');
    }
  });
  
});