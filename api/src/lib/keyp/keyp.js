import fetch from 'node-fetch'

import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'

var path = require('path')

let KEYP_API_URL = 'http://localhost:3001/v1'
if (process.env.ENVIRONMENT === 'staging')
  KEYP_API_URL = 'https://api.staging-env.usekeyp.com/v1'
if (process.env.ENVIRONMENT === 'prod')
  KEYP_API_URL = 'https://api.usekeyp.com/v1'

const validateConfigs = ({ accessToken, clientId }) => {
  if (!accessToken) throw 'No accessToken provided'
  if (!clientId) throw 'No clientId provided'
}

class KeypManager {
  constructor({ clientId, accessToken }) {
    this.clientId = clientId
    this.accessToken = accessToken
    validateConfigs(this)
  }

  createClient = () => {
    return fetchKeyp({
      path: 'clients',
      method: 'POST',
      accessToken: this.accessToken,
    })
  }
  getClients = () => {
    return fetchKeyp({ path: 'clients', accessToken: this.accessToken })
  }
  updateClient = async ({
    id,
    redirectUrls,
    clientURI,
    clientName,
    tosURI,
    logoURI,
    policyURI,
    network,
  }) => {
    const list = redirectUrls.split(',').map((url) => url.trim())
    return fetchKeyp({
      path: `clients/${id}`,
      method: 'PATCH',
      body: JSON.stringify({
        redirect_uris: list,
        clientURI,
        clientName,
        tosURI,
        logoURI,
        policyURI,
        network,
      }),
      accessToken: this.accessToken,
    })
  }

  transferErc721 = async ({ tokenAddress, toAddress, network, tokenId }) => {
    const tokenType = 'ERC721'
    return fetchKeyp({
      path: 'tokens/transfers',
      method: 'POST',
      body: JSON.stringify({
        tokenId,
        tokenAddress,
        toAddress,
        tokenType,
        network,
      }),
      accessToken: this.accessToken,
    })
  }

  transferErc20 = async ({ toAddress, amount, network, tokenAddress }) => {
    const tokenType = 'ERC20'
    return fetchKeyp({
      path: 'tokens/transfers',
      method: 'POST',
      body: JSON.stringify({
        toAddress,
        tokenAddress,
        tokenType,
        amount,
        network,
      }),
      accessToken: this.accessToken,
    })
  }
}

export const fetchKeyp = async ({
  path: pathArg,
  body,
  method: methodArg,
  accessToken,
}) => {
  try {
    let method = 'GET'
    if (methodArg) method = methodArg
    if (!['POST', 'GET', 'DELETE', 'PUT', 'PATCH'].includes(method))
      throw 'Invalid method'
    if (!path) throw 'No path provided'
    const url = path.join(KEYP_API_URL, pathArg)
    return await fetch(url, {
      method,
      body,
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...(body && { 'Content-Type': 'application/json' }),
      },
    })
  } catch (e) {
    const errorMessage = `fetchKeyp() ${e}`
    /* eslint-disable-next-line no-console */
    console.error(e)
    logger.error(errorMessage)
    Sentry.captureException(errorMessage)
  }
}

export default KeypManager
