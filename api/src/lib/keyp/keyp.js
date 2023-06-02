import fetch from 'node-fetch'

import { AuthenticationError } from '@redwoodjs/graphql-server'

import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'

var path = require('path')

let KEYP_API_URL = 'http://localhost:4001/v1'
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
    }).then((res) => {
      logger.debug({ custom: res }, 'fetchKeyp res')
      if (res.status === 401) {
        throw new AuthenticationError('UNAUTHENTICATED')
      }
      if (res.status !== 200) throw res
      return res.json()
    })
  } catch (e) {
    const errorMessage = `fetchKeyp() error`
    /* eslint-disable-next-line no-console */
    logger.error(errorMessage)
    logger.error(e)
    Sentry.captureException(errorMessage)
    throw e
  }
}

export default KeypManager
