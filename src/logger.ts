import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf } = format;

const myFormat = printf(({ timestamp, level, message }) => {
  return process.env.NODE_ENV === "development"
    ? `${timestamp} ${level}: ${message}`
    : `${level}: ${message}`;
});

const logger = createLogger({
  format: combine(format.colorize(), timestamp(), myFormat),
  transports: [new transports.Console()],
});

export default logger;
