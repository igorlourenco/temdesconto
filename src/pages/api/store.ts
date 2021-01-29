import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '../../library/firebase-admin'
import { findStoreByOwnerId } from '../../library/database-admin'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const { token } = request.headers
    const { uid } = await auth.verifyIdToken(token.toString())

    const { store, error } = await findStoreByOwnerId(uid)

    if (error) {
      return response.status(500).json({ error })
    }

    return response.status(200).json({ store })
  } catch (error) {
    return response.status(500).json({ error })
  }
}
