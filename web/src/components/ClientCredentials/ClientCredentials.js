import { useState } from 'react'

import { Icon, Tooltip } from '@usekeyp/components-soft-ui'

import { isMobile, timeDifference } from 'src/utils/helpers'

import URLRedirects from '../URLRedirects/URLRedirects.js'

const ClientCredentials = ({ client }) => {
  const [showEditSection, setShowEditSection] = useState(
    client?.updatedAt === client?.createdAt
  )
  const [copySuccess, setCopySuccess] = useState('Copy Client ID')
  const createdAtDate = timeDifference(new Date(), new Date(client.createdAt))
  const updatedAtDate = timeDifference(new Date(), new Date(client.updatedAt))

  function handleCopy() {
    navigator.clipboard.writeText(client?.id)
    setCopySuccess('Copied!')
    setTimeout(() => {
      setCopySuccess('Click to copy key')
    }, 2000)
  }

  function parseClientID(id) {
    if (id.length > 20 && isMobile) {
      return id.substring(0, 20) + '...'
    } else {
      return id
    }
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
              <div className="flex items-center gap-x-1 text-sm font-semibold text-gray-800">
                CLIENT ID
                <Tooltip
                  id="client-id"
                  delayHideTime={250}
                  effect="solid"
                  borderColor="#C6CED2"
                  bgColor="#eef0f2"
                  position="top"
                  tooltipChild={
                    <div className="font-normal text-gray-2400">
                      Copy this into your app
                    </div>
                  }
                >
                  <Icon color="fill-gray-800" name="tooltip" />
                </Tooltip>
              </div>
              <div className="flex flex-row justify-between border border-gray-100 bg-gray-100 p-2 sm:gap-x-2">
                <div className="flex items-center font-normal">
                  {parseClientID(client?.id)}
                </div>
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
                      color="fill-blue-1200 group-hover:fill-blue-1600 mt-1 h-[32px] w-[22px] sm:h-[16px] sm:w-[13px]"
                      name="copy"
                    />
                  </Tooltip>
                </button>
              </div>
            </div>
            <div className="flex gap-x-8 sm:flex-row sm:gap-x-4">
              <div className="flex flex-col">
                <div className="flex gap-x-1 text-sm font-semibold text-gray-800">
                  CREATED
                </div>
                <div className="flex font-light">{createdAtDate}</div>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-x-1 text-sm font-semibold text-gray-800">
                  MODIFIED
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
