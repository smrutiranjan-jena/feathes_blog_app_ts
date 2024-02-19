import app from '../../src/app';

describe('\'follow_request\' service', () => {
  it('registered the service', () => {
    const service = app.service('follow-request');
    expect(service).toBeTruthy();
  });
});
