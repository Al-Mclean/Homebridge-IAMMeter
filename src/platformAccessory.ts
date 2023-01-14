/* eslint-disable no-console */

//   Accessory control logic belongs in here

import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';
import { ExampleHomebridgePlatform } from './platform';
import got from 'got';


export class ExamplePlatformAccessory {
  private service: Service;
  private exampleStates = {
    On: false,
    Brightness: 100,
  };


  constructor(
    private readonly platform: ExampleHomebridgePlatform,
    private readonly accessory: PlatformAccessory,
  ) {

    // set accessory information
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer')
      .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');

    this.service = this.accessory.getService(this.platform.Service.Lightbulb) || this.accessory.addService(this.platform.Service.Lightbulb);
    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.exampleDisplayName);

    this.service.getCharacteristic(this.platform.Characteristic.On)
      .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
      .onGet(this.getOn.bind(this));               // GET - bind to the `getOn` method below

    this.service.getCharacteristic(this.platform.Characteristic.Brightness)
      .onSet(this.setBrightness.bind(this));       // SET - bind to the 'setBrightness` method below

    let motionDetected = false;
    setInterval(() => {
      motionDetected = !motionDetected;            // EXAMPLE - inverse the trigger
      this.platform.log.debug('Triggering motionSensorOneService:', motionDetected);
      this.platform.log.debug('Triggering motionSensorTwoService:', !motionDetected);
    }, 10000);

    console.log('About to request Energy Meter Data');


    this.energyRequest();
  }




  async setOn(value: CharacteristicValue) {
    this.exampleStates.On = value as boolean;     // implement your own code to turn your device on/off
    this.platform.log.info('Set Characteristic On ->', value);
  }

  async getOn(): Promise<CharacteristicValue> {
    const isOn = this.exampleStates.On;          // implement your own code to check if the device is on
    this.platform.log.info('Get Characteristic On ->', isOn);
    return isOn;
  }

  async setBrightness(value: CharacteristicValue) {
    this.exampleStates.Brightness = value as number;
    this.platform.log.info('Set Characteristic Brightness -> ', value);
  }

  async energyRequest(){
    const url = 'http://192.168.1.123/monitorjson';
    const response = await got(url);

    console.log(response);
  }
}