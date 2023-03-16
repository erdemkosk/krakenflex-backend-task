import BaseConfig from './base';

class TestConfig extends BaseConfig {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.retryInterval = 500;
    this.retryAttemps = 10;
    this.apiKey = 'api-key';
    this.serviceUrl = 'http://testservice.com/test-api';
    this.specificSiteId = 'siteId';
    this.limitedDate = '2022-01-01T00:00:00.000Z';
  }
}

export default TestConfig;
