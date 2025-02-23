document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is logged in
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'index.html';
        return;
    }

    // Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBCebnAtZZ9XWzReHXN4s-kB9dLhL9ulw8",
        authDomain: "agent-mobcash-xbet.firebaseapp.com",
        projectId: "agent-mobcash-xbet",
        storageBucket: "agent-mobcash-xbet.firebasestorage.app",
        messagingSenderId: "347151266255",
        appId: "1:347151266255:web:740847f8d124f4cb9fe2ba"
    };
      

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    // Get DOM elements
    const logoutButton = document.getElementById('logoutButton');
    const refreshButton = document.getElementById('refreshButton');
    const limitElement = document.getElementById('limit');
    const addressElement = document.getElementById('address');

    // Fixed UserID
    const fixedUserID = 'y7m9jyJAIXycgf2dSdDj';

    // Function to fetch user data from Firestore
    async function loadUserData() {
        try {
            const docRef = db.collection("mainData").doc(fixedUserID);
            const docSnap = await docRef.get();

            if (docSnap.exists) {
                const data = docSnap.data();
                console.log("✅ Fetched Data:", data);

                // Update UI with Firestore data
                limitElement.textContent = data.Limit ? `${data.Limit} $` : "N/A";
                addressElement.textContent = data.Address || "N/A";
            } else {
                console.log("❌ Document does not exist.");
            }
        } catch (error) {
            console.error("❌ Error fetching user data:", error);
        }
    }

    // Load user data initially
    loadUserData();

    // Handle logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        window.location.href = 'index.html';
    });

    // Refresh button click event
    refreshButton.addEventListener('click', () => {
        loadUserData();
    });
});
