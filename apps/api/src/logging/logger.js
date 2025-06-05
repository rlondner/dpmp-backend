
// import pino from 'pino';
// const __dirname = import.meta.dirname;


// const fileTransport = pino.transport({
//   target: 'pino/file',
//   options: { destination: `${__dirname}/app.log` },
// });


// const logger = pino({
//   level: process.env.PINO_LOG_LEVEL || 'info',
//   formatters: {
//     bindings: (bindings) => {
//       return { pid: bindings.pid, host: bindings.hostname, node_version: process.version };
//     },
//     level: (label) => {
//       return { level: label.toUpperCase() };
//     },
//   },
//   //timestamp: pino.stdTimeFunctions.isoTime,
//   timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
// },
// fileTransport
// );

// export default logger;

import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.WINSTON_LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
  exitOnError: false
});

export default logger;


