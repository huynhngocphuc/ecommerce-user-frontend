const ENV = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL ?? '',
  APP_ENV: process.env.REACT_APP_ENV_NAME ?? process.env.NODE_ENV ?? 'development',
};
console.log(ENV.APP_ENV);
if (!ENV.API_BASE_URL) {
  throw new Error('Missing REACT_APP_API_BASE_URL in environment variables.');
}

export const getApiBaseUrl = (): string => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  if (!baseUrl) {
    throw new Error('REACT_APP_API_BASE_URL is not defined. Please check your .env file.');
  }
  return baseUrl;
};

export default ENV;
