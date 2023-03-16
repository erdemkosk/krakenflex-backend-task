import SiteServiceCaller from '../../../../src/modules/site/site.service-caller';
import ServiceCaller from '../../../../src/utils/service-call.utils';

describe('SiteServiceCaller', () => {
  let siteServiceCaller: SiteServiceCaller;
  let serviceCaller: ServiceCaller;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getSiteInfo', () => {
    const testSiteId = 'testSiteId';
    it('should call /site-info/siteId', async () => {
      const testData = [{ id: 'mockData' }];

      serviceCaller = {
        call: jest.fn().mockResolvedValue(testData),
      } as ServiceCaller;

      siteServiceCaller = new SiteServiceCaller(serviceCaller);

      const returnData = await siteServiceCaller.getSiteInfo(testSiteId);

      expect(serviceCaller.call).toHaveBeenCalledWith({
        method: 'get',
        url: `/site-info/${testSiteId}`,
      });

      expect(returnData).toStrictEqual(testData);
    });
    describe('Data is undefined', () => {
      it('should return undefined', async () => {
        serviceCaller = {
          call: jest.fn().mockResolvedValue(undefined),
        } as ServiceCaller;

        siteServiceCaller = new SiteServiceCaller(serviceCaller);

        const returnData = await siteServiceCaller.getSiteInfo(testSiteId);

        expect(returnData).toStrictEqual(undefined);
      });
    });
  });
});
