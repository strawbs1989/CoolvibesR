// Import Firebase functions
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js';

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
    const index = email.charCodeAt(0) % avatars.length;
    return avatars[index];
}

// Wait until the DOM is fully loaded
window.onload = () => {
    // Get DOM elements
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const sendMessage = document.getElementById('sendMessage');
    const logoutBtn = document.getElementById('logoutBtn');
    const chatContainer = document.getElementById('chat-container');
    const authContainer = document.getElementById('auth-container');
    const fileInput = document.getElementById('fileInput');
    const messagesDiv = document.getElementById('messages');
	const uploadBtn = document.getElementById('uploadBtn'); // Add the new upload button

    // Ensure all necessary DOM elements exist
    if (!loginBtn || !registerBtn || !sendMessage || !logoutBtn || !fileInput || !messagesDiv || !uploadBtn) {
        console.error('One or more DOM elements are missing!');
        return;
    }
	
// Add event listener to the upload button
    uploadBtn.addEventListener('click', () => {
        fileInput.click(); // Trigger file input when upload button is clicked
    });
	
    // Email validation function
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Alert helper
    const showAlert = (message) => {
        alert(message);
    };

    // Load and display chat messages
    const loadMessages = async () => {
        const messagesRef = collection(db, 'messages');
        const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'));
        const messagesSnapshot = await getDocs(messagesQuery);

        messagesDiv.innerHTML = ''; // Clear previous messages

        messagesSnapshot.forEach(doc => {
            const data = doc.data();
            const messageElement = document.createElement('div');
            messageElement.innerHTML = `<img src="${data.avatar}" alt="Avatar" style="width:30px; height:30px; border-radius:50%;"> <strong>${data.username}</strong>: ${data.message}`;
            messagesDiv.appendChild(messageElement);
        });

        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };

    // Monitor authentication state
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

    // Login event
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
            loadMessages();
            document.getElementById('email').value = ''; // Clear input
            document.getElementById('password').value = '';
        } catch (error) {
            showAlert(error.message);
        }
    };

    // Register event
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
            const avatarUrl = getAvatar(user.email);

            // Save user details to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                avatar: avatarUrl
            });

            showAlert('User registered successfully!');
            document.getElementById('email').value = ''; // Clear input
            document.getElementById('password').value = '';
        } catch (error) {
            showAlert(error.message);
        }
    };

    // Send message event
    sendMessage.onclick = async () => {
        const msg = document.getElementById('messageInput').value;
        const user = auth.currentUser;

        if (user && msg.trim()) {
            const userProfile = await getDoc(doc(db, 'users', user.uid));
            const avatarUrl = userProfile.exists() ? (userProfile.data().avatar || avatars[0]) : avatars[0];

            await addDoc(collection(db, 'messages'), {
                username: user.email,
                avatar: avatarUrl,
                message: msg,
                timestamp: serverTimestamp()
            });

            document.getElementById('messageInput').value = ''; // Clear input
            loadMessages(); // Reload messages
        } else {
            showAlert("Please enter a message to send.");
        }
    };

    // File input change event (for avatar upload)
    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        const user = auth.currentUser;

        if (file && user) {
            try {
                const storageRef = ref(storage, `avatars/${user.uid}`);
                const uploadResult = await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(uploadResult.ref);

                // Update avatar URL in Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    avatar: downloadURL
                }, { merge: true });

                showAlert("Avatar updated successfully!");
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    });

    // Logout event
    logoutBtn.onclick = async () => {
        await signOut(auth);
    };
};