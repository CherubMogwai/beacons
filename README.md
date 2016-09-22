# Beacons Prototype RESTful Service

This service aims to provide a simple RESTful JSON interface for beacons to report their status, including location.
It will reply with relevant status information used to update the beacon's light and internal state.


## Installation

This assumes you've already set up a Linux machine with Node and Postgres (See `docs` for those setup guides)

* `npm install`
* (Optional for Dev) Create a `development.yaml` in the `config` folder containing any values unique to your development environment
* (For Production) Create a `production.yaml` in the `config` folder containing any values unique to your production environment (database credentials, etc)

NOTE: Do NOT add your development.yaml or production.yaml file to Git as it can leak sensitive credentials

## Running

`npm start`

## Testing

First time: Ensure you've installed the global dependencies for testing:

```
npm install -g ava nyc
```

`npm test` to run tests and coverage.

To generate an HTML coverage report of tests run `npm run report`


## License

MIT License - See [LICENSE](LICENSE) file