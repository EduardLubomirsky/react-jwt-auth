import { createLogger, transports } from "winston";
import "winston-daily-rotate-file";
import Environment from "environment";
const dailyRotateTransport = new transports.DailyRotateFile({
  filename: "application-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d"
});
dailyRotateTransport.on("rotate", function() {
  // do something fun
});
const combinedTransports =
  Environment.nodeEnv !== "production"
    ? [dailyRotateTransport, new transports.Console()]
    : [new transports.Console()];
const logger = createLogger({
  transports: combinedTransports
});

export const logError = (message: string) => {
  logger.error(message);
};

export const logInfo = (message: string) => {
  logger.info(message);
};
