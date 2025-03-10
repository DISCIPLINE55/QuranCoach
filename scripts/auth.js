
// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAlq5WgpXvQg4sf9ZIXfcplTFBtqE0g9VA",
  authDomain: "qurancoach-457b2.firebaseapp.com",
  projectId: "qurancoach-457b2",
  storageBucket: "qurancoach-457b2.firebasestorage.app",
  messagingSenderId: "758303383198",
  appId: "1:758303383198:web:ba3942da261bae7a0b658f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Ensure Firebase is ready before running authentication functions
document.addEventListener("DOMContentLoaded", () => {

    // Registration Function
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("registerEmail").value;
            const password = document.getElementById("registerPassword").value;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", userCredential.user.uid), { email: email, memorizationProgress: {} });
                console.log("Registration successful, redirecting...");
                window.location.href = "dashboard.html";
            } catch (error) {
                console.error("Registration Error:", error.message);
                alert(error.message);
            }
        });
    }

    // Login Function
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            try {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("Login successful, redirecting...");
                window.location.href = "dashboard.html";
            } catch (error) {
                console.error("Login Error:", error.message);
                alert(error.message);
            }
        });
    }

    // Check Authentication State and Redirect if Logged In
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is already logged in, redirecting...");
            if (window.location.pathname.includes("login.html") || window.location.pathname.includes("register.html")) {
                window.location.href = "dashboard.html";
            }
        } else {
            console.log("No user logged in.");
        }
    });

});
