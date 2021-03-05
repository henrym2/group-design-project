import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {

};
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const users = db.collection('users')

export {
    db,
    auth,
    users
}