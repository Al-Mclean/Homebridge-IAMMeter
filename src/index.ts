/* eslint-disable no-console */

import { API } from 'homebridge';
import { PLATFORM_NAME } from './settings';
import { ExampleHomebridgePlatform } from './platform';

/**
 * This method registers the platform with Homebridge
 */
export = (api: API) => {
  api.registerPlatform(PLATFORM_NAME, ExampleHomebridgePlatform);
};

console.log('IAMMeter output test - 1');

