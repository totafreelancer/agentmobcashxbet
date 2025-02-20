document.addEventListener('DOMContentLoaded', () => {
    // Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyC_yRDtcrMLSEQ9qITgD_FME5ALAZ5sD_k",
        authDomain: "agentmobcashxbet.firebaseapp.com",
        projectId: "agentmobcashxbet",
        storageBucket: "agentmobcashxbet.firebasestorage.app",
        messagingSenderId: "264158818770",
        appId: "1:264158818770:web:1b02ffdad13706b59b180b"
    };

    // Initialize Firebase (V8 Syntax)
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    if (localStorage.getItem('isLoggedIn')) {
        window.location.href = 'account.html';
        return;
    }

    const loginButton = document.getElementById('loginButton');
    const errorMessage = document.getElementById('errorMessage');
    const rememberPasswordCheckbox = document.getElementById('rememberPassword');
    const userIdInput = document.getElementById('userId');
    const passwordInput = document.getElementById('password');
    const workplaceCodeInput = document.getElementById('workplaceCode');

    // Check if there's a saved password
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedPassword) {
        passwordInput.value = savedPassword;
        rememberPasswordCheckbox.checked = true;
    }

    loginButton.addEventListener('click', async () => {
        const userId = userIdInput.value;
        const password = passwordInput.value;
        const workplaceCode = workplaceCodeInput.value;

        if (!userId || !password || !workplaceCode) {
            showError('Please fill in all fields');
            return;
        }

        try {
            const isValid = await verifyCredentials(db, userId, password, workplaceCode);
            if (isValid) {
                if (rememberPasswordCheckbox.checked) {
                    localStorage.setItem('savedPassword', password);
                } else {
                    localStorage.removeItem('savedPassword');
                }
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userData', JSON.stringify(isValid));
                window.location.href = 'account.html';
            } else {
                showError('Invalid credentials');
            }
        } catch (error) {
            showError('Error verifying credentials: ' + error.message);
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
});

// ✅ Firestore থেকে Data Fetch করার ফাংশন (V8-Compatible)
async function verifyCredentials(db, UserID, Password, WorkplaceCode) {
    try {
        const docRef = db.collection("mainData").doc("y7m9jyJAIXycgf2dSdDj"); // Correct Document ID
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            console.log("❌ Document does not exist.");
            return false;
        }

        const data = docSnap.data();
        console.log("✅ Fetched Data:", data);

        // Correct key names based on Firestore document
        if (data.UserID === UserID && 
            data.Password === Password && 
            data.WordplaceCade === WorkplaceCode) {
            return data; 
        } else {
            console.log("❌ Credentials do not match.");
        }
        return false;
    } catch (error) {
        console.error("❌ Error checking credentials:", error);
        throw error;
    }
}

