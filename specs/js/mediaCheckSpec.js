(function(global) {
  describe('mediaCheck', function() {
    var entrySpy = jasmine.createSpy('entry'),
        exitSpy = jasmine.createSpy('exit'),
        bothSpy = jasmine.createSpy('both');

    it('should create mediaCheck', function() {
      expect(typeof global.mediaCheck).toBe('function');
    });

    describe('native matchMedia support', function() {
      it('should pass the media query to matchMedia', function() {
        spyOn(global, 'matchMedia').and.returnValue({addListener: function() {}});
        mediaCheck({
          media: 'test',
        });
        expect(global.matchMedia).toHaveBeenCalledWith('test');
      });
    });

    describe('matchmedia polyfill', function() {
      var tempAddEventListener;

      beforeEach(function() {
        tempAddEventListener = global.addEventListener;
        spyOn(global, 'matchMedia').and.returnValue({addListener: false});
      });

      afterEach(function() {
        global.addEventListener = tempAddEventListener;
      });

      it('should use the addEventListener resize event, if matchmedia isn\'t supported', function() {
        global.addEventListener = jasmine.createSpy('addEventListenerSpy');

        mediaCheck({
          media: '(max-width: 0px)',
        });

        global.dispatchEvent(new Event('resize'));
        expect(global.addEventListener).toHaveBeenCalled();
      });

      it('should use the attachEvent onresize event, if matchmedia and addEventListener aren\'t supported', function() {
        global.addEventListener = undefined;
        // The attachEvent object only exists in IE, so we can safely reassign it in PhantomJS.
        global.attachEvent = jasmine.createSpy('attachEventSpy');

        mediaCheck({
          media: '(max-width: 0px)',
        });

        global.dispatchEvent(new Event('onresize'));
        expect(global.attachEvent).toHaveBeenCalled();
      });

      // This is a placeholder for the kinds of tests we'd like to run to ensure
      // our polyfills are working as expected.
      xdescribe('listeners', function() {
        it('should run \'enter\' callbacks when entering a basic mediaquery', function() {

        });

        it('should run \'exit\' callbacks when exiting a basic mediaquery', function() {

        });

        it('should run \'both\' callbacks when entering a basic mediaquery', function() {

        });

        it('should run \'both\' callbacks when exiting a basic mediaquery', function() {

        });
      });
    });

    xit('should run addEventListener callback when orientation changes are triggered', function() {
      // We should be able to trigger this event pretty easily.
    });

  });
}(this));
