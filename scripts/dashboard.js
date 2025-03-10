
// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {
    if (user) {
        document.getElementById("username").innerText = user.email;
        loadUserProgress(user.uid);
    } else {
        window.location.href = "login.html";
    }
});

// Load User Progress from Firestore
async function loadUserProgress(uid) {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
        const progress = userDoc.data().memorizationProgress || {};
        updateSurahList(progress, uid);
    } else {
        console.log("No progress data found");
    }
}

// Update Surah List with Firestore Data
function updateSurahList(progress, uid) {
    const surahs = ["Al-Fatiha", "Al-Baqara", "Aal-E-Imran", "An-Nisa", "Al-Ma'ida"];
    const surahList = document.getElementById("surahList");
    surahList.innerHTML = "";

    surahs.forEach((surah, index) => {
        const li = document.createElement("li");
        li.textContent = surah;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.dataset.index = index;
        checkbox.checked = progress[index] || false;

        checkbox.addEventListener("change", async (e) => {
            progress[index] = e.target.checked;
            await setDoc(doc(db, "users", uid), { memorizationProgress: progress }, { merge: true });
        });

        li.appendChild(checkbox);
        surahList.appendChild(li);
    });
}

// Logout Function
function logout() {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        alert(error.message);
    });
}

document.getElementById("logoutBtn").addEventListener("click", logout);
