# Beacons Prototype RESTful Service

This service aims to provide a simple RESTful JSON interface for beacons to report their status, including location.
It will reply with relevant status information used to update the beacon's light and internal state.


## Installation

This assumes you've already set up a Linux machine with Node and Postgres (See `docs` for those setup guides, specifically [vagrant](docs/vagrant.md) for development)

* `npm install`
* (Optional for Dev) Create a `development.yaml` in the `config` folder containing any values unique to your development environment
* (For Production) Create a `production.yaml` in the `config` folder containing any values unique to your production environment (database credentials, etc)

NOTE: Do NOT add your development.yaml or production.yaml file to Git as it can leak sensitive credentials


## Running

`npm start`


## Usage

The service is set up to read the standard webhook format set out by Particle (https://docs.particle.io/guide/tools-and-features/webhooks/)

Simply send it your latitude and longitude as a string separated by a comma in the data field.

```
POST /webhook/location
{
    "event": "location",
    "data": "49.9019344,-119.4945467",
    "published_at": "YYYY-MM-DDTHH:mm:ssZ",
    "coreid": "beacon_id"
}
```

### Sample Responses

Matched and within 5 meters:

```
{
  "data": "255,255,0,100"
}
```

Matched and greater than 200 meters, but less than 250:

```
{
  "data": "255,255,0,20"
}
```

No matched beacons:

```
{
  "data": "0,0,255,20"
}
```

Out of bounds:

```
{
  "data": "255,0,0,100"
}
```


### TODO

* Simulated beacons for testing
* Polygon based boundaries (Using PostGIS instead of earthdistance lat/lng rectangles)
* Only match beacons within same boundary as source beacon (Right now you need to be in bounds to match, but it will match any beacons within 250m regardless of them being within your boundary)
* More test cases

## Testing

First time: Ensure you've installed the global dependencies for testing:

```
npm install -g ava nyc
```

`npm test` to run tests and coverage.

To generate an HTML coverage report of tests run `npm run report`


## License

MIT License - See [LICENSE](LICENSE) file