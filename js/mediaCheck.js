var mediaCheck = function( options ) {
  var mq,
      matchMedia = window.matchMedia !== undefined;
      
  mqChange = function( mq, options ) {
    if ( mq.matches ) {
      options.entry();
    } else {
      options.exit();
    }
  };
      
  
  if ( matchMedia ) {
    // Has matchMedia support
    createListener = function() {

      mq = window.matchMedia( options.media );
      mq.addListener( function() {
        mqChange( mq, options );
      });
      mqChange( mq, options );
    };
    
    createListener();
    
  } else {
    // No matchMedia support
    var mmListener = function() {
      var parts = options.media.match( /\((.*)-.*:\s*(.*)\)/ ),
          constraint = parts[ 1 ],
          value = parseInt( parts[ 2 ], 10 ),
          fakeMatchMedia = {};

      fakeMatchMedia.matches = constraint === "max" && value > window.outerWidth ||
                               constraint === "min" && value < window.outerWidth;
      mqChange( fakeMatchMedia, options );
    };

    window.addEventListener( "resize", mmListener);
    mmListener();
  }
};