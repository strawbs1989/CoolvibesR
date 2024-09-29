
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFW1oYgoucS_tFBFpl_m2bAP0FgMair5I",
  authDomain: "loginform-7bbd8.firebaseapp.com",
  projectId: "loginform-7bbd8",
  storageBucket: "loginform-7bbd8.appspot.com",
  messagingSenderId: "405910961497",
  appId: "1:405910961497:web:e7b56227b169c89af76048",
  measurementId: "G-KMPQ6X7T1B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Sign In function
function signIn() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Successful login
      console.log("User signed in");
      window.location.replace("https://coolvibes-reloaded.com/ReqForm/ReqQue/djQueue.html");
    })
    .catch((error) => {
      var errorMessage = error.message;
      alert("Error: " + errorMessage);
    });
}

// Sign Out function (in case you need it elsewhere)
function signOut() {
  auth.signOut().then(() => {
    location.replace("https://coolvibes-reloaded.com/ReqForm/login.html");
    alert("Signed Out");
  });
}
