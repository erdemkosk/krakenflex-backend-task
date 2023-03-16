import { autoInjectable } from 'tsyringe';
import ServiceCaller from '../../utils/service-call.utils'

@autoInjectable()
export default class OutageServiceCaller {
  private serviceCaller: ServiceCaller;

  constructor(serviceCaller: ServiceCaller) {
    this.serviceCaller = serviceCaller;
  }

  async getAllOutages() {
    return this.serviceCaller.call({ method: 'get', url: '/outages' });
  }

  async addOutages(siteId : string, outages : any[]) {
    return this.serviceCaller.call({ method: 'post', url: `/site-outages/${siteId}`, data: outages });
  }
}
