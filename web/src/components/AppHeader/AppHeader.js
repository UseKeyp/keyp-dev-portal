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
        <a
          target="_blank"
          href="https://docs.usekeyp.com/oauth"
          className="flex text-sm hover:text-blue-1600"
          rel="noreferrer"
        >
          Integration Guide
        </a>
        <a
          href="https://docs.usekeyp.com/"
          target="_blank"
          className="flex text-sm hover:text-blue-1600"
          rel="noreferrer"
        >
          Read the Docs
        </a>
      </div>
    </div>
  )
}

export default AppHeader
