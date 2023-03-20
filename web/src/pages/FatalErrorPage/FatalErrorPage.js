let RedwoodDevFatalErrorPage = undefined
if (process.env.NODE_ENV === 'development') {
  RedwoodDevFatalErrorPage = require('@redwoodjs/web').DevFatalErrorPage
}

import { APP_DOMAIN } from 'api/src/lib/helpers'

import Button from 'src/components/Button/Button'
import DefaultLayout from 'src/layouts/DefaultLayout/DefaultLayout'

export default RedwoodDevFatalErrorPage ||
  function FatalErrorPage() {
    return (
      <DefaultLayout>
        <main className="mt-8 flex items-center justify-center text-center">
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
                className="flex"
                height="812"
                width="812"
                alt="fatal error"
              />
              <div className="flex flex-col items-center text-lg text-gray-1200 sm:flex-row">
                <div className="flex font-light">Back to the</div>
                <a href={`${APP_DOMAIN}/profile`}>
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
