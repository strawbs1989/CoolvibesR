import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

registerBtn.onclick = async () => {
    console.log('Register button clicked');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(`Email: ${email}, Password: ${password}`);
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('User registered successfully!');
    } catch (error) {
        console.error('Error during registration:', error);
        alert(error.message);
    }
};

loginBtn.onclick = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        authContainer.style.display = 'none';
        chatContainer.style.display = 'block';
        loadMessages();
    } catch (error) {
        alert(error.message);
    }
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        authContainer.style.display = 'none';
        chatContainer.style.display = 'block';
        loadMessages();
    } else {
        authContainer.style.display = 'block';
        chatContainer.style.display = 'none';
    }
});
