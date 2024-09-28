// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAFW1oYgoucS_tFBFpl_m2bAP0FgMair5I",
  authDomain: "loginform-7bbd8.firebaseapp.com",
  projectId: "loginform-7bbd8",
  storageBucket: "loginform-7bbd8.appspot.com",
  messagingSenderId: "405910961497",
  appId: "1:405910961497:web:e7b56227b169c89af76048",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();


function signIn(){
  var email = document.getElementById("email");
  var password = document.getElementById("password"); 

  const promise = auth.signInWithEmailAndPassword(email.value, password.value);
  promise.then(() => location.replace(".https://coolvibes-reloaded.com/ReqForm/ReqQue/djqueue.html")).catch(e => alert(e.message));


};

function signOut(){
  auth.signOut();
  location.replace(".https://coolvibes-reloaded.com/ReqForm/loginform.html");
  alert("Signed Out")
}


}); 