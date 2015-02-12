(function() {
  describe("mediaCheck", function() {
    it("should create mediaCheck", function() {
      expect(typeof window.mediaCheck).toBe("function");
    });

    describe("native matchMedia support", function() {
      xit("should pass the media query to matchMedia", function() {
        spyOn(window, "matchMedia");
        mediaCheck({
          media: "test"
        });
        expect(mediaCheck).toHaveBeenCalledWith("test");
      });
    });
    describe("polyfilled matchMedia support");
  });

}).call(this);
