import firebase from './firebase'

const firestore = firebase.firestore()

export function createUser (uid: string, user: any) {
  return firestore.collection('users').doc(uid).set({ uid, ...user, lastAccessAt: new Date().toISOString() }, { merge: true })
}

export function createStore (store: any) {
  return firestore.collection('stores').doc().set(store)
}
