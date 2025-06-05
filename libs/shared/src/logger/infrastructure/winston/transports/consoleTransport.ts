 

import * as winston from 'winston';

import { LogLevel } from '@nestjs-logger/shared/logger/domain/log';

 

enum LogColors {

  red = '\x1b[31m',

  green = '\x1b[32m',

  yellow = '\x1b[33m',

  blue = '\x1b[34m',

  magenta = '\x1b[35m',

  cyan = '\x1b[36m',

  pink = '\x1b[38;5;206m',

}

 

interface LogData {

  label?: string;

  correlationId?: string;

  sourceClass?: string;

  error?: string;

  durationMs?: number;

  stack?: string;

  props?: Record<string, unknown>;

}

 

export default class ConsoleTransport {

  public static createColorize() {

    return new winston.transports.Console({

      format: winston.format.combine(

        winston.format.printf((log) => {

          const color = this.mapLogLevelColor(log.level as LogLevel);

          const data = log.data as LogData;

 

          if (data.label) {

            const prefix = `[${data.label}]`;

            return `${this.colorize(color, prefix + '  -')} ${log.timestamp}    ${data.correlationId

                ? `(${this.colorize(LogColors.cyan, data.correlationId)})`

                : ''

              } ${this.colorize(color, log.level.toUpperCase())} ${data.sourceClass

                ? `${this.colorize(LogColors.cyan, `[${data.sourceClass}]`)}`

                : ''

              } ${this.colorize(

                color,

                log.message + ' - ' + (data.error ?? ''),

              )}${data.durationMs !== undefined

                ? this.colorize(color, ' +' + data.durationMs + 'ms')

                : ''

              }${data.stack ? this.colorize(color, `  - ${data.stack}`) : ''

              }${data.props

                ? `\n  - Props: ${JSON.stringify(data.props, null, 4)}`

                : ''

              }`;

          }

 

          return '';

        }),

      ),

    });

  }

 

  private static colorize(color: LogColors, message: string): string {

    return `${color}${message}\x1b[0m`;

  }

 

  private static mapLogLevelColor(level: LogLevel): LogColors {

    switch (level) {

      case LogLevel.Debug:

        return LogColors.blue;

      case LogLevel.Info:

        return LogColors.green;

      case LogLevel.Warn:

        return LogColors.yellow;

      case LogLevel.Error:

        return LogColors.red;

      case LogLevel.Fatal:

        return LogColors.magenta;

      case LogLevel.Emergency:

        return LogColors.pink;

      default:

        return LogColors.cyan;

    }

  }

}