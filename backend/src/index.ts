import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { setupRoutes } from "./routes/routerSetup.ts";
import envConfig from "./envconfig/envconfig.ts";

import { customLoggerInstance } from "./utils/customLogger.ts";

import type { Application as ExpressApplication } from "express";

/**
 * Instantiate, setup routes and return express app object
 * @returns express app isntance
 */
function getExpressApp(): ExpressApplication {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    setupRoutes(app);

    return app;
}

/**
 * Start running express aplication
 */
async function start() {
    const app = getExpressApp();

    const httpPort = envConfig.httpPort();

    app.listen(httpPort, "0.0.0.0", () => {
        customLoggerInstance.info(`Server running on port ${httpPort}`);
    });
}

start();
