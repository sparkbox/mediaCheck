var mediaCheck = function( options ) {
  var mq,
      matchMedia = window.matchMedia !== undefined;
  
  if ( matchMedia ) {
    mqChange = function( mq, options ) {
      if ( mq.matches ) {
        if ( typeof options.entry === "function" ) {
          options.entry();
        }
      } else if ( typeof options.exit === "function" ) {
        options.exit();
      }
      if ( typeof options.both === "function" ) {
        options.both();
      }
    };
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
    // pageWidth is initialized during initial match
    var pageWidth,
        breakpoints = {};
    
    mqChange = function( mq, options ) {
      if ( mq.matches ) {
        if ( typeof options.entry === "function" && ( breakpoints[options.media] === false || breakpoints[options.media] == null )) {
          options.entry();
          breakpoints[options.media] = true
        }
      } else if ( typeof options.exit === "function" && ( breakpoints[options.media] === true || breakpoints[options.media] == null )) {
        options.exit();
        breakpoints[options.media] = false
      }
      if ( typeof options.both === "function" ) {
        options.both();
      }
    };
    
    convertEmToPx = function( value ) {
      var emElement;
            
      emElement = document.createElement( "div" );
      emElement.style.width = "1em";
      document.body.appendChild( emElement );

      return value * emElement.offsetWidth;    
    };
    
    getPXValue = function( width, unit ) {
      var value;
      
      switch ( unit ) {
      case "em":
        value = convertEmToPx( width );
        break;
      default:
        value = width;
      }
          
      return value;
    };
    
    // Create list of breakpoints
    for ( i in options ) {
      breakpoints[options.media] = null;
    }

    // No matchMedia support
    var mmListener = function() {
      var parts = options.media.match( /\((.*)-.*:\s*([\d\.]*)(.*)\)/ ),
          constraint = parts[ 1 ],
          value = getPXValue( parseInt( parts[ 2 ], 10 ), parts[3] ),
          fakeMatchMedia = {};

      
      // scope this to width changes to prevent small-screen scrolling (browser chrome off-screen)
      //   from triggering a change
      if (pageWidth != window.outerWidth) {
        fakeMatchMedia.matches = constraint === "max" && value > window.outerWidth ||
                                 constraint === "min" && value < window.outerWidth;
        mqChange( fakeMatchMedia, options );
        
        // reset pageWidth
        pageWidth = window.outerWidth;
      }
    };

    if (window.addEventListener) {
      window.addEventListener("resize", mmListener);
    } else if (window.attachEvent) {
      window.attachEvent("resize", mmListener);
    }
    mmListener();
  }
};