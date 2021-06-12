var sensor = require("node-dht-sensor");

const config = {
    sensor: {
        // DHT22 Sensor
        type: 22,
        // GPIO15 (Hardware Pin 10)
        dataPin: 15,
        // Polling Interval (In ms)
        pollingInterval: 2500

    }
}

function readSensor() {
    sensor.read(config.sensor.type, config.sensor.dataPin, (err, temperature, humidity) => {
        if (err) {
            console.log(`Error reading sensor data:`, err);
        } else {
            console.log(`Temperature: ${temperature.toFixed(1)}°C`, `\nHumidity: ${humidity.toFixed(1)}%`, '\n');
        }
        setTimeout(readSensor, config.sensor.pollingInterval);
    });
}

setTimeout(readSensor, config.sensor.pollingInterval);