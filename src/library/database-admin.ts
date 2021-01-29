import { firestore } from './firebase-admin'

export function createStore (store: any) {
  return firestore.collection('stores').doc().set(store)
}

export async function findStoreByOwnerId (ownerId: string) {
  try {
    const query = await firestore.collection('stores')
      .where('ownerId', '==', ownerId).get()

    if (!query.empty) {
      const snapshot = query.docs[0]
      const store = snapshot.data()

      return { store }
    }
  } catch (error) {
    return { error }
  }
}
