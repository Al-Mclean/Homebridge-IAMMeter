
//   Device discovery and setup code goes in here

import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';
import { PLATFORM_NAME, PLUGIN_NAME } from './settings';
import { ExamplePlatformAccessory } from './platformAccessory';

export class ExampleHomebridgePlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;
  public readonly accessories: PlatformAccessory[] = [];                   // this is used to track restored cached accessories

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {

    this.log.info('Finished initializing platform:', this.config.name);
    this.api.on('didFinishLaunching', () => {
      log.info('Executed didFinishLaunching callback');
      this.discoverDevices();                              // run the method to discover / register your devices as accessories
    });
  }


  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Loading accessory from cache:', accessory.displayName);

    // add the restored accessory to the accessories cache so we can track if it has already been registered
    this.accessories.push(accessory);
  }


  discoverDevices() {

    const exampleDevices = [
      {
        exampleUniqueId: 'IJKL',
        exampleDisplayName: 'Meter1',
      },
    ];

    for (const device of exampleDevices) {
      const uuid = this.api.hap.uuid.generate(device.exampleUniqueId);
      const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

      if (existingAccessory) {
        this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);     // the accessory already exists
        new ExamplePlatformAccessory(this, existingAccessory);

      } else {                                                                  // the accessory does not yet exist, so we need to create it
        this.log.info('Adding new accessory:', device.exampleDisplayName);
        const accessory = new this.api.platformAccessory(device.exampleDisplayName, uuid);           // create a new accessory
        accessory.context.device = device;                                   // store a copy of the device object in the `accessory.context`
        // create the accessory handler for the newly create accessory, this is imported from `platformAccessory.ts`
        new ExamplePlatformAccessory(this, accessory);

        this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);   // link the accessory to your platform
      }

    }
  }
}
