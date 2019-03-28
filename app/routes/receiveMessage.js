module.exports = function(app){
  
  // receive message from telegam bot
  app.post('/receiveMessage', function(req, res) {
    const now = new Date();
    const apiTelegram = 'https://api.telegram.org'
    const botTelegram = '643418145:AAEp5uWzantnnqaudhSmitkLCq9q1J6F42Y' //newversiontgshbot 
    var { message } = req.body

    // logging
    console.log("")
    console.log(`User: ${message.from.username} , ${message.from.first_name} ${message.from.last_name} | ID: ${message.from.id}`)
    console.log(`Date: ${now}`)
    console.log("")
    
    // checking character received
    var botCommands = message.text.split(" ");
    console.log(`command: ${botCommands}`);

    // forbbiden
    forbbidens = [
                    'bash',
                    'ls',
                    'echo',
                    'cat'
                ];

    //check list to return
    forbbidens.forEach(function(forbbiden){
      if(botCommands[0].includes(forbbiden)){
        console.log('forbbiden')
        message.text = 'forbbiden'
      }
    })

    // posting on telegram chat
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
        console.log(`return: ${message.text}`)
        console.log('Message posted on telegram chat')
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        res.end('ok')
      })
      .catch(err => {
        console.log('Error :', err)
        res.end('Error :' + err)
      })
  })
}