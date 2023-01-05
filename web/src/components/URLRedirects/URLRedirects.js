import TextInput from 'src/components/TextInput/TextInput'

import Button from '../Button/Button.js'
import Icon from '../Icon/Icon.js'
import Tooltip from '../Tooltip/Tooltip.js'

const URLRedirects = () => {
  return (
    <div className="flex w-full flex-col gap-y-4 overflow-auto rounded-md border border-gray-800 p-2">
      <div className="flex w-full flex-row justify-between">
        <div className="flex w-full flex-col">
          <div className="flex gap-x-1 text-xs text-gray-800">
            URL REDIRECTS
            <Tooltip
              id="url-redirects"
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
          <div className="flex flex-row gap-x-4">
            <TextInput
              variant="w-full"
              placeholder="http://domain.com/redirect-url"
            />
            <Button variant="green">Add</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default URLRedirects
