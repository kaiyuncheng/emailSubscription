const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const { request } = require('express');
// const request = require('request');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/signup.html');
}); 

app.post('/', function (req, res) {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = 'https://us7.api.mailchimp.com/3.0/lists/37ef16f94e/';
  const options = {
    method: 'POST',
    auth: 'kaiyuncheng:0915a7a4cbcd6ebf696fd940300ffdd6-us7',
  };

  const requestHttps = https.request(url, options, function (response) {
    if (response.statusCode === 200){
      res.sendFile(__dirname + '/success.html');
    }else{
      res.sendFile(__dirname + '/failure.html');
    }
    response.on('data', function(data){
     console.log(JSON.parse(data));
    })
  })

  requestHttps.write(jsonData);
  requestHttps.end();

});

app.post('/failure', function (req, res) {
  res.redirect('/');
});

app.post('/success', function (req, res) {
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Server is running on port 3000.');
});

