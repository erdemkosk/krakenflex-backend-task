import BaseConfig from './base';

class ProdConfig extends BaseConfig {
  constructor() {
    super();
    this.retryInterval = 500;
    this.retryAttemps = 2;
  }
}

export default ProdConfig;
