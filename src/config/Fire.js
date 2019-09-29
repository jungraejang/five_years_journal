  import firebase from 'firebase'

  const config = {
  apiKey: "AIzaSyA-ZAq90fFXu85arlTph0SyvWoy-NyoMkg",
  authDomain: "fiveyearjournal-aa5c6.firebaseapp.com",
  databaseURL: "https://fiveyearjournal-aa5c6.firebaseio.com",
  projectId: "fiveyearjournal-aa5c6",
  storageBucket: "",
  messagingSenderId: "323854109721",
  appId: "1:323854109721:web:dad5d74494bf872b"
};
console.log("fired")
const fire = firebase.initializeApp(config)
export default fire
