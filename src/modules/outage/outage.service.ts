import { autoInjectable } from 'tsyringe';
import OutageServiceCaller from './outage.service-caller';
import SiteService from '../site/site.service';
import { CommonLogic } from '../../logic/common.logic';

@autoInjectable()
export default class OutageService {
  private outageServiceCaller: OutageServiceCaller;

  private siteService: SiteService;

  constructor(outageServiceCaller: OutageServiceCaller, siteService: SiteService) {
    this.outageServiceCaller = outageServiceCaller;
    this.siteService = siteService;
  }

  async getSiteOutages(siteId : string, limitedDate : string) {
    if (!siteId) {
      throw new Error('SiteId is Cannot be Empty in here !');
    }

    const recentSite = await this.siteService.getSiteInfo(siteId);

    if (!recentSite) {
      throw new Error('Cannot find a recent site with siteId !');
    }

    const allOutages = await this.outageServiceCaller.getAllOutages();

    if (CommonLogic.checkArrayIsEmpty(allOutages)) {
      throw new Error('No Outages found !');
    }

    const filteredOutage = CommonLogic.filterAndPrepareOutages(
      recentSite.devices,
      allOutages,

      limitedDate,
    );

    return filteredOutage;
  }

  async addOutages(siteId : string, outages : any[]) {
    if (!siteId) {
      throw new Error('SiteId is Cannot be Empty in here !');
    }

    if (CommonLogic.checkArrayIsEmpty(outages)) {
      throw new Error('No Outages found !');
    }

    await this.outageServiceCaller.addOutages(siteId, outages);

    return true;
  }
}
