import winston from "winston";

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "black",
    error: "red",
    warning: "yellow",
    info: "green",
    http: "blue",
    debug: "magenta",
  },
};

let logger;

if (process.env.ENVIRONMENT === "production") {
  logger = winston.createLogger({
    levels: customLevels.levels,
    level: "info",
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevels.colors }),
          winston.format.simple()
        ),
      }),
      new winston.transports.File({
        level: "error",
        filename: "./src/logs/errors.log",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.prettyPrint()
        ),
      }),
    ],
  });
}

if (process.env.ENVIRONMENT === "development") {
  logger = winston.createLogger({
    levels: customLevels.levels,
    level: "debug",
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevels.colors }),
          winston.format.simple()
        ),
      }),
    ],
  });
}

export default logger;
