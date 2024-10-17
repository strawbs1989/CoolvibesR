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
                const messagesRef = collection(db, 'messages');
                const messagesSnapshot = await getDocs(query(messagesRef, orderBy('timestamp', 'desc')));
                const messagesDiv = document.getElementById('messages');
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

                    await setDoc(doc(db, 'users', user.uid), {
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
                    await updateDoc(doc(db, 'users', user.uid), {
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
                    const userProfile = await getDoc(doc(db, 'users', user.uid));
                    const avatarUrl = userProfile.data().avatar || "https://example.com/default-avatar.png"; // Fallback URL

                    await addDoc(collection(db, 'messages'), {
                        username: user.email,
                        avatar: avatarUrl,  // Include avatar in message
                        message: msg,
                        timestamp: serverTimestamp()
                    });

                    document.getElementById('messageInput').value = ''; // Clear the input field after sending message
                    loadMessages(); // Optionally reload messages after sending
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