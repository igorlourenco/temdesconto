import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from './firebase'
import { useRouter } from 'next/router'

interface AuthProviderProps {
  children: any
}

const formatUser = async (user: any) => {
  return {
    uid: user?.uid,
    email: user?.email,
    name: user?.displayName,
    token: user.ya,
    photoUrl: user.photoURL
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
  const [user, setUser] = useState({})

  const handleUser = async (rawUser: firebase.User) => {
    if (rawUser) {
      const tempUser = await formatUser(rawUser)

      // const {
      //   token,
      //   ...userWithoutToken
      // } = tempUser

      setUser(tempUser)
      // await createUser(tempUser.uid, userWithoutToken)

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

  const signInWithEmail = (email: string, password: string) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // Signed in
        // ...
      })
  }

  const signOut = async () => {
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
