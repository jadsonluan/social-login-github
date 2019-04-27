import 'dotenv/config';

const config = {};

config.client = {
  baseUrl: 'http://localhost:8080',
  successPath: '/auth',
  errorPath: '/error'
}

config.host = {
  baseUrl: 'http://localhost',
  port: 3000,
  production: process.env.NODE_ENV === 'production',
}

config.github = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  authBaseUrl: 'https://github.com/login/oauth',
  redirectUrl: '/auth/callback',
}

export default config;