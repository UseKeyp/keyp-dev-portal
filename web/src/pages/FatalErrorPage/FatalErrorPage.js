let RedwoodDevFatalErrorPage = undefined
if (process.env.NODE_ENV === 'development') {
  RedwoodDevFatalErrorPage = require('@redwoodjs/web').DevFatalErrorPage
}

import { APP_DOMAIN } from 'api/src/lib/helpers'

import { useAuth } from '@redwoodjs/auth'

import Button from 'src/components/Button/Button'
import Icon from 'src/components/Icon/Icon'
import UserAccount from 'src/components/UserAccount/UserAccount'
import DefaultLayout from 'src/layouts/DefaultLayout'

export default RedwoodDevFatalErrorPage ||
  function FatalErrorPage() {
    const { isAuthenticated, currentUser, logOut } = useAuth()
    return (
      <DefaultLayout>
        <div className="mt-8 flex flex-col items-start justify-between gap-x-4 gap-y-2 sm:flex-row">
          <div className="flex flex-col gap-y-2 gap-x-4 sm:flex-row sm:gap-y-0">
            <Icon name="keypnameandlogo" height="48px" width="164px" />
            <h1 className="flex text-5xl font-light text-blue-1200">
              Dev Portal
            </h1>
          </div>
          {isAuthenticated ? (
            <UserAccount currentUser={currentUser} logOut={logOut} />
          ) : (
            <></>
          )}
        </div>
        <main className="flex h-screen items-center justify-center text-center">
          <section className="flex">
            <div className="flex flex-col items-center justify-center gap-y-4 text-center">
              <h1 className="text-2xl font-light text-gray-1200">
                Mhhh, something unexpected happened.
              </h1>
              <p className="text-lg font-light text-gray-1200">
                (There&apos;s been a 504)
              </p>
              <img
                src="/fatal-error.png"
                className="flex object-scale-down"
                alt=""
              />
              <div className="flex flex-col items-center text-lg text-gray-1200 sm:flex-row">
                <div className="flex font-light">Back to the</div>
                <a href={`${APP_DOMAIN}/account`}>
                  <Button
                    variant="transparent"
                    classNameVariant="m-2"
                    borderColor="border-blue-1200"
                    size="regular"
                    fluid={false}
                  >
                    <div className="text-blue-1200">Dashboard</div>
                  </Button>
                </a>
                <div className="flex font-light">
                  or get in touch with us on
                </div>
                <Button
                  href="https://discord.usekeyp.com/"
                  variant="transparent"
                  classNameVariant="m-2"
                  borderColor="border-blue-1200"
                  size="regular"
                  fluid={false}
                >
                  <div className="text-blue-1200">Discord</div>
                </Button>
              </div>
            </div>
          </section>
        </main>
      </DefaultLayout>
    )
  }
