import OutageService from '../../../../src/modules/outage/outage.service'
import OutageServiceCaller from '../../../../src/modules/outage/outage.service-caller';
import SiteService from '../../../../src/modules/site/site.service'
import { CommonLogic } from '../../../../src/logic/common.logic'

describe('OutageService', () => {
  let outageService: OutageService;
  let siteService: SiteService;
  let outageServiceCaller: OutageServiceCaller;

  describe('getSiteOutages', () => {
    it('should throw an error if siteId is not provided', async () => {
      siteService = {
        getSiteInfo: jest.fn(),
      } as unknown as SiteService;

      outageServiceCaller = {
        getAllOutages: jest.fn(),
      } as unknown as OutageServiceCaller;

      outageService = new OutageService(outageServiceCaller, siteService);

      await expect(outageService.getSiteOutages('', '2022-01-01')).rejects.toThrow('SiteId is Cannot be Empty in here !');
    });

    it('should throw an error if no recent site is found with the provided siteId', async () => {
      siteService = {
        getSiteInfo: jest.fn().mockReturnValue(undefined),
      } as unknown as SiteService;

      outageServiceCaller = {
        getAllOutages: jest.fn(),
      } as unknown as OutageServiceCaller;

      outageService = new OutageService(outageServiceCaller, siteService);

      await expect(outageService.getSiteOutages('site123', '2022-01-01')).rejects.toThrow('Cannot find a recent site with siteId !');

      expect(siteService.getSiteInfo).toHaveBeenCalledWith('site123');
    });

    it('should throw an error if no outages are found', async () => {
      siteService = {
        getSiteInfo: jest.fn().mockReturnValue({
          id: 'site123',
          devices: [{ id: 'device1', name: 'Device 1' }],
        }),
      } as unknown as SiteService;

      outageServiceCaller = {
        getAllOutages: jest.fn().mockReturnValue([]),
      } as unknown as OutageServiceCaller;

      outageService = new OutageService(outageServiceCaller, siteService);

      await expect(outageService.getSiteOutages('site123', '2022-01-01')).rejects.toThrow('No Outages found !');

      expect(siteService.getSiteInfo).toHaveBeenCalledWith('site123');
      expect(outageServiceCaller.getAllOutages).toHaveBeenCalled();
    });

    it('should return filtered outages', async () => {
      const mockSite = {
        devices: [{
          id: 'testDevice',
        }],
      };
      const mockOutages = [{
        id: 'test',
      }];

      const returnMock = [{ id: 'TestData' }];

      const testSiteId = 'testSiteId';

      siteService = {
        getSiteInfo: jest.fn().mockReturnValue(mockSite),
      } as unknown as SiteService;

      outageServiceCaller = {
        getAllOutages: jest.fn().mockReturnValue(mockOutages),
      } as unknown as OutageServiceCaller;

      jest.spyOn(CommonLogic, 'filterAndPrepareOutages').mockReturnValueOnce(returnMock);

      outageService = new OutageService(outageServiceCaller, siteService);

      const returnData = await outageService.getSiteOutages(testSiteId, '2022-01-01');

      expect(CommonLogic.filterAndPrepareOutages).toHaveBeenCalledWith(mockSite.devices, mockOutages, '2022-01-01');
      expect(CommonLogic.filterAndPrepareOutages).toHaveBeenCalledTimes(1);
      expect(returnData).toStrictEqual(returnMock);
      jest.spyOn(CommonLogic, 'filterAndPrepareOutages').mockReturnValueOnce(returnMock);
    });
  });
})

describe('addOutages', () => {
  let outageService: OutageService;
  let siteService: SiteService;
  let outageServiceCaller: OutageServiceCaller;
  it('should throw an error if siteId is not provided', async () => {
    siteService = {
      getSiteInfo: jest.fn(),
    } as unknown as SiteService;

    outageServiceCaller = {
      addOutages: jest.fn(),
    } as unknown as OutageServiceCaller;

    outageService = new OutageService(outageServiceCaller, siteService);

    await expect(outageService.addOutages('', [])).rejects.toThrow('SiteId is Cannot be Empty in here !');
  });

  it('should throw an error if no outages are found', async () => {
    siteService = {
      getSiteInfo: jest.fn(),
    } as unknown as SiteService;

    outageServiceCaller = {
      addOutages: jest.fn(),
    } as unknown as OutageServiceCaller;

    outageService = new OutageService(outageServiceCaller, siteService);

    await expect(outageService.addOutages('site123', [])).rejects.toThrow('No Outages found !');

    expect(outageServiceCaller.addOutages).not.toHaveBeenCalled();
  });

  it('should add outages and return true', async () => {
    const mockOutages = [{ id: 'test' }];

    const testSiteId = 'testSiteId';

    siteService = {
      getSiteInfo: jest.fn(),
    } as unknown as SiteService;

    outageServiceCaller = {
      addOutages: jest.fn(),
    } as unknown as OutageServiceCaller;

    outageService = new OutageService(outageServiceCaller, siteService);

    await expect(outageService.addOutages(testSiteId, mockOutages)).resolves.toBe(true);

    expect(outageServiceCaller.addOutages).toHaveBeenCalledWith(testSiteId, mockOutages);
  });
});
