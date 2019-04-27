import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import querystring from 'querystring';
import request from 'request';
import cookieParser from 'cookie-parser';
import config from './config';
import {
  generateRandomState,
  getClientUrl,
  getGithubAuthUrl,
  getHostUrl
} from './util';

const app = express();
app.use(cors());
app.use(cookieParser());

const stateKey = 'github-auth-state';

app.get('/login', function(req, res) {
  const state = generateRandomState(16);
  res.cookie(stateKey, state);
  res.redirect(getGithubAuthUrl("/authorize?")
    + querystring.stringify({
      client_id: config.github.clientId,
      redirect_uri: config.github.redirectUri,
      state
    })
  );
})

app.get('/auth/callback', function(req, res) {
  const { state } = req.query;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  if (!state || state !== storedState) {
    res.send("Error: state_mismatch");
  } else {
    requestForGithubUserToken(req, res);
  }
})

const requestForGithubUserToken = (req, res) => {
  res.clearCookie(stateKey);
  const { code } = req.query;

  const requestOptions = {
    url: '',
    json: true,
    form: {
      code,
      redirect_uri: getHostUrl(config.github.redirectUri),
      client_id: config.github.clientId,
      client_secret: config.github.clientSecret
    }
  }

  request.post(requestOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.redirect(getClientUrl(config.client.successPath + '/' + body.access_token));
    } else {
      res.send(JSON.stringify(error));
    }
  });
}

app.get('/clean', (req, res) => { res.clearCookie(stateKey); res.send('ok');})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

