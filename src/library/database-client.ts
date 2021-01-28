import firebase from './firebase'

const firestore = firebase.firestore()

export function createUser (uid, userData) {
  return firestore.collection('users').doc(uid).set({ uid, ...userData }, { merge: true })
}

export function createStore (uid, storeData) {
  return firestore.collection('stores').doc(uid).set({ uid, ...storeData }, { merge: true })
}
