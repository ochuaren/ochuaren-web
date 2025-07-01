import Joi from "joi";

interface IStrapiConfig {
  apiUrl: string;
  authToken: string;
}

const schema = Joi.object<IStrapiConfig>({
  apiUrl: Joi.string().required(),
  authToken: Joi.string().required(),
});

const config: IStrapiConfig = {
  apiUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL ?? '',
  authToken: process.env.NEXT_PUBLIC_STRAPI_AUTH_TOKEN ?? ''
};

export const strapiConfig = <IStrapiConfig>(
  schema.validate(config, { abortEarly: true }).value
);
