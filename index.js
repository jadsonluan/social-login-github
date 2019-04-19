var axios = require('axios');
var fs = require('fs');
var express = require('express');

var app = express();
const client_id = 'Iv1.5110000ec4e59088';
const client_secret = '7606b76bf217c9db8e15b80d80d183d9ff955f79';

app.set("view options", {layout: false});
app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.render('index.html');
});

function requestUser(token) {
  return axios({
    url: 'https://api.github.com/user',
    method: 'GET',
    headers: {
      Authorization: `token ${token}`
    }
  });
}

function processUser(data, res) {
  const { avatar_url, login } = data;
  var template = `
    <h1>Bem vindo, ${login}</h1>
    <img src='${avatar_url}';> 
  `;
  res.send(template);
}

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
    var first_element = (response.data.split("&"))[0];
    var access_token = (first_element.split("="))[1];
    console.log(access_token);

    requestUser(access_token)
    .then(r => {
      processUser(r.data, res);
    })
  })
})

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});