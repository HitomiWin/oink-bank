import {
  initializeApp
} from 'firebase/app'
import {
  getAuth
} from 'firebase/auth'
import {
  getFirestore
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// init firebase
const app = initializeApp(firebaseConfig)

// get firebase auth instance
const auth = getAuth()

// get firebase firestore instance
const db = getFirestore(app)

// get firebase storage instance


export {
  app as
  default,
  auth,
  db,

}