var axios = require('axios');
var express = require('express');

var app = express();

app.get('/', (req, res) => {
  axios({
    url: 'https://github.com/login/oauth/authorize',
    method: 'get',
    data: {
      client_id: 29259
    }
  }).then(response => {
    res.send(response.data);
  })
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});