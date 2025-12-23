# pubip

A lightweight Cloudflare Worker that returns the user's public IP address in
JSON format.

https://ip.sigmasd.workers.dev/

## Features

- **Fast & Simple**: Minimal logic for maximum performance.
- **JSON API**: Endpoint at `/api` returns `{"ip": "..."}`.
- **Documentation**: Root path `/` serves a clean HTML documentation page.
- **CORS Support**: Accessible from any domain.

## API Usage

### GET /api

Returns the public IP address of the requester.

**Response:**

```json
{
  "ip": "203.0.113.42"
}
```

## License

MIT
