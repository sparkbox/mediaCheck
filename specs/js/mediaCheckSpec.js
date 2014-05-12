(function() {
  describe("mediaCheck", function() {
    it("should create mediaCheck", function() {
      return expect(typeof window.mediaCheck).toBe("function");
    });
    describe("native matchMedia support", function() {
      return xit("should pass the media query to matchMedia", function() {
        spyOn(window, "matchMedia");
        mediaCheck({
          media: "test"
        });
        return expect(mediaCheck).toHaveBeenCalledWith("test");
      });
    });
    return describe("polyfilled matchMedia support", function() {});
  });

}).call(this);
