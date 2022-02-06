import  './';

import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { MyResumeElement } from './my-resume.element';
import sinon from 'sinon';

describe('MyResume', () => {

  let fetchSpy: sinon.SinonStub
  const sandbox = sinon.createSandbox();
  beforeEach(async () => {
    fetchSpy = sandbox.stub(window, 'fetch').returns(new Promise((res, rej) => ({})));    
  });
  afterEach(async () => {    
    sandbox.restore();
  });

  it('renders loading when still loading', async () => {
    
    const element = await fixture<MyResumeElement>(html`<my-resume></my-resume>` );
    const h1 = element?.shadowRoot?.querySelector('app-loading');
    console.log(element.shadowRoot)
    expect(h1).to.exist;
  });
  it('renders an error on error', async () => {
    fetchSpy = fetchSpy.returns(Promise.reject())
    const element = await fixture(html`<my-resume></my-resume>` );
    const h1 = element?.shadowRoot?.querySelector('.app-error');
    expect(h1).to.exist;
  });
  
  it('passes the a11y audit', async () => {
    const element = await fixture(html`<my-resume></my-resume>` );
    await expect(element).shadowDom.to.be.accessible();
  });
});
