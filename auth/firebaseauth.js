  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
  import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAcrFn8Ul4NsQI_Hms30f8mePZF-C0FjCI",
    authDomain: "porfolio-7a8b0.firebaseapp.com",
    projectId: "porfolio-7a8b0",
    storageBucket: "porfolio-7a8b0.firebasestorage.app",
    messagingSenderId: "882396719532",
    appId: "1:882396719532:web:ce9258257283964058b209"
  };

  // Initialize Firebase
  

  const app = initializeApp(firebaseConfig);

  function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.innerHTML = message;
    messageDiv.style.display = "block";
    messageDiv.style.opacity = 1;

    setTimeout(function() {
      messageDiv.style.opacity = 0;
    }, 5000);
  }

const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const fname = document.getElementById('fName').value;
    const lname = document.getElementById('lName').value;
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const userData = {
          fname: fname,
          lname: lname,
          email: email,
          password: password
        };
        showMessage("Registration successful", "signUpMessage");
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
          .then(() => {
            window.location.href = "index.html";
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          showMessage("Email already in use", "signUpMessage");
        } else {
          showMessage("Registration failed", "signUpMessage");
        }
    })
  });

  const signIn = document.getElementById('submitSignIn');
  signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        showMessage("Login successful", "signInMessage");
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = "dashboard.html";
      })
      .catch(error => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credentail") {
          showMessage("Invalid email or password", "signInMessage");
        } 
        else {
          showMessage("Login failed", "signInMessage");
        }
  })
  });


    