const pm2 = require('pm2');
const pmx = require('pmx');
const sentry = require("@sentry/node");

const conf = pmx.initModule();

pm2.Client.launchBus(function (err, bus) {
    sentry.init({
        dsn: conf.sentry_dsn,
        environment: conf.environment,
    });

    const trackedApps = (conf.apps || "").split(",");

    if (err)
        return console.error(err);
    bus.on('log:*', function (type, packet) {
        if (trackedApps.length && !trackedApps.includes(packet.process.name)) {
            return false;
        }

        sentry.withScope((scope) => {
            const data = JSON.parse(packet.data || "");
            scope.setUser(data.user || {});
            scope.setTags(data.tags || {});
            scope.setExtras(data.extras || {});
            scope.setFingerprint(data.fingerprint || ["{{ default }}"]);
            (data.breadcrumbs || []).forEach((b) => {
                scope.addBreadcrumb(b);
            });
            const eventId = sentry.captureMessage(data.msg || "<no message>", data.level || sentry.Severity.Debug);
        });
    });
});
