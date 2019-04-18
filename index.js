const axios = require('axios');
var data;
axios({
  url: 'https://github.com/login/oauth/authorize',
  method: 'get',
  data: {
    client_id: 29259
  }
}).then(r => console.log(r));