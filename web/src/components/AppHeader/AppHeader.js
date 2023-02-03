/**
 * Generic header for a studio's apps
 * @returns {JSX.Element} header component
 * @constructor
 */
const AppHeader = () => {
  return (
    <div className="flex w-full flex-row justify-between border-t border-gray-300 pt-2">
      <div className="text-2xl font-bold text-gray-800">API Keys</div>
      <div className="flex flex-row gap-x-4 font-light text-blue-1200">
        <div className="flex text-sm">Integration Guide</div>
        <a
          href="https://docs.usekeyp.com/"
          target="_blank"
          className="flex text-sm"
          rel="noreferrer"
        >
          Read the Docs
        </a>
      </div>
    </div>
  )
}

export default AppHeader
