# pm2-sentrylogs
PM2 module to send logs to Sentry

Options:
- sentry_dsn: DNS of Sentry instance (something like `https://<code>@<hostname>/<projectId>`, for Sentry.io it can be found on https://sentry.io/settings/minglechain/projects/<project-name>/keys/);
- apps: comma-separated list of applications which logs should be send to Sentry.

Log should be JSON with this structure: 
```json
{
  "breadcrumbs": [
    {
      "category": "auth",
      "message": "Authenticated user user@domain.net",
      "level": 10
    },
    {
      "category": "db",
      "message": "Executed select query",
      "level": 20
    }
  ],
  "extra": {
    "firstVar": 12,
    "secondVar": false     
  },
  "fingerprint": [
    "{{ default }}",
    "signin",
    "checkUserInDb"
  ],
  "tags": {
    "requestId": 2128506,
    "os": "Android",
    "osVersion": "4.0.4"
  },
  "user": {
    "id": 1,
    "ip": "192.168.42.18"
  }
}
```
See https://docs.sentry.io/enriching-error-data for details
