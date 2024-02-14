import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBB6lLJxoBcGIrlLdWHhDx-vWAJfifcnrw",
    authDomain: "academy-test-4548c.firebaseapp.com",
    projectId: "academy-test-4548c",
    storageBucket: "academy-test-4548c.appspot.com",
    messagingSenderId: "555438238193",
    appId: "1:555438238193:web:e237e5cb606de5623a3c50",
    measurementId: "G-V0EX107VW5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
