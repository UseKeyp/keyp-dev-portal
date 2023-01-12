import { useAuth } from '@redwoodjs/auth'
import { routes, Link, useLocation } from '@redwoodjs/router'

const DefaultLayout = ({ children }) => {
  const { isAuthenticated, logOut, currentUser } = useAuth()
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">
        <div className="sm:max-w-screen mx-4 max-w-7xl px-0 sm:mx-auto sm:px-4">
          <header className="relative mb-8 mt-4 w-full">
            <div className="flex flex-row justify-between">
              <div className="flex">
                {isAuthenticated ? (
                  <button
                    className="mx-4 font-light text-blue-1200"
                    onClick={logOut}
                  >
                    Log Out
                  </button>
                ) : (
                  pathname !== '/login' && (
                    <Link
                      className="mx-4 font-light text-blue-1200"
                      to={routes.login()}
                    >
                      Log In
                    </Link>
                  )
                )}
              </div>
              <div className="flex font-light text-blue-1200">
                {currentUser?.username}
              </div>
            </div>
          </header>
          <div className="mb-15 mx-4 min-h-screen md:mb-0">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
