// import logger from './logger.js';

// function alwaysThrowError() {
//   throw new Error('processing error');
// }

// try {
//   alwaysThrowError();
// } catch (err) {
//   logger.error(err, 'An unexpected error occurred while processing the request');
// }


import logger from './logger.js';

logger.error('error');
logger.warn('warn');
logger.info('info');
logger.verbose('verbose');
logger.debug('debug');
logger.silly('silly');
logger.log('error', 'error message');
logger.log('info', 'info message');
logger.log('info', process.env.WINSTON_LOG_LEVEL)

