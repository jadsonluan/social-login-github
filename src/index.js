import 'dotenv/config';
import axios from 'axios';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());

const client_id = `${process.env.CLIENT_ID}`;
const client_secret = `${process.env.CLIENT_SECRET}`;
let token;

app.get('/auth', function(req, res) {
  const { code } = req.query;
  axios({
    url: 'https://github.com/login/oauth/access_token',
    method: 'POST',
    params: {
      client_id,
      client_secret,
      code
    }
  }).then(response => {
    let first_element = (response.data.split("&"))[0];
    let access_token = (first_element.split("="))[1];
    token = access_token;
    res.redirect("http://localhost:8080/auth/");
  })
})

app.get('/token', function(req, res) {
  res.json({'token': token})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

