import React, { useState } from 'react'
import { useAuth } from '../library/auth'
import useSWR from 'swr'
import fetcher from '../utilitaries/fetcher'
import { useRouter } from 'next/router'
import firebase from '../library/firebase'

const Dashboard = () => {
  const router = useRouter()
  const auth = useAuth()

  const [logo, setLogo] = useState()

  const { user } = auth

  const { data } = useSWR(user ? ['/api/store', user.token] : null, fetcher)

  if (!data) {
    return (<h1>carregando dados...</h1>)
  }

  const { store } = data

  firebase.storage().ref().child(`stores/${store.logo}`).getDownloadURL().then((url) => {
    setLogo(url)
  })

  if (!store) {
    router.push('/home')
    return (<h1>saindo...</h1>)
  }

  return (
      <>
        <h1>{store.storeName}</h1>
         <img src={logo} alt={'a'}/>
      </>)
}

export default Dashboard
