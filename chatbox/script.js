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

    // Function to validate email format
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Function to display alert for validation issues
    const showAlert = (message) => {
        alert(message);
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
            await auth.signInWithEmailAndPassword(email, password);
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
            await auth.createUserWithEmailAndPassword(email, password);
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
        await db.collection('messages').add({
            username: user.email,
            message: msg,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() // Ensure the timestamp is added
        });
        document.getElementById('messageInput').value = ''; // Clear the input field after sending message
    } else {
        alert("Please enter a message to send.");
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
            const timestamp = data.timestamp ? data.timestamp.toDate().toLocaleTimeString() : 'Unknown time';
            messagesDiv.innerHTML += `<p><strong>${data.username}:</strong> ${data.message} <span style="color:gray; font-size:0.8em;">(${timestamp})</span></p>`;
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
