import { autoInjectable } from 'tsyringe';
import SiteServiceCaller from './site.service-caller';

@autoInjectable()
export default class SiteService {
  private siteServiceCaller: SiteServiceCaller;

  constructor(siteServiceCaller: SiteServiceCaller) {
    this.siteServiceCaller = siteServiceCaller;
  }

  async getSiteInfo(siteId : string) {
    const siteInfo = await this.siteServiceCaller.getSiteInfo(siteId);

    return siteInfo;
  }
}
