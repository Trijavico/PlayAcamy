var firebaseConfig = {
    apiKey: "AIzaSyAKzBgg3VFlYwGJgXxhcCHQLEVMtCT7O00",
    authDomain: "playacamy-30ad4.firebaseapp.com",
    projectId: "playacamy-30ad4",
    storageBucket: "playacamy-30ad4.appspot.com",
    messagingSenderId: "119643100251",
    appId: "1:119643100251:web:63d5770a74be34168d1b7e",
  
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()


//Funcion registrar
function regis() {
    full_name = document.getElementById('full_name').value
    email = document.getElementById('email').value
    phone = document.getElementById('phone').value
    password = document.getElementById('password').value
    img = document.getElementById('img').value

    //validacion de datos de entrada
    if(validate_email(email) == false || validate_password(password) == false){
        alert('Email or Password is Outta line!!')
        return;
    }
    if (validate_field(full_name) == false || validate_field(phone) == false || validate_field(img) == false){
        alert('One or more extra fields is Outta line!!')
        return;

    }

    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        // Declare user variable
        var user = auth.currentUser

        // Add this user to Firebase Database
        var database_ref = database.ref()

        // Create User data
        var user_data = {
            email : email,
            full_name : full_name,
            phone : phone,
            img: img,
            last_login : Date.now()
        }

        // Push to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data)

        // DOne
        alert('User Created!!')

        window.location.href = "../index.html";
    })
    .catch(function(error){
        var error_code = error.code
        var error_massage = error.message

        alert(error_massage)
    })
}

function logear () {
    // Get all our input fields
    correo = document.getElementById('email').value
    pass = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // Done
      alert('User Logged In!!')
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })

    window.location.href = "../index.html";
  }

// Validacion de email
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true){
        return true
    } else {
        return false
    }
}


 //Validacion de password
function validate_password(password){ 
    if(password < 6 ){
        return false
    } else {
        return true 
    }
}

function validate_field(field){
    if(field == null){
        return false
    }
    if(field.length <= 0){
        return false
    } else{
        return true
    }
}
