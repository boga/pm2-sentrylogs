# pm2-sentrylogs
PM2 module to send logs to Sentry

#### Options:
- sentry_dsn: DNS of Sentry instance (something like `https://<code>@<hostname>/<projectId>`, for Sentry.io it can be found on https://sentry.io/settings/minglechain/projects/<project-name>/keys/);
- apps: comma-separated list of applications which logs should be send to Sentry; apps names can be retrieved from first column in `pm2 ls` table.

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

#### Installation
```bash
pm2 install boga/pm2-sentrylogs
pm2 set pm2-sentrylogs:sentry_dsn 'https://thisisnotactualid@sentry.io/4815162342' 
pm2 set pm2-sentrylogs:apps 'myapp'
```
