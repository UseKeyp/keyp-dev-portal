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
  const keyp = new KeypManager({
    clientId: KEYP_CLIENT_ID,
    accessToken: context.currentUser.accessToken,
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
  console.log(client)
  return client
}
