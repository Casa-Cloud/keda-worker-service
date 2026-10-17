import express from "express";
import * as path from "path";
import swaggerUi from "swagger-ui-express";
const swaggerJsdoc = require("swagger-jsdoc");
const config = require("../../config/config.js");
import { ResponseMessage } from "./common/responseMessage";
import { HealthRouter } from "./routes/healthRouter";
const app: any = express();
app.use(express.json({ limit: "50mb" }));

// const { createLogger, format, transports } = require("winston");
// const { combine, timestamp, label, prettyPrint } = format;

app.use((req: any, res: any, next: any) => {
  res.locals.logger = config.logger;
  next();
});

app.use((req: any, res: any, next: any) => {
  res.locals.requestId = Math.floor(100000 + Math.random() * 900000);
  res.locals.logger.info(req.originalUrl, { requestId: res.locals.requestId });
  res.locals.logger.info("new request", {
    requestId: res.locals.requestId,
    originalUrl: req.originalUrl,
    Method: req.method
  });
  next();
});

const responseMessage = new ResponseMessage();
app.use( (req: any, res: any, next: any) => {
  res.locals.responseMessage = responseMessage;
  next();
});

/* Routers */
const healthRouter = new HealthRouter();
app.use("/helath", healthRouter.healthRoute);

/* Swagger */
const swaggerPath = "/api-docs";
config.logger.info("config.swaggerEnabled - ", config.swaggerEnabled);
if (config.swaggerEnabled === "true") {
  config.logger.info("Swagger UI Enabled");
  const specs = swaggerJsdoc(config.swaggerJSdocsOptions);
  app.use(swaggerPath,
    swaggerUi.serve, swaggerUi.setup(specs, config.swaggerOptions));
}

async function main() {
  try {
    /* Start server */
    const server = app.listen(config.PORT, async () => {
      config.logger.info("Server is listning in port", {port: config.PORT});
      config.logger.info(`Server is listning in port ${config.PORT}`);
      if (config.swaggerEnabled === "true") {
        config.logger.info(`Swagger docs available at http://localhost:${config.PORT}${swaggerPath}`);
      }
    });
    server.keepAliveTimeout = config.keepAliveTimeout;
  } catch (er) {
    config.logger.info("Global Error: " + er);
    return er;
  }
}

main();
