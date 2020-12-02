const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const validator = require(__dirname + '/validator.js');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let msg = '';

app.get('/', function (req, res) {
  res.render('signup',{
    msg : msg,
  });
});

function checkRequired(inputAry) {
    inputAry.forEach(function (input) {
      if (input === '') {
        msg = 'All fields are required or Email is not valid.';
      } else {
        msg = '';
      }
    });
  }

  function checkEmail(input) {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!re.test(String(input).toLowerCase())) {
    msg = 'All fields are required or Email is not valid.';
  } else {
    msg = '';
  }
  };
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
      res.render('success');
    }else{
      res.render('failure');
    }
    response.on('data', function(data){
     console.log(JSON.parse(data));
    })
  })

  checkRequired([firstName, lastName, email]);
  checkEmail(email);

  if (msg !== '') {
    res.redirect('/');
  }else{
    requestHttps.write(jsonData);
  }
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

