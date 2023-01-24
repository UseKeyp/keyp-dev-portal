import KeypManager from 'src/lib/keyp'
const KEYP_CLIENT_ID = 'dev-portal'

export const clients = async () => {
  const keyp = new KeypManager({
    clientId: KEYP_CLIENT_ID,
    accessToken: context.currentUser.accessToken,
  })
  const clients = await keyp.getClients()
  return clients
}

export const createClient = async () => {
  const keyp = new KeypManager({
    clientId: KEYP_CLIENT_ID,
    accessToken: context.currentUser.accessToken,
  })
  const client = await keyp.createClient()
  return client
}

export const updateClient = async ({ id, redirectUrls }) => {
  const keyp = new KeypManager({
    clientId: KEYP_CLIENT_ID,
    accessToken: context.currentUser.accessToken,
  })
  const client = await keyp.updateClient({ id, redirectUrls })
  console.log(client)
  return client
}
