/* eslint-disable no-console */

import { API } from 'homebridge';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PLATFORM_NAME } from './settings';
import { ExampleHomebridgePlatform } from './platform';

/**
 * This method registers the platform with Homebridge
 */
export = (api: API) => {
  api.registerPlatform('homebridge-plugin-iammeter', ExampleHomebridgePlatform);
};

// console.log('IAMMeter output test - 1');

// Complete (I think)