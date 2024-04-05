/**
 * Required Declarations
 */
const logsConfig = require('../../env.json')[process.env.NODE_ENV || 'local'];

// @Setting up logger
const opts = {
  logDirectory: logsConfig.MARKETPLACE_LOG_DIR_PATH,
  fileNamePattern: 'dms-server-secondary.log',
  dateFormat: 'YYYY.MM.DD',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
};

const logger = require('simple-node-logger').createRollingFileLogger(opts);
logger.setLevel(logsConfig.LOG_LEVEL);

/**
 * Exporting logger as a service.
 */
exports.log = (fileName, methodName, msg, consoleEnable) => {
  const msgBody = `File: ${fileName}, Method: ${methodName}, Message: ${msg}`;
  console.log(logsConfig.MARKETPLACE_LOG_DIR_PATH);
  console.log(
    'LOG_LEVEL======================================',
    logsConfig.LOG_LEVEL,
  );
  switch (logsConfig.LOG_LEVEL) {
    case 'debug':
      logger.debug(msgBody);
      break;
    case 'warn':
      logger.warn(msgBody);
      break;
    default:
      logger.log(msgBody);
  }
  if (consoleEnable) {
    console.log(msgBody);
  }
};
exports.warn = (fileName, methodName, msg, consoleEnable) => {
  const msgBody = `File: ${fileName}, Method: ${methodName}, Message: ${msg}`;
  logger.warn(msgBody);
  if (consoleEnable) {
    console.log(msgBody);
  }
};

exports.debug = (msg, consoleEnable) => {
  logger.debug(msg);
  if (consoleEnable) {
    console.log(msg);
  }
};

exports.info = (msg, consoleEnable) => {
  logger.info(msg);
  if (consoleEnable) {
    console.log(msg);
  }
};
exports.fatal = (msg, consoleEnable) => {
  logger.fatal(msg);
  if (consoleEnable) {
    console.log(msg);
  }
};
exports.error = (msg, consoleEnable) => {
  logger.error(msg);
  if (consoleEnable) {
    console.log(msg);
  }
};
