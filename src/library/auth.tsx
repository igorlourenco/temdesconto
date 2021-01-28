import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from './firebase'
import { useRouter } from 'next/router'
import { createStore, createUser } from './database-client'

interface AuthProviderProps {
  children: any
}

interface Store {
  email: string
  password: string
  name: string
  businessType: string
}

const formatUser = async (user: any) => {
  const token = await user.getIdToken()
  return {
    uid: user?.uid,
    email: user?.email,
    name: user?.displayName,
    token,
    photoUrl: user.photoURL
  }
}

const formatStore = async (user: any) => {
  const token = await user.getIdToken()
  return {
    uid: user?.uid,
    email: user?.email,
    token
  }
}

const authContext = createContext({
  user: null,
  signInWithGoogle: null,
  signInWithEmail: null,
  signOut: null
})

function useProvideAuth () {
  const router = useRouter()
  const [user, setUser] = useState(null)

  const handleUser = async (rawUser: firebase.User) => {
    if (rawUser) {
      const tempUser = await formatUser(rawUser)

      const {
        token,
        ...userWithoutToken
      } = tempUser

      setUser(tempUser)
      await createUser(tempUser.uid, userWithoutToken)

      return tempUser
    } else {
      setUser(false)
      return false
    }
  }

  const handleStore = async (rawUser: firebase.User, name, businessType) => {
    if (rawUser) {
      const tempUser = await formatStore(rawUser)

      const {
        token,
        ...userWithoutToken
      } = tempUser

      console.log(businessType, name)

      setUser(tempUser)
      await createStore(tempUser.uid, { businessType, name, ...userWithoutToken })

      return tempUser
    } else {
      setUser(false)
      return false
    }
  }

  const signInWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (response) => {
        await handleUser(response.user)
      })
  }

  const signInWithEmail = (storeData: Store) => {
    const { email, password, name, businessType } = storeData
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        await handleStore(response.user, name, businessType)
      })
  }

  const signOut = () => {
    router.push('/home')
    return firebase
      .auth()
      .signOut()
      .then(async () => {
        await handleUser(null)
      })
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return {
    user,
    signInWithGoogle,
    signInWithEmail,
    signOut
  }
}

export function AuthProvider (props: AuthProviderProps) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{props.children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}
