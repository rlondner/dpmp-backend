import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ClassConstructor } from 'class-transformer/types/interfaces';
//import Logger, { LoggerKey } from '@nestjs-logger/shared/logger/domain/logger';

function validateConfig<T extends object>(
  config: Record<string, unknown>,
  envVariablesClass: ClassConstructor<T>,
) {
  //this.logger.startProfile('validateConfig');
  //console.log('Validating environment variables with class-validator...');
  //console.log('NODE_ENV:', config.NODE_ENV);
  //console.log('FILE_DRIVER:', config.FILE_DRIVER);
  // console.log('ACCESS_KEY_ID:', config.ACCESS_KEY_ID);
  //console.log(${process.cwd()}/${process.env.NODE_ENV}.env);
  const validatedConfig = plainToClass(envVariablesClass, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export default validateConfig;
