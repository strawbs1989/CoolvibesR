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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Ensure the DOM is fully loaded before accessing elements
window.onload = () => {
    // Select buttons and containers
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const sendMessage = document.getElementById('sendMessage');
    const logoutBtn = document.getElementById('logoutBtn');
    const chatContainer = document.getElementById('chat-container');
    const authContainer = document.getElementById('auth-container');

    // On login button click
    loginBtn.onclick = async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            authContainer.style.display = 'none';
            chatContainer.style.display = 'block';
            loadMessages(); // Load messages after login
        } catch (error) {
            alert(error.message);
        }
    };

    // On register button click
    registerBtn.onclick = async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            alert('User registered successfully!');
        } catch (error) {
            alert(error.message);
        }
    };

    // On send message button click
    sendMessage.onclick = async () => {
        const msg = document.getElementById('messageInput').value;
        const user = auth.currentUser;
        if (user && msg.trim()) {
            await db.collection('messages').add({
                username: user.email,
                message: msg,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            document.getElementById('messageInput').value = ''; // Clear the input field after sending message
        }
    };

    // On logout button click
    logoutBtn.onclick = () => {
        auth.signOut();
        authContainer.style.display = 'block';
        chatContainer.style.display = 'none';
    };

    // Load and display messages from Firestore
    const loadMessages = () => {
        db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
            const messagesDiv = document.getElementById('messages');
            messagesDiv.innerHTML = ''; // Clear messages before loading new ones
            snapshot.forEach(doc => {
                const data = doc.data();
                messagesDiv.innerHTML += `<p><strong>${data.username}:</strong> ${data.message}</p>`;
            });
            messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the bottom
        });
    };

    // Handle auth state changes (user login/logout)
    auth.onAuthStateChanged(user => {
        if (user) {
            authContainer.style.display = 'none';
            chatContainer.style.display = 'block';
            loadMessages(); // Load messages if user is logged in
        } else {
            authContainer.style.display = 'block';
            chatContainer.style.display = 'none';
        }
    });
};
