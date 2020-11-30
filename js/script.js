function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate() {
  var $error = $("#error");
  var email = $("#email").val();
  $error.text("");

  if (validateEmail(email)) {
  } else {
    $error.text("Please provide a valid email");
    
  }
  return false;
}

$("#submit").on("click", validate);






// let form = document.querySelector('.form'),
//     email = form.querySelector('input'),
//     msg = form.querySelector('small');

// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     if (email.value.trim() === '') {
//         form.className = 'form error'
//         msg.innerText = `Email cannot be empty`
//     } else if (!validateEmail(email.value.trim())) {
//         form.className = 'form error'
//         msg.innerText = `Please provide a valid email`
//     } else {
//         form.className = 'form success'
//         msg.innerText = `You're on the list !`
//     }
// })





