import OutageServiceCaller from '../../../../src/modules/outage/outage.service-caller';
import ServiceCaller from '../../../../src/utils/service-call.utils';

describe('OutageServiceCaller', () => {
  let outageServiceCaller: OutageServiceCaller;
  let serviceCaller: ServiceCaller;

  describe('getAllOutages', () => {
    it('should call /outages', async () => {
      const testData = [{ id: 'mockData' }];

      serviceCaller = {
        call: jest.fn().mockResolvedValue(testData),
      } as ServiceCaller;

      outageServiceCaller = new OutageServiceCaller(serviceCaller);

      const returnData = await outageServiceCaller.getAllOutages();

      expect(serviceCaller.call).toHaveBeenCalledWith({
        method: 'get',
        url: '/outages',
      });
      expect(returnData).toStrictEqual(testData);
    });

    describe('When returned data is undefined', () => {
      it('should return undefined', async () => {
        serviceCaller = {
          call: jest.fn().mockResolvedValue(undefined),
        } as ServiceCaller;

        outageServiceCaller = new OutageServiceCaller(serviceCaller);

        const returnData = await outageServiceCaller.getAllOutages();

        expect(serviceCaller.call).toHaveBeenCalledWith({
          method: 'get',
          url: '/outages',
        });
        expect(returnData).toBeUndefined();
      });
    });
  });

  describe('addOutages', () => {
    it('should call /site-outages/siteId', async () => {
      const testData = [{ id: 'mockData' }];
      const siteId = 'site123';
      const outages = [{ id: test }]

      serviceCaller = {
        call: jest.fn().mockResolvedValue(testData),
      } as ServiceCaller;

      outageServiceCaller = new OutageServiceCaller(serviceCaller);

      const returnData = await outageServiceCaller.addOutages(siteId, outages);

      expect(serviceCaller.call).toHaveBeenCalledWith({
        method: 'post',
        url: `/site-outages/${siteId}`,
        data: outages,
      });
      expect(returnData).toStrictEqual(testData);
    });
  });
});
