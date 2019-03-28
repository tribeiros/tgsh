const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const shell = require('shelljs')
const fs = require('fs');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.post('/msg', function(req, res) {
  const now = new Date();
  const apiTelegram = 'https://api.telegram.org'
  const botTelegram = '643418145:AAEp5uWzantnnqaudhSmitkLCq9q1J6F42Y' //newversiontgshbot 
  var { message } = req.body
  
  try {
  fs.writeFile('log', `User: ${message.from.username} , ${message.from.first_name} ${message.from.last_name} | ID: ${message.from.id}\n${now}\ncommand: ${message.text}`, { flag: 'a+' }, (err) => {})
  //file written successfully
} catch (err) {
  console.error(err)
}
  
  function finished(err){
    console.log('all set on db.');
  }
                
  if (message.text === undefined || message.text === "/"){
    message.text = "undefined"
  }
  console.log("")
  console.log(`User: ${message.from.username} , ${message.from.first_name} ${message.from.last_name} | ID: ${message.from.id}`)
  console.log(`Date: ${now}`)
  console.log("")
  
  message.text = message.text.replace(/\//, "")
  var botCommands = message.text.split(" ");
  console.log(`command: ${botCommands}`)
  

  axios
    .post(
      `${apiTelegram}/bot${botTelegram}/sendMessage`,
      {
        chat_id: message.chat.id,
        text: message.text
      }
    )
    .then(response => {
      console.log('')
      console.log('Message posted on telegram chat')
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
      res.end('ok')
    })
    .catch(err => {
      console.log('Error :', err)
      res.end('Error :' + err)
    })
})

// api server
app.listen(3000, function() {
  console.log('tgsh api listening on port 3000!')
})