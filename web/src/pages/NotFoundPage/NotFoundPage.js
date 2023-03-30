import { Button } from '@usekeyp/components-soft-ui'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import DefaultLayout from 'src/layouts/DefaultLayout/DefaultLayout'

export default function NotFoundPage() {
  return (
    <DefaultLayout>
      <MetaTags title="No Go" description="Page not found" />
      <main className="flex h-full items-center justify-center text-center">
        <section className="flex">
          <div className="mt-8 flex flex-col items-center justify-center gap-y-4 text-center">
            <h1 className="text-2xl font-light text-gray-1200">
              Mhhh, something is missing.
            </h1>
            <p className="text-lg font-light text-gray-1200">
              (But you did find a 404)
            </p>
            <img
              src="/no-go.png"
              height="812"
              width="812"
              className="flex"
              alt="page not found"
            />
            <div className="flex flex-col items-center text-lg text-gray-1200 sm:flex-row">
              <div className="flex font-light">Back to the</div>
              <Link to={routes.profile()}>
                <Button
                  variant="transparent"
                  classNameVariant="m-2"
                  borderColor="border-blue-1200"
                  size="regular"
                  fluid={false}
                >
                  <div className="text-blue-1200">Dashboard</div>
                </Button>
              </Link>
              <div className="flex font-light">or get in touch with us on</div>
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
