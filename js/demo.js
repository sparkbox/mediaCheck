$(function() {
  var $test = $('test');

  mediaCheck({
    media: '(max-width: 420px)',
    entry: function() {
      console.log('starting 420');
    },
    exit: function() {
      console.log('leaving 420');
    }
  });

  mediaCheck({
    media: '(max-width: 600px)',
    entry: function() {
      $('#test').text('This is a smaller screen.');
    },
    exit: function() {
      $('#test').text('This is a larger screen.');
    }
  });

  mediaCheck({
    media: '(max-width: 40em)',
    entry: function() {
      console.log('starting 40em');
    },
    exit: function() {
      console.log('leaving 40em');
    }
  });

  mediaCheck({
    media: '(max-width: 50em)',
    both: function() {
      console.log('starting or ending 50em');
    }
  });

});