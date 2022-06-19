import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => ({
  uri: await getMongoString(configService),
  dbName: configService.get('MONGO_DATABASE'),
  authSource: configService.get('MONGO_AUTHDB') ?? 'admin',
});

const getMongoString = async (configService: ConfigService): Promise<string> =>
  'mongodb://' +
  configService.get('MONGO_USERNAME') +
  ':' +
  configService.get('MONGO_PASSWORD') +
  '@' +
  configService.get('MONGO_HOST') +
  ':' +
  configService.get('MONGO_PORT');
