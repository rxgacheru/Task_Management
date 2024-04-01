import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, googleAuthProvider, signInWitPopup} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAPqHXTu5nnEJPZGJZugZwMNZrDrvnY_kY",
    authDomain: "quicktask-9f0a8.firebaseapp.com",
    projectId: "quicktask-9f0a8",
    storageBucket: "quicktask-9f0a8.appspot.com",
    messagingSenderId: "871304969273",
    appId: "1:871304969273:web:60fc3d97b33eec6ca261e8",
    measurementId: "G-33GVVVCC1V",
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
updateUserProfile();