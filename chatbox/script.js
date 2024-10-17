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
    const avatarInput = document.getElementById('avatarInput'); // Define avatar input here
    const uploadAvatarBtn = document.getElementById('uploadAvatarBtn'); // Define upload avatar button here

    // Function to load messages from Firestore
    const loadMessages = async () => {
        const messagesRef = db.collection('messages').orderBy('timestamp', 'desc');
        const snapshot = await messagesRef.get();
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = ''; // Clear the chat before loading new messages

        snapshot.forEach(doc => {
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
            // Register user
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Add an empty avatar URL initially
            await db.collection('users').doc(user.uid).set({
                email: user.email,
                avatar: ''
            });

            showAlert('User registered successfully! Now upload your avatar.');
            document.getElementById('avatarForm').style.display = 'block'; // Show avatar upload form after registration

        } catch (error) {
            showAlert(error.message);
        }
    };

    // Avatar Upload Handler
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

        // Create a storage reference
        const storageRef = firebase.storage().ref(`avatars/${user.uid}`);

        try {
            // Upload the file to Firebase Storage
            const snapshot = await storageRef.put(file);

            // Get the download URL of the uploaded image
            const avatarUrl = await snapshot.ref.getDownloadURL();

            // Save the avatar URL to Firestore
            await db.collection('users').doc(user.uid).update({
                avatar: avatarUrl
            });

            showAlert("Avatar uploaded successfully!");

        } catch (error) {
            showAlert("Error uploading avatar: " + error.message);
        }
    };

    // On send message button click
    sendMessage.onclick = async () => {
        const msg = document.getElementById('messageInput').value;
        const user = auth.currentUser;

        if (user && msg.trim()) {
            // Fetch avatar from the user's profile in Firestore
            const userProfile = await db.collection('users').doc(user.uid).get();
            const avatarUrl = userProfile.data().avatar || "https://example.com/default-avatar.png"; // Fallback URL

            await db.collection('messages').add({
                username: user.email,
                avatar: avatarUrl,  // Include avatar in message
                message: msg,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            document.getElementById('messageInput').value = ''; // Clear the input field after sending message
        } else {
            showAlert("Please enter a message to send.");
        }
    };
};
