/**
 * Generic header for a studio's apps
 * @returns {JSX.Element} header component
 * @constructor
 */
const AppHeader = () => {
  return (
    <div className="flex w-full flex-row justify-between border-t border-gray-300 pt-2">
      <div className="pt-2 text-2xl font-bold text-gray-800">API Key</div>
    </div>
  )
}

export default AppHeader
