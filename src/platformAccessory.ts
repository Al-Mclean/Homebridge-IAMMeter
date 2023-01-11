// Accessory control logic should go in here

/* eslint-disable no-console */
import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';
import { ExampleHomebridgePlatform } from './platform';

/**  Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */

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

    // register handlers for the On/Off Characteristic
    this.service.getCharacteristic(this.platform.Characteristic.On)
      .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
      .onGet(this.getOn.bind(this));               // GET - bind to the `getOn` method below

    // register handlers for the Brightness Characteristic
    this.service.getCharacteristic(this.platform.Characteristic.Brightness)
      .onSet(this.setBrightness.bind(this));       // SET - bind to the 'setBrightness` method below

    console.log('Done with this bit now ');

    let motionDetected = false;
    setInterval(() => {
      // EXAMPLE - inverse the trigger
      motionDetected = !motionDetected;
    }, 10000);
  }

  /** * Handle "SET" requests from HomeKit
   * These are sent when the user changes the state of an accessory, for example, turning on a Light bulb.
   */
  async setOn(value: CharacteristicValue) {
    // implement your own code to turn your device on/off
    this.exampleStates.On = value as boolean;

    this.platform.log.debug('Set Characteristic On ->', value);
  }

  async getOn(): Promise<CharacteristicValue> {
    // implement your own code to check if the device is on
    const isOn = this.exampleStates.On;

    this.platform.log.debug('Get Characteristic On ->', isOn);

    return isOn;
  }

  async setBrightness(value: CharacteristicValue) {
    // implement your own code to set the brightness
    this.exampleStates.Brightness = value as number;

    this.platform.log.debug('Set Characteristic Brightness -> ', value);
  }

}


// New section Starts here
/*

function EnergyMeter (log, config) {
  this.log = log;
  this.ip = config['ip'] || '127.0.0.1';
  this.url = 'http://' + this.ip + '/monitorjson';        // Update for IAMMeter JSON call

  this.displayName = config['name'];
  // this.timeout = config["timeout"] || 5000;
  // this.http_method = "GET";
  // this.update_interval = Number(config["update_interval"] || 10000);
  // this.debug_log = config["debug_log"] || false;
  this.use_pf = config['use_pf'] || false;
  this.debug_log = config['debug_log'] || false;

  // internal variables
  this.waiting_response = false;
  this.activePower = 0;
  this.importPower = 0;
  this.exportPower = 0;
  this.voltage1 = 0;
  this.ampere1 = 0;


}


// Update state function
EnergyMeter.prototype.updateState = function () {
  if (this.waiting_response) {
    this.log('Please select a higher update_interval value. Http command may not finish!');
    return;
  }
  this.waiting_response = true;
  this.last_value = new Promise((resolve, reject) => {
    const ops = {
      uri:		this.url,
      method:		this.http_method,
      timeout:	this.timeout,
    };
    this.log.info('Requesting energy values from IAMMeter ...');
    if (this.debug_log) {
      this.log('Requesting energy values from IAMMeter ...');
    }


    request(ops, (error, res, body) => {
      let json = null;
      if (error) {
        this.log('Bad http response! (' + ops.uri + '): ' + error.message);
      } else {
        try {
          json = JSON.parse(body);

          this.voltage1 = json.Data[0];
          this.ampere1 = json.Data[1];
          this.activePower = json.Data[3];
          this.importPower = json.Data[4];
          this.exportPower = json.Data[5];
          this.log.info('Successful http response. [ voltage: ' + this.voltage1.toFixed(0) + 'V, current: ' + this.ampere1.toFixed(1) );


          if (this.debug_log) {
            this.log('Successful http response. [ voltage: ' + this.voltage1.toFixed(0) );
          }
        } catch (parseErr) {
          this.log('Error processing data: ' + parseErr.message);
          error = parseErr;
        }
      }
      if (!error) {

        //resolve(this.powerConsumption, this.totalPowerConsumption, this.voltage1, this.ampere1);
      } else {
        reject(error);
      }
      this.waiting_response = false;
    });
  });

};

*/