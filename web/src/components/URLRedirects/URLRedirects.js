import React, { useEffect, useState } from 'react'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Button from 'src/components/Button/Button'
import { QUERY as clientQuery } from 'src/components/ClientCell'
import TextInput from 'src/components/TextInput/TextInput'

const UPDATE_CLIENT = gql`
  mutation UpdateClientMutation(
    $id: String!
    $redirectUrls: String!
    $clientURI: String
    $clientName: String
    $tosURI: String
    $logoURI: String
    $policyURI: String
    $network: String!
  ) {
    updateClient(
      id: $id
      redirectUrls: $redirectUrls
      clientURI: $clientURI
      clientName: $clientName
      tosURI: $tosURI
      logoURI: $logoURI
      policyURI: $policyURI
      network: $network
    ) {
      id
    }
  }
`

const URLRedirects = ({ client, showEditSection }) => {
  const [updateClient, { error }] = useMutation(UPDATE_CLIENT, {
    refetchQueries: [{ query: clientQuery }],
    onCompleted: () => {
      toast.success('Client updated')
    },
  })

  const handleSubmit = async () => {
    for (let u of urls) {
      if (!validateUrl(u) && u.length > 1) {
        setClientSideError('Redirect URL should be a valid web address')
        return
      }
    }

    let redirectUrls = urls.filter((url) => url.length > 1).join(',')
    await updateClient({
      variables: {
        redirectUrls,
        clientURI,
        clientName,
        tosURI,
        logoURI,
        policyURI,
        id: client.id,
        network,
      },
    })
    setShowDiscardChanges(false)
  }

  let initialUrls =
    client.payload.redirect_uris.length >= 1 &&
    client.payload.redirect_uris[0] !== ''
      ? [client.payload.redirect_uris]
      : ['']

  if (initialUrls[0] !== '' && initialUrls.length >= 1) {
    initialUrls = [].concat('', ...initialUrls)
  }

  // The length is 6 because we add an empty string to the start of the array
  const MAX_REDIRECT_URLS = 6
  const [urls, setUrls] = useState(initialUrls)
  const [clientURI, setClientURI] = useState(
    client.payload.client_uri ? client.payload.client_uri : ''
  )
  const [clientName, setClientName] = useState(
    client.payload.client_name ? client.payload.client_name : ''
  )
  const [tosURI, setTosURI] = useState(
    client.payload.tos_uri ? client.payload.tos_uri : ''
  )
  const [logoURI, setLogoURI] = useState(
    client.payload.logo_uri ? client.payload.logo_uri : ''
  )
  const [policyURI, setPolicyURI] = useState(
    client.payload.policy_uri ? client.payload.policy_uri : ''
  )
  const [network, setNetwork] = useState(
    client.payload.network ? client.payload.network : ''
  )
  const [showDiscardChanges, setShowDiscardChanges] = useState(false)
  const [clientSideError, setClientSideError] = useState('')

  useEffect(() => {
    if (
      urls.length !== initialUrls.length ||
      urls[0] !== initialUrls[0] ||
      clientURI !== client.payload.client_uri ||
      clientName !== client.payload.client_name ||
      tosURI !== client.payload.tos_uri ||
      logoURI !== client.payload.logo_uri ||
      policyURI !== client.payload.policy_uri
    ) {
      setShowDiscardChanges(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls, clientURI, clientName, tosURI, logoURI, policyURI])

  function discardChanges() {
    initialUrls =
      client.payload.redirect_uris.length >= 1 &&
      client.payload.redirect_uris[0] !== ''
        ? [client.payload.redirect_uris]
        : ['']

    if (initialUrls[0] !== '' && initialUrls.length >= 1) {
      initialUrls = [].concat('', ...initialUrls)
    }

    setUrls(initialUrls)
    setClientURI(client.payload.client_uri ? client.payload.client_uri : '')
    setClientName(client.payload.client_name ? client.payload.client_name : '')
    setTosURI(client.payload.tos_uri ? client.payload.tos_uri : '')
    setLogoURI(client.payload.logo_uri ? client.payload.logo_uri : '')
    setPolicyURI(client.payload.policy_uri ? client.payload.policy_uri : '')
    setShowDiscardChanges(false)
    setClientSideError('')
  }

  const handleAddURL = async (index) => {
    const currentUrl = urls[index]
    if (!currentUrl.length) {
      setClientSideError('Please enter a URL')
      return
    }
    if (urls.length >= MAX_REDIRECT_URLS) {
      setClientSideError('Cannot add more than 5 URLs')
      return
    }

    if (!validateUrl(currentUrl)) {
      setClientSideError('Redirect URL should be a valid web address')
      return
    }
    let redirectUrls = urls.filter((url) => url.length > 1).join(',')
    await updateClient({
      variables: {
        redirectUrls,
        network,
        id: client.id,
      },
    })
    setUrls(['', ...urls.slice(0, index + 1), ...urls.slice(index + 1)])
    setClientSideError('')
  }

  const validateUrl = (url) => {
    const pattern = new RegExp(
      '(http(s)?:\\/\\/.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)',
      'i'
    )
    return (
      !!pattern.test(url) ||
      url.startsWith('localhost') ||
      url.startsWith('0.0.0.0:') ||
      url.startsWith('http://localhost') ||
      url.startsWith('https://localhost')
    )
  }

  const handleRemoveURL = async (index) => {
    setUrls(urls.filter((_, i) => i !== index))
    urls.splice(index, 1)
    let redirectUrls = urls
      .filter((url) => url.length > 1 && validateUrl(url))
      .join(',')
    await updateClient({
      variables: {
        redirectUrls,
        network,
        id: client.id,
      },
    })
  }

  const handleChange = (e, index) => {
    const newUrls = [...urls]
    newUrls[index] = e.target.value
    newUrls.filter((n) => n)
    setUrls(newUrls)
  }
  const handleNetworkChange = async (network) => {
    for (let u of urls) {
      if (!validateUrl(u) && u.length > 1) {
        setClientSideError(
          'Not all of your URL Redirects are valid. Please check your URLs before changing networks.'
        )
        return
      }
    }
    let redirectUrls = urls.filter((url) => url.length > 1).join(',')
    setNetwork(network)
    await updateClient({
      variables: {
        network,
        redirectUrls,
        id: client.id,
      },
    })
  }

  return showEditSection ? (
    <div className="flex rounded-md pt-4">
      <div className="flex w-full flex-col gap-x-4 sm:flex-row">
        <form className="flex max-w-xl grow flex-col">
          <div className="mb-4 flex flex-col">
            <div className="text-xs font-semibold text-gray-800">
              Client Network
            </div>
            <select
              className="mb-4 h-[48px] w-full rounded-lg border border-gray-400 bg-white p-2 placeholder-gray-400"
              name="networks"
              id="networks"
              value={network}
              onChange={(e) => handleNetworkChange(e.target.value)}
            >
              {[
                'matic',
                'mainnet',
                'gnosis',
                'mumbai',
                'goerli',
                'arbitrum',
                'arbitrum-nova',
                'optimism',
              ].map((network) => (
                <option key={network} value={network}>
                  {network}
                </option>
              ))}
            </select>
            <div className="text-xs font-semibold text-gray-800">
              Client Name
            </div>
            <TextInput
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <div className="text-xs font-semibold text-gray-800">
              Client URI
            </div>
            <TextInput
              type="text"
              value={clientURI}
              onChange={(e) => setClientURI(e.target.value)}
              name="clientURI"
              className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <div className="text-xs font-semibold text-gray-800">Logo URI</div>
            <TextInput
              type="text"
              value={logoURI}
              onChange={(e) => setLogoURI(e.target.value)}
              name="logoURI"
              className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <div className="text-xs font-semibold text-gray-800">
              Terms of Service URI
            </div>
            <TextInput
              type="text"
              value={tosURI}
              onChange={(e) => setTosURI(e.target.value)}
              name="tosURI"
              className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <div className="text-xs font-semibold text-gray-800">
              Privacy Policy URI
            </div>
            <TextInput
              type="text"
              value={policyURI}
              onChange={(e) => setPolicyURI(e.target.value)}
              name="policyURI"
              className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
            />
          </div>
          <div className="flex flex-row gap-x-4">
            {showDiscardChanges ? (
              <Button
                fluid={true}
                borderColor="border-red-1200"
                variant="red"
                onClick={() => discardChanges()}
              >
                <div className="font-extrabold text-red-1200">Discard</div>
              </Button>
            ) : (
              <></>
            )}
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!showDiscardChanges}
              fluid={true}
              variant="green"
              textColor={showDiscardChanges ? 'text-white' : 'text-gray-800'}
              classNameVariant={
                showDiscardChanges
                  ? ''
                  : 'text-gray-800 bg-white hover:bg-white border border-gray-400'
              }
            >
              <div className="font-extrabold">Save</div>
            </Button>
          </div>
        </form>
        <div className="mt-4 flex grow flex-col sm:mt-0">
          <h2 className="text-xs font-semibold text-gray-800">URL REDIRECTS</h2>
          {urls.map((url, index) => (
            <div
              key={index}
              className={`w-full ${
                index === 0 && urls.length >= MAX_REDIRECT_URLS ? '' : 'mb-8'
              }`}
            >
              <div className="flex rounded-lg bg-white">
                {index === 0 && urls.length >= MAX_REDIRECT_URLS ? (
                  <></>
                ) : (
                  <TextInput
                    className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-300"
                    variant={
                      urls.length >= MAX_REDIRECT_URLS || index > 0
                        ? 'bg-gray-200 focus:border-gray-300 focus:transition-none'
                        : 'bg-white'
                    }
                    placeholder="http://domain.com/redirect-url"
                    value={url}
                    onChange={(e) => handleChange(e, index)}
                    readOnly={urls.length >= MAX_REDIRECT_URLS || index > 0}
                    id={`url-${index}`}
                  />
                )}
                <div className="ml-2">
                  {index === 0 ? (
                    <div>
                      {urls.length >= MAX_REDIRECT_URLS ? (
                        <></>
                      ) : (
                        <Button
                          disabled={
                            !showDiscardChanges ||
                            urls.length >= MAX_REDIRECT_URLS
                          }
                          onClick={() => handleAddURL(index)}
                          classNameVariant={`${
                            urls.length >= MAX_REDIRECT_URLS ||
                            !showDiscardChanges
                              ? 'border border-gray-800'
                              : ''
                          }`}
                          variant={`${
                            urls.length >= MAX_REDIRECT_URLS ||
                            !showDiscardChanges
                              ? 'white'
                              : 'green'
                          }`}
                        >
                          <div
                            className={`${
                              urls.length >= MAX_REDIRECT_URLS ||
                              !showDiscardChanges
                                ? 'text-gray-800'
                                : 'text-white'
                            }`}
                          >
                            <div className="font-extrabold">Add</div>
                          </div>
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button
                      classNameVariant="bg-transparent border border-red-1200"
                      onClick={() => handleRemoveURL(index)}
                    >
                      <div className="font-extrabold text-red-1200">Remove</div>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-y-4 text-red-1200">
            {error?.message}
            {clientSideError}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default URLRedirects
