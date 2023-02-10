const DefaultLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">
        <div className="sm:max-w-screen mx-4 max-w-7xl px-0 sm:mx-auto sm:px-4">
          <div className="mb-15 mx-4 min-h-screen md:mb-0">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
