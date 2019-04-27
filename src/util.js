import config from './config';

export const generateRandomState = (length) => {
  let state = '';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      + 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) {
      state += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return state;
};

export const getGithubAuthUrl = (path) => `${config.github.authBaseUrl}${path}`;
export const getClientUrl = (path) => `${config.client.baseUrl}${path}`;
export const getHostUrl = (path) => `${config.host.baseUrl}:${config.host.port}${path}`;