// ✅ Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMi4k342i5RevH5UEF0hUoR68ptFFZ6x4",
  authDomain: "cse-club-of-hstu.firebaseapp.com",
  projectId: "cse-club-of-hstu",
  storageBucket: "cse-club-of-hstu.firebasestorage.app",
  messagingSenderId: "370944792306",
  appId: "1:370944792306:web:b9d45be7bc24a7ff34626b",
  measurementId: "G-36ETWRFX1M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

//  Helper function to wait until auth is fully propagated
async function waitForAuthReady(expectedUid) {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid === expectedUid) {
        unsubscribe();
        resolve(user);
      }
    });
  });
}

//  Auth State Change Listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    const docRef = doc(db, "users", user.uid);
    getDoc(docRef)
      .then((docSnap) => {
        const path = window.location.pathname;
        const isAuthPage =
          path.endsWith("login.html") || path.endsWith("register.html");

        if (isAuthPage) {
          window.location.href = "index.html";
          return;
        }

        if (typeof window.updateUI === "function") {
          if (docSnap.exists()) {
            window.updateUI({
              ...user,
              ...docSnap.data(),
            });
          } else {
            console.warn("⚠️ Firestore: No user document found.");
            window.updateUI(user);
          }
        }
      })
      .catch((error) => {
        console.error("Firestore read error:", error);
        alert("Firestore read error:", error);
      });
  } else {
    const path = window.location.pathname;
    const isAuthPage =
      path.endsWith("login.html") ||
      path.endsWith("register.html") ||
      path.endsWith("become-member.html");

    if (!isAuthPage) {
      window.location.href = "login.html";
    }
  }
});
window.register = async function () {
  const studentId = document.getElementById("studentId");
  const name = document.getElementById("name");
  const dept = document.getElementById("dept");
  const year = document.getElementById("year");
  const contactNumber = document.getElementById("contactNumber");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  // Check if elements exist before trying to read their values
  if (
    !studentId ||
    !name ||
    !dept ||
    !year ||
    !contactNumber ||
    !email ||
    !password
  ) {
    console.error("One or more registration form elements not found!");
    alert("Error: Missing form elements. Please check the console.");
    return;
  }

  const studentIdValue = studentId.value.trim();
  const nameValue = name.value.trim();
  const deptValue = dept.value.trim();
  const yearValue = year.value.trim();
  const contactNumberValue = contactNumber.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value;

  console.log("Attempting to register user with:", {
    studentId: studentIdValue,
    name: nameValue,
    dept: deptValue,
    year: yearValue,
    contactNumber: contactNumberValue,
    email: emailValue,
    password: "********",
  });

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      emailValue,
      passwordValue
    );
    const user = userCredential.user;
    console.log("Firebase user created:", user);

    await waitForAuthReady(user.uid);
    console.log("Auth state ready for UID:", user.uid);

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      studentId: studentIdValue,
      name: nameValue,
      dept: deptValue,
      year: yearValue,
      contactNumber: contactNumberValue,
    });

    console.log("✅ Registration & Firestore data saved successfully");
    alert("Registration & Firestore data saved successfully");

    window.location.href = "index.html";
  } catch (error) {
    console.error("❌ Registration failed:", error);
    alert("❌ " + error.message);
  }
};
// Login Function
window.login = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // No alert; onAuthStateChanged will handle redirection
    })
    .catch((error) => {
      alert("❌ " + error.message);
    });
};

// Logout Function
window.logout = function () {
  signOut(auth)
    .then(() => {
      // No alert; onAuthStateChanged will handle redirection
    })
    .catch((error) => {
      alert("❌ " + error.message);
    });
};