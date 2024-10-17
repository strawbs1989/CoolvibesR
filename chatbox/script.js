// Firebase configuration (using Firebase v8)
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
const storage = firebase.storage();

// Ensure the DOM is fully loaded before accessing elements
window.onload = () => {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const sendMessage = document.getElementById('sendMessage');
    const logoutBtn = document.getElementById('logoutBtn');
    const chatContainer = document.getElementById('chat-container');
    const authContainer = document.getElementById('auth-container');
    const avatarInput = document.getElementById('avatarInput');
    const uploadAvatarBtn = document.getElementById('uploadAvatarBtn');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const showAlert = (message) => {
        alert(message);
    };

    const loadMessages = async () => {
        const messagesSnapshot = await db.collection('messages').orderBy('timestamp', 'asc').get();
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = ''; // Clear previous messages

        messagesSnapshot.forEach(doc => {
            const data = doc.data();
            const messageElement = document.createElement('div');
            messageElement.innerHTML = `<img src="${data.avatar}" alt="Avatar" style="width:30px; height:30px; border-radius:50%;"> <strong>${data.username}</strong>: ${data.message}`;
            messagesDiv.appendChild(messageElement);
        });

        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the bottom
    };

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
        } catch (error) {
            showAlert(error.message);
        }
    };

    registerBtn.onclick = async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            showAlert("Please fill in both email and password.");
            return;
        }

        if (password.length < 6) {
            showAlert("Password must be at least 6 characters.");
            return;
        }

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            await db.collection('users').doc(user.uid).set({
                email: user.email,
                avatar: ''
            });

            showAlert("User registered successfully!");
            document.getElementById('avatarForm').style.display = 'block'; // Show avatar form
        } catch (error) {
            showAlert(error.message);
        }
    };

    uploadAvatarBtn.onclick = async () => {
        const file = avatarInput.files[0];
        if (!file) {
            showAlert("Please select an avatar image.");
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            showAlert("You need to be logged in to upload an avatar.");
            return;
        }

        const storageRef = storage.ref(`avatars/${user.uid}`);
        try {
            const snapshot = await storageRef.put(file);
            const avatarUrl = await snapshot.ref.getDownloadURL();

            await db.collection('users').doc(user.uid).update({
                avatar: avatarUrl
            });

            showAlert("Avatar uploaded successfully!");
        } catch (error) {
            showAlert("Error uploading avatar: " + error.message);
        }
    };

    sendMessage.onclick = async () => {
        const msg = document.getElementById('messageInput').value;
        const user = auth.currentUser;

        if (user && msg.trim()) {
            const userProfile = await db.collection('users').doc(user.uid).get();
            const avatarUrl = userProfile.data().avatar || "https://example.com/default-avatar.png";

            await db.collection('messages').add({
                username: user.email,
                avatar: avatarUrl,
                message: msg,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            document.getElementById('messageInput').value = ''; // Clear the input field
            loadMessages(); // Reload messages after sending
        } else {
            showAlert("Please enter a message.");
        }
    };

    logoutBtn.onclick = async () => {
        await auth.signOut();
        authContainer.style.display = 'block';
        chatContainer.style.display = 'none';
        showAlert("Logged out successfully.");
    };
};
