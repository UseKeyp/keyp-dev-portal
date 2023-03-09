import { useState } from 'react'

import { timeDifference } from 'src/utils/helpers'

import Icon from '../Icon/Icon.js'
import Tooltip from '../Tooltip/Tooltip.js'
import URLRedirects from '../URLRedirects/URLRedirects.js'

const ClientCredentials = ({ client }) => {
  const [showEditSection, setShowEditSection] = useState(
    !client.payload.client_name
  )
  const [copySuccess, setCopySuccess] = useState('Copy ID')
  const createdAtDate = timeDifference(new Date(), new Date(client.createdAt))
  const updatedAtDate = timeDifference(new Date(), new Date(client.updatedAt))

  function handleCopy() {
    navigator.clipboard.writeText(client?.id)
    setCopySuccess('Copied!')
    setTimeout(() => {
      setCopySuccess('Click to copy key')
    }, 2000)
  }

  return (
    <div className="my-4 flex w-full flex-col overflow-auto rounded-md border border-gray-800 p-4">
      <div>
        <div key={client.id}>
          <div className="flex flex-row justify-between">
            {client.payload.client_name ? (
              <div className="mb-4 text-lg font-bold text-gray-1600">
                {client.payload.client_name}
              </div>
            ) : (
              <div className="mb-4 text-lg font-bold text-gray-1600">
                New Client
              </div>
            )}
            {showEditSection ? (
              <button
                onClick={() => {
                  setShowEditSection(false)
                }}
                className="flex font-light text-blue-1200 hover:text-blue-1600"
              >
                Close
              </button>
            ) : (
              <button
                onClick={() => setShowEditSection(true)}
                className="flex font-light text-blue-1200 hover:text-blue-1600"
              >
                Edit
              </button>
            )}
          </div>
          <div className="flex w-full flex-col justify-between gap-y-4 sm:flex-row sm:gap-y-0">
            <div className="flex flex-col">
              <div className="flex gap-x-1 text-xs font-semibold text-gray-800">
                CLIENT ID
                <Tooltip
                  id="client-id"
                  delayHideTime={250}
                  effect="solid"
                  borderColor="#C6CED2"
                  bgColor="#eef0f2"
                  position="top"
                  tooltipChild={
                    <div className="p-0.5 text-gray-2400">
                      Copy this into your app
                    </div>
                  }
                >
                  <Icon color="fill-gray-800" name="tooltip" />
                </Tooltip>
              </div>
              <div className="flex flex-col gap-x-2 sm:flex-row">
                <div className="flex font-light">{client.id}</div>
                <button
                  className="group flex"
                  onClick={() => {
                    handleCopy()
                  }}
                >
                  <Tooltip
                    id="client-secret"
                    delayHideTime={250}
                    effect="solid"
                    borderColor="#C6CED2"
                    bgColor="#eef0f2"
                    position="top"
                    tooltipChild={
                      <div className="p-0.5 text-gray-2400">{copySuccess}</div>
                    }
                  >
                    <Icon
                      color="fill-blue-1200 group-hover:fill-blue-1600 mt-1"
                      height="20"
                      width="20"
                      name="copy"
                    />
                  </Tooltip>
                </button>
              </div>
            </div>
            <div className="flex gap-x-8 sm:flex-row sm:gap-x-4">
              <div className="flex flex-col">
                <div className="flex gap-x-1 text-xs font-semibold text-gray-800">
                  CREATED
                  {/* <Tooltip
                    id="created"
                    delayHideTime={250}
                    effect="float"
                    borderColor="#C6CED2"
                    bgColor="#eef0f2"
                    position="top"
                    tooltipChild={
                      <div className="text-black">
                        Date when this client was first created
                      </div>
                    }
                  >
                    <Icon color="fill-gray-800" name="tooltip" />
                  </Tooltip> */}
                </div>
                <div className="flex font-light">{createdAtDate}</div>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-x-1 text-xs font-semibold text-gray-800">
                  LAST USED
                  {/* <Tooltip
                    id="last-used"
                    elayHideTime={250}
                    effect="float"
                    borderColor="#C6CED2"
                    bgColor="#eef0f2"
                    position="top"
                    tooltipChild={
                      <div className="text-black">
                        Date when this client was last updated
                      </div>
                    }
                  >
                    <Icon color="fill-gray-800" name="tooltip" />
                  </Tooltip> */}
                </div>
                <div className="flex font-light">{updatedAtDate}</div>
              </div>
            </div>
          </div>
          <URLRedirects client={client} showEditSection={showEditSection} />
        </div>
      </div>
      <div className="flex w-full flex-row justify-between gap-x-2">
        {/* {clientSecretSection}
        <div className="flex items-end">
          {regenerateConfirmation ? (
            regenerateConfirmationSection
          ) : (
            <Button
              variant="green"
              onClick={() => setRegenerateConfirmation(true)}
            >
              Regenerate
            </Button>
          )}
        </div> */}
      </div>
    </div>
  )
}

export default ClientCredentials
