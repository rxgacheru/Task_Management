import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
  const firebaseConfig = {
    apiKey: "AIzaSyC-Szt16GYLmajeSlf-F2_h1NCuQLCy5gw",
    authDomain: "login-3e293.firebaseapp.com",
    projectId: "login-3e293",
    storageBucket: "login-3e293.appspot.com",
    messagingSenderId: "289664411603",
    appId: "1:289664411603:web:d9312b48a0e451cdbe3126"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", function() {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
      window.location.href = "../index.html";
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
})
function updateUserProfile(user) {
    const userName = user.displayName;
    const userEmail = user.email;
    const userProfilePicture = user.photoURL;
    document.getElementById("userName").textContext = userName;
    document.getElementById("userEmail").textContext = userEmail;
    document.getElementById("userProfilePicture").src = userProfilePicture;
}
document.getElementById("sign-out-btn").addEventListener("click", function() {
  // Sign out the user
  auth.signOut().then(() => {
      console.log("User signed out successfully.");
      // Redirect to the sign-in page or any other desired page
      window.location.href = "../sign-in.html";
  }).catch((error) => {
      console.error("Error signing out:", error);
  });
})
updateUserProfile()