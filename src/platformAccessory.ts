
/* eslint-disable no-console */

//   Accessory control logic belongs in here

import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';
import { ExampleHomebridgePlatform } from './platform';
import fetch from 'node-fetch';

export class ExamplePlatformAccessory {                                                         // Define Class
  private service: Service;
  private exampleStates = {
    On: false,
    Brightness: 100,
  };

  constructor(                                                                                 // Class Constructor
    private readonly platform: ExampleHomebridgePlatform,
    private readonly accessory: PlatformAccessory,
  ) {
    // set accessory information
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer')
      .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');


    // get the LightBulb service if it exists, otherwise create a new LightBulb service
    this.service = this.accessory.getService(this.platform.Service.Lightbulb) || this.accessory.addService(this.platform.Service.Lightbulb);


    // set the service name, this is what is displayed as the default name on the Home app
    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.exampleDisplayName);


    // register handlers for the On/Off Characteristic
    this.service.getCharacteristic(this.platform.Characteristic.On)
      .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
      .onGet(this.getOn.bind(this));               // GET - bind to the `getOn` method below

    // register handlers for the Brightness Characteristic
    this.service.getCharacteristic(this.platform.Characteristic.Brightness)
      .onSet(this.setBrightness.bind(this));       // SET - bind to the 'setBrightness` method below


    // Other code and stuff

    let lightOn = false;

    setInterval(() => {
      lightOn = !lightOn;            // EXAMPLE - inverse the trigger
      //this.service.updateCharacteristic('Meter 1' );
      this.platform.log.debug('Triggering meter1 lightOn :', lightOn);


    }, 10000);


    setInterval(() => {
      console.log('Request Energy Meter Data');
      this.meterGet().then(
        (value) => {
          //console.log('Result: ', value);
          console.log('Voltage:', value.Data[0]);
          console.log('Current:', value.Data[1]);
          console.log('Active Power:', value.Data[2]);
          console.log('Import Power:', value.Data[3]);
          console.log('Export Power:', value.Data[4]);
        },
        (error) => {
          console.log('Error: ', error);
        },
      );
    }, 120000);                                                       // check every 2 minutes

  }

  // Now define Class methods

  async setOn(value: CharacteristicValue) {                           // Method setOn
    this.exampleStates.On = value as boolean;                         // implement your own code to turn your device on/off
    this.platform.log.info('1. Set Characteristic On ->', value);
  }

  async getOn(): Promise<CharacteristicValue> {                       // Method getOn
    const isOn = this.exampleStates.On;                               // implement your own code to check if the device is on
    this.platform.log.info('2. Get Characteristic On ->', isOn);
    return isOn;
  }

  async setBrightness(value: CharacteristicValue) {                   // Method setBrightness
    this.exampleStates.Brightness = value as number;
    this.platform.log.info('3. Set Characteristic Brightness -> ', value);
  }

  async meterGet(){                                                   // Method meterGet - Get JSON data from Meter
    // const url = 'http://192.168.1.123/monitorjson';
    const response = await fetch('http://192.168.1.123/monitorjson',
      {headers: {'Authorization': 'Basic ' + btoa('admin:admin')}});
    const body = await response.json();

    return body;
  }
}





