import { spy, fake } from 'sinon';
import browserEnv from 'browser-env';
import mediaCheck from '../src/mediaCheck';

browserEnv(['window']);

window.matchMedia = fake.returns({ addListener: function() {} });

test('should pass the media query to matchMedia', () => {
  mediaCheck({
    media: 'test',
  });

  expect(window.matchMedia).toBeCalledWith('test');
});
