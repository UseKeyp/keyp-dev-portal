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
  ) {
    updateClient(
      id: $id
      redirectUrls: $redirectUrls
      clientURI: $clientURI
      clientName: $clientName
      tosURI: $tosURI
      logoURI: $logoURI
      policyURI: $policyURI
    ) {
      id
    }
  }
`

const URLRedirects = ({ client, showEditSection }) => {
  const [updateClient, { loading, error }] = useMutation(UPDATE_CLIENT, {
    refetchQueries: [{ query: clientQuery }],
    onCompleted: () => {
      toast.success('Client updated')
    },
  })

  const handleSubmit = async () => {
    const redirectUrls = urls.filter((url) => url.length > 1).join(',')
    await updateClient({
      variables: {
        redirectUrls,
        clientURI,
        clientName,
        tosURI,
        logoURI,
        policyURI,
        id: client.id,
      },
    })
  }

  const initialUrls = client.payload.redirect_uris
    ? [client.payload.redirect_uris]
    : ['']
  const [urls, setUrls] = useState(['', initialUrls])
  const [clientURI, setClientURI] = useState(client.payload.client_uri)
  const [clientName, setClientName] = useState(client.payload.client_name)
  const [tosURI, setTosURI] = useState(client.payload.tos_uri)
  const [logoURI, setLogoURI] = useState(client.payload.logo_uri)
  const [policyURI, setPolicyURI] = useState(client.payload.policy_uri)
  const [showDiscardChanges, setShowDiscardChanges] = useState(false)

  useEffect(() => {
    if (
      urls !== client.payload.redirect_uris ||
      clientURI !== client.payload.client_uri ||
      clientName !== client.payload.client_name ||
      tosURI !== client.payload.tos_uri ||
      logoURI !== client.payload.logo_uri ||
      policyURI !== client.payload.policy_uri
    ) {
      setShowDiscardChanges(true)
    }
  }, [urls, clientURI, clientName, tosURI, logoURI, policyURI])

  function discardChanges() {
    setUrls(...initialUrls)
    setClientURI(client.payload.client_uri)
    setClientName(client.payload.client_name)
    setTosURI(client.payload.tos_uri)
    setLogoURI(client.payload.logo_uri)
    setPolicyURI(client.payload.policy_uri)
    setShowDiscardChanges(false)
  }
  console.log(urls)

  const handleAddURL = (index) => {
    const currentUrl = urls[index]
    if (!currentUrl.length) return alert('Please enter a URL')
    if (urls.length >= 5) {
      alert('Cannot add more than 5 URLs')
      return
    }

    if (!validateUrl(currentUrl)) {
      alert('Please enter a valid web address')
      return
    }
    setUrls([...urls.slice(0, index + 1), '', ...urls.slice(index + 1)])
  }

  const validateUrl = (url) => {
    const pattern = new RegExp(
      '^((http||https):\\/\\/.)[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$',
      'i'
    )
    return !!pattern.test(url)
  }

  const handleRemoveURL = (index) => {
    setUrls(urls.filter((_, i) => i !== index))
  }

  const handleChange = (e, index) => {
    const newUrls = [...urls]
    newUrls[index] = e.target.value
    newUrls.filter((n) => n)
    setUrls(newUrls)
  }

  return showEditSection ? (
    <div className="flex rounded-md pt-4">
      <div className="flex w-full justify-between">
        <div className="flex flex-row">
          <form className="flex flex-col">
            <div className="mb-4 flex flex-col">
              <label className="text-xs text-gray-800" name="clientName">
                Client Name
              </label>
              <TextInput
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                name="clientName"
                className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="text-xs text-gray-800" name="clientName">
                Client URI
              </label>
              <TextInput
                type="text"
                value={clientURI}
                onChange={(e) => setClientURI(e.target.value)}
                name="clientURI"
                className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="text-xs text-gray-800" name="clientName">
                Logo URI
              </label>
              <TextInput
                type="text"
                value={logoURI}
                onChange={(e) => setLogoURI(e.target.value)}
                name="logoURI"
                className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="text-xs text-gray-800" name="clientName">
                Terms of Service URI
              </label>
              <TextInput
                type="text"
                value={tosURI}
                onChange={(e) => setTosURI(e.target.value)}
                name="tosURI"
                className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="text-xs text-gray-800" name="clientName">
                Privacy Policy URI
              </label>
              <TextInput
                type="text"
                value={policyURI}
                onChange={(e) => setPolicyURI(e.target.value)}
                name="policyURI"
                className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
              />
            </div>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              fluid={true}
              variant="green"
            >
              Save Changes
            </Button>
            {showDiscardChanges ? (
              <button
                onClick={() => discardChanges()}
                type="button"
                className="mt-4 flex justify-center font-light text-red-1200"
              >
                Discard Changes
              </button>
            ) : (
              <></>
            )}
          </form>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xs text-gray-800">URL REDIRECTS</h2>
          {urls.map((url, index) => (
            <div className="mb-4 w-full" key={index}>
              <div className="flex rounded-lg bg-white">
                {index <= 3 ? (
                  <TextInput
                    className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
                    placeholder="http://domain.com/redirect-url"
                    value={url}
                    onChange={(e) => handleChange(e, index)}
                    readOnly={urls.length >= 5}
                    id={`url-${index}`}
                  />
                ) : (
                  <></>
                )}
                <div className="ml-2">
                  {index === urls.length - 1 ? (
                    <div>
                      {urls.length >= 5 ? (
                        <></>
                      ) : (
                        <Button
                          disabled={urls.length >= 5}
                          onClick={() => handleAddURL(index)}
                          classNameVariant={`${
                            urls.length >= 5 ? 'bg-red-500' : ''
                          }`}
                          variant="green"
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button
                      classNameVariant="bg-transparent border border-gray-800"
                      onClick={() => handleRemoveURL(index)}
                    >
                      <div className="text-gray-800">Remove</div>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {error?.message}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default URLRedirects
