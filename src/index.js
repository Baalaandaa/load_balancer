const express = require('express');
const instance_controller = require('./instance_controller')
const proxy = require('express-http-proxy');
const app = express();

instance_controller.load();

app.use(async (req, res, next) => {
    const instance = instance_controller.getInstance();

    instance.activeRequests++;
    res.on("finish", () => {
        instance.activeRequests--;
    })

    proxy(instance.address, {
        proxyErrorHandler: function(err, res) {
            if (err) {
                instance_controller.remove(instance);
            }
            res.status(500);
        }
    })(req, res, next);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Load balancer started on port ${port}`);
});