const test = require('ava');
const { spy, fake } = require('sinon');
const browserEnv = require('browser-env');
browserEnv(['window']);

require('../js/mediaCheck');
window.matchMedia = fake.returns({ addListener: function() {} });

test('should create mediaCheck', t => {
  t.is(typeof window.mediaCheck, 'function');
});

test('should pass the media query to matchMedia', t => {
  window.mediaCheck({
    media: 'test',
  });

  t.true(window.matchMedia.calledWith('test'));
});
