# Tungsten

An API server for storing and streaming video

https://tungsten-api.podter.me

## Documentation

API documentation can be found [here](https://tungsten-api.podter.me/docs).

## Deployment

Quickest way to deploy this is clone this repository, then use Docker Compose to get the app up and running:

```bash
docker compose up -d --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

First, get all required services up and running:

```bash
bun docker:up
```

Then, run the development server:

```bash
bun dev
```

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more information.
