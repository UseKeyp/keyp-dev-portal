import { AuthenticationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import KeypManager from 'src/lib/keyp'
const KEYP_CLIENT_ID = 'dev-portal'

export const clients = async () => {
  const user = await db.user.findUnique({
    where: { id: context.currentUser.id },
    select: { accessToken: true },
  })
  const keyp = new KeypManager({
    clientId: KEYP_CLIENT_ID,
    accessToken: user.accessToken,
  })
  let clients
  try {
    clients = await keyp.getClients()
  } catch (e) {
    if (e instanceof AuthenticationError) {
      throw new AuthenticationError('UNAUTHENTICATED')
    }
  }
  return clients
}

export const createClient = async () => {
  const user = await db.user.findUnique({
    where: { id: context.currentUser.id },
    select: { accessToken: true },
  })
  const keyp = new KeypManager({
    clientId: KEYP_CLIENT_ID,
    accessToken: user.accessToken,
  })
  const client = await keyp.createClient()
  return client
}

export const updateClient = async ({
  id,
  redirectUrls,
  clientURI,
  clientName,
  tosURI,
  logoURI,
  policyURI,
  network,
}) => {
  const user = await db.user.findUnique({
    where: { id: context.currentUser.id },
    select: { accessToken: true },
  })
  const keyp = new KeypManager({
    clientId: KEYP_CLIENT_ID,
    accessToken: user.accessToken,
  })
  const client = await keyp.updateClient({
    id,
    redirectUrls,
    clientURI,
    clientName,
    tosURI,
    logoURI,
    policyURI,
    network,
  })
  return client
}
