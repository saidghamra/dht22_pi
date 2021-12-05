const sensor = require("node-dht-sensor").promises;
const promClient = require('prom-client');
const express = require('express');
const app = express();

// ### Configuration ###

const config = {
    app: {
        port: 80
    },
    sensor: {
        // DHT22 Sensor
        type: 22,
        // GPIO15 (Hardware Pin 10)
        dataPin: 15

    }
}

// ### Prometheus ###

const clientRegistry = new promClient.Registry();
clientRegistry.setDefaultLabels({ app: 'dht22_pi' });

const temperatureGauge = new promClient.Gauge({
    name: 'dht22_temperature',
    help: 'Raspberry pi DHT22 temperature',
    async collect() {
        const temperature = (await readSensor()).temperature;
        this.set(temperature);
    }
});

const humidityGauge = new promClient.Gauge({
    name: 'dht22_humidity',
    help: 'Raspberry pi DHT22 humidity',
    async collect() {
        const humidity = (await readSensor()).humidity;
        this.set(humidity);
    }
});

clientRegistry.registerMetric(temperatureGauge);
clientRegistry.registerMetric(humidityGauge);

// ### DHT22 Sensor ###

const cachedReadings = { temperature: 0, humidity: 0 };

async function readSensor() {
    try {
        const {  temperature, humidity } = await sensor.read(config.sensor.type, config.sensor.dataPin);
        console.log(`Temperature: ${temperature}°C`, `\nHumidity: ${humidity}%`, '\n');
        // Update the cached readings
        cachedReadings.temperature = temperature;
        cachedReadings.humidity = humidity;
        return cachedReadings;
    } catch (err) {
        console.log(`Error reading sensor data:`, err);
        // If there is an error, return the latest cached temperature and humidity readings
        return cachedReadings;
    }
}

// ### Express Metrics API ###

app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', clientRegistry.contentType);
    const metrics = await clientRegistry.metrics();
    res.send(metrics);
});

app.listen(config.app.port, () => {
    console.log(`✅ App running on port ${ config.app.port }`);
});
