module.exports = function () {
  const app = require('express')();
  const bodyParser = require('body-parser')
  const axios = require('axios');
  
  // parsing json 
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  return app;
}

