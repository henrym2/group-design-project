import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCe7cEZQrzuCvKNg-IyNFYf7MlCR0y1WeA",
    authDomain: "groupdesign-669b6.firebaseapp.com",
    databaseURL: "https://groupdesign-669b6-default-rtdb.firebaseio.com",
    projectId: "groupdesign-669b6",
    storageBucket: "groupdesign-669b6.appspot.com",
    messagingSenderId: "15277983445",
    appId: "1:15277983445:web:0364abf838302021e3845c"
};
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const users = db.collection('users')
const projects = db.collection('projects')

export {
    db,
    auth,
    users,
    projects
}