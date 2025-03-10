import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ✅ Firebase Config (Your Credentials)
const firebaseConfig = {
    apiKey: "AIzaSyAlq5WgpXvQg4sf9ZIXfcplTFBtqE0g9VA",
    authDomain: "qurancoach-457b2.firebaseapp.com",
    projectId: "qurancoach-457b2",
    storageBucket: "qurancoach-457b2.appspot.com",  // ✅ Fixed storage bucket
    messagingSenderId: "758303383198",
    appId: "1:758303383198:web:ba3942da261bae7a0b658f"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {

    // ✅ Register User
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("registerEmail").value;
            const password = document.getElementById("registerPassword").value;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", userCredential.user.uid), { email, progress: {} });
                window.location.href = "dashboard.html";
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // ✅ Login User
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            try {
                await signInWithEmailAndPassword(auth, email, password);
                window.location.href = "dashboard.html";
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // ✅ Redirect If Logged In
    onAuthStateChanged(auth, (user) => {
        if (user && (window.location.pathname.includes("login.html") || window.location.pathname.includes("register.html"))) {
            window.location.href = "dashboard.html";
        }
    });

});
