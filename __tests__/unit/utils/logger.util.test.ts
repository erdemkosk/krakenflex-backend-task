import Logger from '../../../src/utils/logger.utils';

describe('Logger', () => {
  describe('Init', () => {
    it('should be init', async () => {
      const myLogger = Logger;

      expect(myLogger).toBeTruthy();
    });
  });
});
