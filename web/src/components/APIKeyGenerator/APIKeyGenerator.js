import { useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

import Button from '../Button/Button.js'
import Icon from '../Icon/Icon.js'
import Tooltip from '../Tooltip/Tooltip.js'

const APIKeyGenerator = (props) => {
  const [apiKey, setApiKey] = useState(props.clientSecret)
  const [copySuccess, setCopySuccess] = useState('Click to copy key')
  const [regenerateConfirmation, setRegenerateConfirmation] = useState(false)
  let clientSecretSection

  async function generateAPIKey() {
    const apiKey = uuidv4()
    setApiKey('CS-' + apiKey)
    setRegenerateConfirmation(false)
  }

  function handleCopy() {
    navigator.clipboard.writeText(apiKey)
    setCopySuccess('Copied!')
    setTimeout(() => {
      setCopySuccess('Click to copy key')
    }, 2000)
  }

  let regenerateConfirmationSection = (
    <div className="flex flex-col">
      <div className="font-light">
        Regenerate your API Key? The current one wil become invalid.
      </div>
      <div className="flex flex-row justify-end gap-x-2">
        <Button variant="green" onClick={() => generateAPIKey()}>
          Confirm
        </Button>
        <Button
          onClick={() => setRegenerateConfirmation(false)}
          size="regular"
          borderColor="border-gray-300"
          variant="transparent"
          textColor="text-gray-800"
        >
          Cancel
        </Button>
      </div>
    </div>
  )

  if (apiKey) {
    clientSecretSection = (
      <div className="flex h-fit w-fit rounded-md bg-red-100 p-2">
        <div className="flex flex-col">
          <div className="flex gap-x-1 text-red-1200">
            Secret
            <div className="mt-1 flex">
              <Tooltip
                id="secret-text"
                delayHideTime={250}
                effect="float"
                borderColor="#C6CED2"
                bgColor="#eef0f2"
                position="top"
                tooltipChild={
                  <div className="text-black">Placeholder text</div>
                }
              >
                <Icon color="fill-red-1200" name="tooltip" />
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-row gap-x-2">
            <div className="flex font-light">{apiKey}</div>
            <button
              className="flex"
              onClick={() => {
                handleCopy()
              }}
            >
              <Tooltip
                id="client-secret"
                delayHideTime={250}
                effect="float"
                borderColor="#C6CED2"
                bgColor="#eef0f2"
                position="top"
                tooltipChild={<div className="text-black">{copySuccess}</div>}
              >
                <Icon color="fill-red-1200" name="copy" />
              </Tooltip>
            </button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex w-full flex-col gap-y-4 overflow-auto rounded-md border border-gray-800 p-2">
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col">
          <div className="flex gap-x-1 text-xs text-gray-800">
            CLIENT ID
            <Tooltip
              id="client-id"
              delayHideTime={250}
              effect="float"
              borderColor="#C6CED2"
              bgColor="#eef0f2"
              position="top"
              tooltipChild={<div className="text-black">Placeholder text</div>}
            >
              <Icon color="fill-gray-800" name="tooltip" />
            </Tooltip>
          </div>
          <div className="flex font-light">{props.clientID}</div>
        </div>
        <div className="flex gap-x-3">
          <div className="flex flex-col">
            <div className="flex text-xs text-gray-800">CREATED BY</div>
            <div className="flex font-light">{props.createdBy}</div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-x-1 text-xs text-gray-800">
              CREATED
              <Tooltip
                id="created"
                delayHideTime={250}
                effect="float"
                borderColor="#C6CED2"
                bgColor="#eef0f2"
                position="top"
                tooltipChild={
                  <div className="text-black">Placeholder text</div>
                }
              >
                <Icon color="fill-gray-800" name="tooltip" />
              </Tooltip>
            </div>
            <div className="flex font-light">{props.created}</div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-x-1 text-xs text-gray-800">
              LAST USED
              <Tooltip
                id="last-used"
                elayHideTime={250}
                effect="float"
                borderColor="#C6CED2"
                bgColor="#eef0f2"
                position="top"
                tooltipChild={
                  <div className="text-black">Placeholder text</div>
                }
              >
                <Icon color="fill-gray-800" name="tooltip" />
              </Tooltip>
            </div>
            <div className="flex font-light">{props.lastUsed}</div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between gap-x-2">
        {clientSecretSection}
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
        </div>
      </div>
    </div>
  )
}

export default APIKeyGenerator
