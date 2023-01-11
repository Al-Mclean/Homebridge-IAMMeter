// Device Setup and Discovery go in here

import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PLATFORM_NAME, PLUGIN_NAME } from './settings';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ExamplePlatformAccessory } from './platformAccessory';

export class ExampleHomebridgePlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;

  // this is used to track restored cached accessories
  public readonly accessories: PlatformAccessory[] = [];

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    this.log.debug('Finished initializing platform:', this.config.name);

    this.api.on('didFinishLaunching', () => {
      log.debug('Executed didFinishLaunching callback');
      // run the method to discover / register your devices as accessories
      this.discoverDevices();
      this.log.info('Done discovering devices now ');
    });
  }

  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Loading accessory from cache:', accessory.displayName);

    this.accessories.push(accessory);
  }

  discoverDevices() {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const exampleDevices = [

    ];

  }
}
