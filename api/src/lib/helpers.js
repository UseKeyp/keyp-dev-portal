export const isDevelopment =
  ['local', 'dev', 'sandbox'].includes(process.env.ENVIRONMENT) ||
  process.env.NODE_ENV == null

export const isProduction = !isDevelopment

export const cors = {
  origin: isProduction
    ? process.env.APP_DOMAIN
    : [
        'http://0.0.0.0:8910',
        'http://localhost:8910',
        'http://localhost',
        'http://10.0.2.2:8910',
      ],
  credentials: true,
}

let appDomain = process.env.APP_DOMAIN
if (process.env.VERCEL) {
  appDomain = `https://${process.env.VERCEL_URL}`
}
export const APP_DOMAIN = appDomain
