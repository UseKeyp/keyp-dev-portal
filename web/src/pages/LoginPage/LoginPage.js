import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { routes, navigate, useParams } from '@redwoodjs/router'

import Button from 'src/components/Button/Button'
import Icon from 'src/components/Icon/Icon'
import { saveRedirectTo } from 'src/providers/redirection'
import { useToast } from 'src/providers/toast'

const LoginPortal = () => {
  const { signUp, isAuthenticated, reauthenticate } = useAuth()
  const { error, redirectTo } = useParams()
  const { toast } = useToast()
  const [errorText, setErrorText] = React.useState('')
  const getErrorText = (error) => {
    if (error === 'expired') return `Session expired, please log in again.`
  }

  const onSubmitSignUp = async (type) => {
    let parsedType = type
    let loginProvider = ''
    if (type.includes('KEYP')) {
      parsedType = 'KEYP'
      loginProvider = `&login_provider=${type.split('KEYP_')[1]}`
    }
    const response = await signUp({ type: parsedType })
    if (response.url) {
      window.location = response.url + loginProvider
    } else {
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    if (redirectTo) {
      saveRedirectTo(redirectTo) && reauthenticate()
    }
  }, [redirectTo, reauthenticate])

  useEffect(() => {
    if (error) setErrorText(getErrorText(error))
  }, [error])

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.profile())
    }
  }, [isAuthenticated])

  return (
    <div className="flex h-screen flex-col justify-center sm:items-center">
      <div className="max-w-2 sm:justify-middle flex justify-start">
        <h1 className="flex flex-col items-start gap-x-4 gap-y-2 text-center sm:flex-row sm:items-center mb-20">
          <Icon height="60px" width="200px" name="keypnameandlogo" />
          <div className="flex text-6xl font-light text-blue-1200 mb-0 sm:mb-2">
            Dev Portal
          </div>
        </h1>
      </div>
      <div className="mt-8 flex flex-col gap-y-4">
        <div className="text-start text-lg font-light text-gray-1600">
          Log In or Sign Up
        </div>
        <Button
          onClick={() => onSubmitSignUp('KEYP_DISCORD')}
          classNameVariant="hover:bg-[#5865F2] hover:border-[#5865F2]"
          borderColor="border-[#E5E7EB]"
          fluid={true}
          alt="discord"
        >
          <div className="group flex flex-row items-center gap-x-4 hover:text-white">
            <div className="flex sm:pl-4">
              <Icon name="discord" />
            </div>
            <div className="mr-60 flex font-light text-gray-1200 group-hover:text-white sm:mr-48">
              Discord
            </div>
          </div>
        </Button>
        <Button
          onClick={() => onSubmitSignUp('KEYP_GOOGLE')}
          classNameVariant="hover:bg-[#4285F4] hover:border-[#4285F4] w-[327px]"
          borderColor="border-[#E5E7EB]"
          fluid={true}
          alt="google"
        >
          <Icon name="google" />
        </Button>
        {/* <Button
          onClick={() => onSubmitSignUp('KEYP_TWITTER')}
          classNameVariant="hover:bg-[#1DA1F2] hover:border-[#1DA1F2]"
          borderColor="border-[#E5E7EB]"
          fluid={true}
          alt="twitter"
        >
          <div className="flex justify-center">
            <Icon height="300px" width="400px" name="twitter"></Icon>
          </div>
        </Button>
        <Button
          onClick={() => onSubmitSignUp('KEYP_GITHUB')}
          classNameVariant="hover:bg-black hover:border-[#6c9d41]"
          borderColor="border-[#E5E7EB]"
          fluid={true}
        >
          <div className="flex justify-center">
            <Icon
              height="300px"
              width="400px"
              color="fill-[#24292f] group-hover:fill-white"
              name="github"
            ></Icon>
          </div>
        </Button>
        <Button
          onClick={() => onSubmitSignUp('KEYP_APPLE')}
          classNameVariant="hover:bg-black hover:border-black"
          borderColor="border-[#E5E7EB]"
          fluid={true}
          alt="apple"
        >
          <div className="flex justify-center">
            <Icon name="apple"></Icon>
          </div>
        </Button> */}
        {process.env.NODE_ENV !== 'prod' ? (
          <Button
            onClick={() => onSubmitSignUp('KEYP_NODE_OIDC')}
            classNameVariant="hover:bg-[#005285] hover:border-[#005285]"
            borderColor="border-[#E5E7EB]"
            fluid={true}
            alt="discord"
          >
            <div className="group flex flex-row items-center gap-x-4 hover:text-white">
              <div className="flex sm:pl-4">
                <Icon height="24px" width="24px" name="keypcircle" />
              </div>
              <div className="mr-48 flex font-light text-gray-1200 group-hover:text-white sm:mr-36">
                Test Provider
              </div>
            </div>
          </Button>
        ) : (
          <></>
        )}
        {errorText && <div className="mt-2">{errorText}</div>}
        <h4 className="mt-20 text-center">
          <a
            className="mr-4 text-sm font-light text-blue-1200"
            target="_blank"
            href="https://www.usekeyp.com/terms-of-use-privacy-policy#Terms-of-Use"
            rel="noreferrer"
          >
            Terms of Service
          </a>
          ·
          <a
            className="ml-4 text-sm font-light text-blue-1200"
            target="_blank"
            href="https://www.usekeyp.com/terms-of-use-privacy-policy#Privacy-Policy"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
        </h4>
      </div>
    </div>
  )
}

export default LoginPortal
