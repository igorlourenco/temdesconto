import firebase from './firebase'

const firestore = firebase.firestore()

export function createUser (uid: string, user: any) {
  return firestore.collection('users').doc(uid).set({ uid, ...user }, { merge: true })
}
