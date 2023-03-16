import SiteService from '../../../../src/modules/site/site.service'
import SiteServiceCaller from '../../../../src/modules/site/site.service-caller';

describe('SiteService', () => {
  let siteService: SiteService;
  let siteServiceCaller: SiteServiceCaller;

  describe('getSiteInfo', () => {
    it('should call getSiteInfo method of SiteServiceCaller with given site id', async () => {
      const siteId = '123';

      siteServiceCaller = {
        getSiteInfo: jest.fn().mockReturnValue({
          id: siteId,
          name: 'Test Site',
        }),
      } as unknown as SiteServiceCaller;

      siteService = new SiteService(siteServiceCaller);

      const result = await siteService.getSiteInfo(siteId);

      expect(siteServiceCaller.getSiteInfo).toHaveBeenCalledWith(siteId);

      expect(result).toEqual({
        id: siteId,
        name: 'Test Site',
      });
    });
  });
})
