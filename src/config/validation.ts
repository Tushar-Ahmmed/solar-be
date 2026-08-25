import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  CORS_ORIGINS: Joi.string().default(
    'http://localhost:3001,http://localhost:3002',
  ),
  SWAGGER_ENABLED: Joi.boolean().default(true),
});
