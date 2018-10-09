import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import mqChange from '../src/mqChange.js';

chai.use(sinonChai);

describe('#mqChange', () => {
  context('mq.matches === true', () => {
    const mq = { matches: true };
    it('Calls entry', () => {
      const entry = sinon.spy();
      mqChange(mq, { entry });

      expect(entry).to.have.been.calledWith(mq);
    });

    it('Does NOT call exit', () => {
      const exit = sinon.spy();
      mqChange(mq, { exit });

      expect(exit).not.to.have.been.calledWith(mq);
    });

    it('Calls both', () => {
      const both = sinon.spy();
      mqChange(mq, { both });

      expect(both).to.have.been.calledWith(mq);
    });
  });

  context('mq.matches === false', () => {
    const mq = { matches: false };
    it('Calls exit', () => {
      const exit = sinon.spy();
      mqChange(mq, { exit });

      expect(exit).to.have.been.calledWith(mq);
    });

    it('Does NOT call entry', () => {
      const entry = sinon.spy();
      mqChange(mq, { entry });

      expect(entry).not.to.have.been.calledWith(mq);
    });

    it('Calls both', () => {
      const both = sinon.spy();
      mqChange(mq, { both });

      expect(both).to.have.been.calledWith(mq);
    });
  });
});