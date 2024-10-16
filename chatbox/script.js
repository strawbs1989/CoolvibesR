   // Your Firebase configuration
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

const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const sendMessage = document.getElementById('sendMessage');
const logoutBtn = document.getElementById('logoutBtn');
const chatContainer = document.getElementById('chat-container');
const authContainer = document.getElementById('auth-container');

// User login function
loginBtn.onclick = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        await auth.signInWithEmailAndPassword(username, password);
        authContainer.style.display = 'none';
        chatContainer.style.display = 'block';
        loadMessages();
    } catch (error) {
        alert(error.message);
    }
};

// User registration function
window.onload = () => {
    const registerBtn = document.getElementById('registerBtn');

    registerBtn.onclick = async () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            await auth.createUserWithEmailAndPassword(email, password);
            alert('User registered successfully!');
        } catch (error) {
            alert(error.message);
        }
    };
};

        // Use Firebase's built-in validation for proper email formats
        await auth.createUserWithEmailAndPassword(email, password);
        alert('User registered successfully!');
    } catch (error) {
        alert(error.message);  // This will give detailed errors like "auth/invalid-email"
    }
};

// Send message function
sendMessage.onclick = async () => {
    const msg = document.getElementById('messageInput').value;
    const user = auth.currentUser;
    if (user) {
        await db.collection('messages').add({
            username: user.email,
            message: msg,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('messageInput').value = '';
    }
};

// Logout function
logoutBtn.onclick = () => {
    auth.signOut();
    authContainer.style.display = 'block';
    chatContainer.style.display = 'none';
};

// Load messages function
const loadMessages = () => {
    db.collection('messages').orderBy('timestamp')
        .onSnapshot(snapshot => {
            const messagesDiv = document.getElementById('messages');
            messagesDiv.innerHTML = '';
            snapshot.forEach(doc => {
                const data = doc.data();
                messagesDiv.innerHTML += `<p><strong>${data.username}:</strong> ${data.message}</p>`;
            });
        });
};

// Check authentication state
auth.onAuthStateChanged(user => {
    if (user) {
        authContainer.style.display = 'none';
        chatContainer.style.display = 'block';
        loadMessages();
    } else {
        authContainer.style.display = 'block';
        chatContainer.style.display = 'none';
    }
});