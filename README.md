
<p align="center">

<img src="https://github.com/homebridge/branding/raw/master/logos/homebridge-wordmark-logo-vertical.png" width="150">

</p>


# IAMMeter HomeBridge Plug-in

IAMMeter provide single and three phase power meters which are bi-directional (i.e. capable of measuring both forward / Grid and reverse/ export power). These devices are suited to monitoring power consumption and export for sites equiped with grid connected solar systems.

This project will initially focus on only the single phase meter.

## About

Work in Progress

## Install Development Dependencies

TBA

```
npm install
```


## Configuration

edit your Homebridge's config.json to include the following in the accessories section:

        {
            "accessory": "IAMMeter Energy Meter",
            "name": "Energy Meter",
            "ip": "192.168.0.1"         
        },

* "name"              			The Homekit Accessory Name.



