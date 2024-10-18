// Import Firebase functions
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTuGFhq5j6V9Q5gufyKIZCCa4fa9_pMmA",
    authDomain: "chatbox-53db3.firebaseapp.com",
    projectId: "chatbox-53db3",
    storageBucket: "chatbox-53db3.appspot.com",
    messagingSenderId: "561320100817",
    appId: "1:561320100817:web:b611951f3787155df016f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to generate a color from a string (user's email)
function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}

// List of predefined avatars
const avatars = [
    "https://coolvibes-reloaded.com/chatbox/avatars/avataaars1.png",
    "https://coolvibes-reloaded.com/chatbox/avatars/avataaars2.png",
    "https://coolvibes-reloaded.com/chatbox/avatars/avataaars3.png",
    "https://coolvibes-reloaded.com/chatbox/avatars/avataaars4.png",
    "https://coolvibes-reloaded.com/chatbox/avatars/avataaars.png"
];

// Function to assign an avatar based on the email
function getAvatar(email) {
    const index = email.charCodeAt(0) % avatars.length; // Assign avatar based on the first letter of the email
    return avatars[index];
}

// Function to show alerts
function showAlert(message) {
    alert(message);
}

// Function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

window.onload = () => {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const sendMessage = document.getElementById('sendMessage');
    const logoutBtn = document.getElementById('logoutBtn');
    const chatContainer = document.getElementById('chat-container');
    const authContainer = document.getElementById('auth-container');
    const messagesDiv = document.getElementById('messages');

    // Function to load messages with avatars
    const loadMessages = async () => {
        const messagesRef = collection(db, 'messages');
        const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'));
        const messagesSnapshot = await getDocs(messagesQuery);
        messagesDiv.innerHTML = ''; // Clear the chat before loading new messages

        messagesSnapshot.forEach(doc => {
            const data = doc.data();
            const messageElement = document.createElement('div');
            messageElement.innerHTML = `<img src="${data.avatar}" alt="Avatar" style="width:30px; height:30px; border-radius:50%;"> <strong>${data.username}</strong>: ${data.message}`;
            messagesDiv.appendChild(messageElement);
        });

        // Scroll to the bottom of the messages
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };

    // On login button click
    loginBtn.onclick = async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            showAlert("Please fill in both email and password.");
            return;
        }

        if (!validateEmail(email)) {
            showAlert("Please enter a valid email address.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            authContainer.style.display = 'none';
            chatContainer.style.display = 'block';
            loadMessages(); // Load messages after login
            document.getElementById('email').value = '';  // Clear fields
            document.getElementById('password').value = '';
        } catch (error) {
            showAlert(error.message);
        }
    };

    // On register button click
    registerBtn.onclick = async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            showAlert("Please fill in both email and password.");
            return;
        }

        if (!validateEmail(email)) {
            showAlert("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            showAlert("Password must be at least 6 characters long.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const avatarUrl = getAvatar(user.email); // Automatically assign an avatar

            // Save user details, including the assigned avatar, to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                avatar: avatarUrl
            });

            showAlert('User registered successfully!');
            document.getElementById('email').value = '';  // Clear fields
            document.getElementById('password').value = '';

        } catch (error) {
            showAlert(error.message);
        }
    };

    // On send message button click
    sendMessage.onclick = async () => {
        const msg = document.getElementById('messageInput').value;
        const user = auth.currentUser;

        if (user && msg.trim()) {
            // Fetch the user's profile from Firestore
            const userProfile = await getDoc(doc(db, 'users', user.uid));
            const avatarUrl = userProfile.data().avatar || avatars[0]; // Fallback avatar

            // Add the message to Firestore with the user's avatar
            await addDoc(collection(db, 'messages'), {
                username: user.email,
                avatar: avatarUrl,  // Use predefined avatar
                message: msg,
                timestamp: serverTimestamp()
            });

            document.getElementById('messageInput').value = ''; // Clear the input field after sending message
            loadMessages(); // Reload messages after sending
        } else {
            showAlert("Please enter a message to send.");
        }
    };

    // On logout button click
    logoutBtn.onclick = async () => {
        await signOut(auth);
        authContainer.style.display = 'block';
        chatContainer.style.display = 'none';
        showAlert("Logged out successfully.");
    };
};