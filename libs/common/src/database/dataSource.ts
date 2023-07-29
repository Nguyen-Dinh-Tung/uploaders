import { DataSource } from 'typeorm';
import { makeTypeormOptions } from './options';

const datasource = new DataSource({
  ...makeTypeormOptions(),
  logging: true,
  entities: ['libs/core/src/entities/*.ts', 'apps/**/entities/*.ts'],
});
export default datasource;
