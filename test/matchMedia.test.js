const mediaCheck = require('../src/mediaCheck');

test('throws an error if matchMedia is not present', () => {
  expect(() => mediaCheck()).toThrow('No matchMedia support');
});
