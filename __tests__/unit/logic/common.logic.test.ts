import { CommonLogic } from '../../../src/logic/common.logic'

describe('CommonLogic', () => {
  describe('checkArrayIsEmpty', () => {
    it('should return true if array is empty', () => {
      const array: any[] = [];
      expect(CommonLogic.checkArrayIsEmpty(array)).toBeTruthy();
    });

    it('should return false if array is not empty', () => {
      const array: any[] = [1, 2, 3];
      expect(CommonLogic.checkArrayIsEmpty(array)).toBeFalsy();
    });
  });

  describe('filterAndPrepareOutages', () => {
    const devices = [
      { id: 'outage1', name: 'Device 1' },
      { id: 'outage2', name: 'Device 2' },
    ];
    const outages = [
      { id: 'outage1', begin: '2022-01-01T00:00:00.000Z', end: '2022-01-01T01:00:00.000Z' },
      { id: 'outage1', begin: '2022-01-02T00:00:00.000Z', end: '2022-01-02T01:00:00.000Z' },
      { id: 'outage2', begin: '2022-01-03T00:00:00.000Z', end: '2022-01-03T01:00:00.000Z' },
    ];
    const limitedDate = '2022-01-02T00:00:00.000Z';

    it('should return empty array if devices array is empty', () => {
      const result = CommonLogic.filterAndPrepareOutages([], outages, limitedDate);

      expect(result).toEqual([]);
    });

    it('should return empty array if outages array is empty', () => {
      const result = CommonLogic.filterAndPrepareOutages(devices, [], limitedDate);

      expect(result).toEqual([]);
    });

    it('should return empty array if no outages meet the limited date condition', () => {
      const result = CommonLogic.filterAndPrepareOutages(devices, outages, '2022-01-04T00:00:00.000Z');

      expect(result).toEqual([]);
    });

    it('should return array of device outages', () => {
      const result = CommonLogic.filterAndPrepareOutages(devices, outages, limitedDate);

      expect(result).toEqual([
        {
          id: 'outage1',
          name: 'Device 1',
          begin: '2022-01-02T00:00:00.000Z',
          end: '2022-01-02T01:00:00.000Z',
        },
        {
          id: 'outage2',
          name: 'Device 2',
          begin: '2022-01-03T00:00:00.000Z',
          end: '2022-01-03T01:00:00.000Z',
        },
      ]);
    });
  });
})
