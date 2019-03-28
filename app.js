// tgsh script
// dependencies
const app = require('./config/express')();
const receiveMessage = require('./app/routes/receiveMessage')(app);

// api server
app.listen(3000, function() {
  console.log('tgsh api listening on port 3000!')
})