import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from './firebase'
import { useRouter } from 'next/router'
import { createUser } from './database-client'

interface AuthProviderProps {
  children: any
}

const formatUser = async (user: any) => {
  const token = await user.getIdToken()
  return {
    uid: user?.uid,
    email: user?.email,
    name: user?.displayName,
    photoUrl: user.photoURL,
    token
  }
}

const authContext = createContext({
  user: null,
  signInWithGoogle: null,
  signOut: null
})

function useProvideAuth () {
  const router = useRouter()
  const [user, setUser] = useState({})

  const handleUser = async (rawUser: firebase.User) => {
    if (rawUser) {
      const user = await formatUser(rawUser)

      const {
        token,
        ...userWithoutToken
      } = user

      setUser(user)
      await createUser(user.uid, userWithoutToken)

      return user
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

  const signOut = async () => {
    return firebase
      .auth()
      .signOut()
      .then(async () => {
        await handleUser(null)
        await router.push('/home')
      })
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser)

    return () => unsubscribe()
  }, [])

  return {
    user,
    signInWithGoogle,
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
