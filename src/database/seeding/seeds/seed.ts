import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { User } from '../../entity/user.entity';
import { Book } from '../../entity/book.entity';
import { userFactory } from '../factories/user.factory';
import { bookFactory } from '../factories/book.factory';
import { MainSeeder } from './seeder.main';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const options: DataSourceOptions & SeederOptions = {
  type: 'mssql',
  host: `${process.env.DATABASE_HOST}`,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  database: `${process.env.DATABASE_NAME}`,
  entities: [User, Book],
  factories: [userFactory, bookFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
