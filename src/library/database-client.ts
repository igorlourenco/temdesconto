import firebase from './firebase'
import { generateId } from '../utilitaries/helpers'

const firestore = firebase.firestore()

export function createUser (uid: string, user: any) {
  return firestore.collection('users').doc(uid).set({ uid, ...user, lastAccessAt: new Date().toISOString() }, { merge: true })
}

export async function createStore (store: any) {
  const logoName = `${generateId(20)}.png`

  const { logo, ...storeWithoutLogo } = store
  const storageRef = firebase.storage().ref()
  const logoRef = storageRef.child(`stores/${logoName}`)

  await logoRef.put(logo[0])
  await firestore.collection('stores').doc().set({ ...storeWithoutLogo, logo: logoName })
}
