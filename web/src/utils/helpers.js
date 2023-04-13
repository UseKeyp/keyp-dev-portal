export const getExplorerBaseUrlFromName = (name) => {
  if (
    [
      'MAINNET',
      'GOERLI',
      'SEPOLIA',
      'GNOSIS',
      'MATIC',
      'MUMBAI',
      'AVALANCHE',
      'AVALANCHE-FUJI',
      'ARBITRUM',
      'ARBITRUM-NOVA',
      'OPTIMISM',
      'OPTIMISM-GOERLI',
    ].includes(name)
  ) {
    switch (name) {
      case 'MAINNET':
        return 'https://etherscan.io/'
      case 'GOERLI':
        return `https://goerli.etherscan.io/`
      case 'SEPOLIA':
        return `https://sepolia.etherscan.io/`
      case 'GNOSIS':
        return `https://blockscout.com/xdai/mainnet/`
      case 'MATIC':
        return `https://polygonscan.com/`
      case 'MUMBAI':
        return `https://mumbai.polygonscan.com/`
      case 'AVALANCHE':
        return `https://snowtrace.io/`
      case 'AVALANCHE-FUJI':
        return `https://testnet.snowtrace.io/`
      case 'ARBITRUM':
        return `https://arbiscan.io/`
      case 'OPTIMISM':
        return `https://optimistic.etherscan.io/`
      case 'OPTIMISM-GOERLI':
        return `https://goerli-optimism.etherscan.io/`
      case 'ARBITRUM-NOVA':
        return `https://explorer.arbitrum.io/`
    }
  } else {
    return `https://${name}.etherscan.io/`
  }
}

export const trimAddress = (address) => {
  if (typeof address !== 'string') return ''
  return address.substring(0, 5) + '...' + address.substring(38, 42)
}

export const isHexAddress = (address) => {
  return /^(0x)?[0-9a-f]{40}$/i.test(address)
}

export const isBrowser = typeof window !== 'undefined'

export const isMobile =
  isBrowser && window.matchMedia('(max-width: 767px)').matches

export function timeDifference(current, previous) {
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerMonth = msPerDay * 30
  const msPerYear = msPerDay * 365

  const elapsed = current - previous

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago'
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago'
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago'
  } else if (elapsed < msPerMonth) {
    return 'around ' + Math.round(elapsed / msPerDay) + ' days ago'
  } else if (elapsed < msPerYear) {
    return 'around ' + Math.round(elapsed / msPerMonth) + ' months ago'
  } else {
    return 'around ' + Math.round(elapsed / msPerYear) + ' years ago'
  }
}

export const getErrorResponse = (error, functionName) => {
  const errorText = typeof error === 'string' ? error : error.message
  const res = {
    /* eslint-disable-nextline i18next/no-literal-string */
    message: `Error auth ${functionName}(): ${errorText}`,
  }
  const ABORTED = 'aborted'
  const EXCEPTION = 'exception'
  const UNKNOWN = 'unknown error type'
  if (error.code) {
    res.code = error.code
    switch (error.code) {
      case 4001:
        res.txErrorType = ABORTED
        break
      case -32016:
        res.txErrorType = EXCEPTION
        break
      default:
        res.txErrorType = UNKNOWN
    }
  }
  return { error: res }
}
