import { autoInjectable } from 'tsyringe';
import ServiceCaller from '../../utils/service-call.utils'

@autoInjectable()
export default class SiteServiceCaller {
  private serviceCaller: ServiceCaller;

  constructor(serviceCaller: ServiceCaller) {
    this.serviceCaller = serviceCaller;
  }

  async getSiteInfo(siteId : string) {
    return this.serviceCaller.call({ method: 'get', url: `/site-info/${siteId}` });
  }
}
