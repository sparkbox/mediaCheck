import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import mediaCheck from '../src/mediaCheck.js';

chai.use(sinonChai);

describe('#mediaCheck', () => {
  describe('setup', () => {
    it('returns nothing if !window', () => {
      delete global.window;

      expect(mediaCheck({})).to.be.null;
    });

    it('adds a matchMedia listener', () => {
      const addListener = sinon.spy();
      const addEventListener = sinon.spy();

      global.window = {
        matchMedia: sinon.fake.returns({
          addListener
        }),
        addEventListener
      };

      mediaCheck({
        media: '(max-width: 420px)'
      });

      expect(addListener).to.have.been.called;
    });

    it('adds an event listener for orientation change', () => {
      const addListener = sinon.spy();
      const addEventListener = sinon.spy();

      global.window = {
        matchMedia: sinon.fake.returns({
          addListener
        }),
        addEventListener
      };

      mediaCheck({
        media: '(max-width: 420px)'
      });

      expect(addEventListener.getCall(0).args[0]).to.equal('orientationchange');
    });
  });
});
