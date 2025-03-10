import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ✅ Initialize Firebase Auth
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("username").innerText = user.email;
    } else {
        window.location.href = "login.html";
    }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => window.location.href = "login.html");
});
