// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, ref, set, onValue, remove, push } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    databaseURL: "https://versionshantering-default-rtdb.europe-west1.firebasedatabase.app",
    apiKey: "AIzaSyCNPaLMcP10i9TdWae4Pkl6m9DEq7erO_U",
    authDomain: "versionshantering.firebaseapp.com",
    projectId: "versionshantering",
    storageBucket: "versionshantering.appspot.com",
    messagingSenderId: "793446011804",
    appId: "1:793446011804:web:f61e175c1dd62a3c11ee59"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log(db)

document.getElementById("submit-btn").addEventListener(
    "click", (event) => {
        let userInput = document.getElementById("user-input").value
        console.log(userInput);
        set(ref(db, userInput), {
            name: userInput,
            dateOfCretion: new Date().toString(),

        })
    }
);

onValue(ref(db, '/'), (snapshot) => {
    document.getElementById('message-container').innerHTML = '';
    let array = [];

    snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log(childKey, childData)
        array.push(childData);
    });

    array.sort(function (a, b) {
        return new Date(b.dateOfCretion) - new Date(a.dateOfCretion);
    });
    array.forEach(e => {
        document.getElementById('message-container').innerHTML += ` <div class="message-bubble"> ${e.name}</div>`
    });

});

remove(ref(db, '/')).then(() => {
    console.log("/");
})

document.getElementById("delete-btn").addEventListener(
    "click", (event) => {
        remove(ref(db, '/')).then(() => {

        })

    });




    