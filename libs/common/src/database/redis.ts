export const redisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: +(process.env.REDIS_PORT || '6379'),
  keyPrefix: 'artv3',
};

export const redisJobDb = 1;
export const redisLegecyDb = 2;
