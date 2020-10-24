const mediaCheck = require('../src/mediaCheck');

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

test('should pass the media query to matchMedia', () => {
  mediaCheck({
    media: 'test',
  });

  expect(window.matchMedia).toHaveBeenCalledWith('test');
});
