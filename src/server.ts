import 'reflect-metadata';
import { container } from 'tsyringe';
import Config from './config'

import Logger from './utils/logger.utils'
import OutageService from './modules/outage/outage.service'

const entryPoint = async () => {
  Logger.info(`App will fetch started with : ${Config.specificSiteId} that began before${Config.limitedDate}`);

  try {
    const outageService : OutageService = container.resolve(OutageService);

    Logger.info('Retriving filtered outages!');

    const filteredOutage = await outageService
      .getSiteOutages(Config.specificSiteId, Config.limitedDate);

    Logger.info(`Outages ready for sending...${JSON.stringify(filteredOutage)}`);

    const success = await outageService
      .addOutages(Config.specificSiteId, filteredOutage);

    Logger.info(`Sending success is ${success}`);
  } catch (error) {
    Logger.error(error);
  }
};

entryPoint();
