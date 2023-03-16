export class CommonLogic {
  public static checkArrayIsEmpty(array : any[]): boolean {
    return array.length === 0;
  }

  // collecting outages with outagesId : [{begin: '' , end: ''}]
  public static prepareOutages(outages, limitedDate) {
    const outagesDeviceMapping = {};

    outages.forEach((outage) => {
      if (new Date(outage.begin).getTime() >= new Date(limitedDate).getTime()) {
        const outageId = outage.id;

        if (!outagesDeviceMapping[outageId]) {
          outagesDeviceMapping[outageId] = [];
        }

        outagesDeviceMapping[outageId].push({
          begin: outage.begin,
          end: outage.end,
        });
      }
    });

    return outagesDeviceMapping;
  }

  static filterAndPrepareOutages(devices, outages, limitedDate) {
    const outagesDeviceMapping = this.prepareOutages(outages, limitedDate);

    const deviceOutages = devices.flatMap((device) => {
      // each device like { id: '', name: '' }
      const currentDeviceOutages = outagesDeviceMapping[device.id];

      // after elemination [{begin:'', end:''}]

      if (!currentDeviceOutages) {
        return [];
      }

      return currentDeviceOutages.map((outage) => ({
        id: device.id,
        name: device.name,
        begin: outage.begin,
        end: outage.end,
      }));
    });

    return deviceOutages;
  }
}
