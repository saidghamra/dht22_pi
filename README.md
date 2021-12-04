# Overview

A simple express node project that exposes a `/metrics` endpoint with temperature and humidity read from a DHT22 sensor connected to a Raspberry Pi. The project also comes with a Docker Compose stack containing the node project container, Prometheus and Grafana.

Prometheus is configured to scrape the `/metrics` endpoint every 5 seconds. Grafana is also pre-configured with a default dashboard that displays the current temperature and humidity. Additionally, the dashboard also displays the temperature and humidity over the specified time range.

![Default Grafana Dashboard](https://user-images.githubusercontent.com/35788699/144727430-bc03b220-2ab2-4907-9674-192223df10a1.png)

# Requirements

- Docker
- Docker-compose

## Set Up

1. Clone the repository: `git clone https://github.com/saidghamra/dht22_pi.git`
2. Change directories: `cd dht22_pi`
3. Spin up the stack: `docker-compose up -d`
4. View the default Grafana dashboard by navigating to [this URL](http://localhost:3000/d/e2IlAVh7k/temperature-and-humidity?orgId=1)
