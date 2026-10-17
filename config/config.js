const dotenv = require('dotenv');
dotenv.config();
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require("winston-daily-rotate-file");
const { combine, timestamp, label, prettyPrint } = format;
let swaggerEnabled = process.env.SWAGGER_ENABLE ?? "true"
let PORT = process.env.PORT || 9000
const path = require('path');

const transport = new DailyRotateFile({
  filename: "logs/log-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: "50",
  extension: ".json"
});

const logger = createLogger({
  format: combine(
    label({ label: "keda-worker-service" }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json(),
    // prettyPrint(), this will print logs in multiple lines in log workspace
    format.colorize()
  ),
  transports: [
    transport,
    new transports.Console()
  ]
});

const opt = {
  customSiteTitle: "keda-worker-service",
  customCss: ".swagger-ui .topbar {background-color:rgb(19, 53, 223)}",
  customfavIcon: "../images/casacloud.png",
}
console.log(__dirname+"/../dist/src/routes"); 
const options = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: "keda-worker-service",
      version: "01.00.00",
      description: "Health API for the KEDA worker service",
    },
    host: "localhost",
    basePath: "/",
    produces: ["application/json"],

    security: [
      { bearerAuth: [] },
    ],
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  // apis: ["../../**/*.yaml"],
  apis: [__dirname+"/../dist/src/routes/*.js"],
};

let config = {
  "PORT": PORT,
  "swaggerOptions": opt,
  "swaggerJSdocsOptions": options,
  swaggerEnabled,
  logger
}

module.exports = config;
