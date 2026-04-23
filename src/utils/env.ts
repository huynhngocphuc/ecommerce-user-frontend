const APP_ENV = process.env.REACT_APP_ENV_NAME ?? process.env.NODE_ENV ?? 'development';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '';

if (!API_BASE_URL) {
  console.error('Missing REACT_APP_API_BASE_URL in environment variables.');
}

const isLocalHostName = (hostname: string): boolean => {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
};

const resolveApiSecurityPolicy = (apiBaseUrl: string, appEnv: string) => {
  try {
    const parsed = new URL(apiBaseUrl);
    const protocol = parsed.protocol.replace(':', '').toLowerCase();
    const isHttps = protocol === 'https';
    const isDevLikeEnv = ['development', 'dev', 'local', 'test'].includes(appEnv.toLowerCase());
    const allowInsecureLocalApi = isDevLikeEnv && isLocalHostName(parsed.hostname);
    const isAllowed = isHttps || allowInsecureLocalApi;

    return {
      protocol,
      isAllowed,
      allowInsecureLocalApi,
      reason: isAllowed
        ? null
        : `Insecure API base URL is blocked (${apiBaseUrl}). Production and non-local environments require HTTPS.`,
    };
  } catch {
    return {
      protocol: 'unknown',
      isAllowed: false,
      allowInsecureLocalApi: false,
      reason: `Invalid REACT_APP_API_BASE_URL: ${apiBaseUrl}`,
    };
  }
};

const apiSecurityPolicy = resolveApiSecurityPolicy(API_BASE_URL, APP_ENV);

const ENV = {
  API_BASE_URL,
  APP_ENV,
  API_PROTOCOL: apiSecurityPolicy.protocol,
  ALLOW_INSECURE_LOCAL_API: apiSecurityPolicy.allowInsecureLocalApi,
  IS_API_BASE_URL_ALLOWED: apiSecurityPolicy.isAllowed,
  API_SECURITY_REASON: apiSecurityPolicy.reason,
};

export const getApiBaseUrl = (): string => ENV.API_BASE_URL;

export default ENV;
