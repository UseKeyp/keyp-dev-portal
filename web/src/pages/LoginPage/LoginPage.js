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
    let login_provider = ''
    if (type.includes('KEYP')) {
      parsedType = 'OAUTH2_SERVER_REDWOOD'
      login_provider = `&login_provider=${type.split('KEYP_')[1]}`
    }
    const response = await signUp({ type: parsedType })
    if (response.url) {
      window.location = response.url + login_provider
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
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-2 flex">
        <h1 className="flex flex-col items-center">
          <Icon height="120px" width="327px" name="keypnameandlogo" />
          <div className="flex text-2xl font-light text-blue-1200">
            Dev Portal
          </div>
        </h1>
      </div>
      <div className="mt-8 flex flex-col gap-y-2">
        <div className="font-light text-gray-1200">Log In or Sign Up</div>
        {/*<Button onClick={() => onSubmitSignUp('NODE_OIDC')} textColor="text-black" borderColor="border border-black"*/}
        {/*                  fluid="true">*/}
        {/*  <div>node_oidc</div>*/}
        {/*</Button>*/}
        {/*<Button onClick={() => onSubmitSignUp('OAUTH2_SERVER_REDWOOD')} textColor="text-black" borderColor="border border-black"*/}
        {/*        fluid="true">*/}
        {/*  <div>oauth2 server</div>*/}
        {/*</Button>*/}
        <Button
          onClick={() => onSubmitSignUp('DISCORD')}
          classNameVariant="hover:bg-[#5865F2] hover:border-[#5865F2] w-[327px]"
          borderColor="border-[#E5E7EB]"
          fluid={false}
          alt="discord"
        >
          <Icon name="discord" />
        </Button>
        <Button
          onClick={() => onSubmitSignUp('KEYP_GOOGLE')}
          classNameVariant="hover:bg-[#4285F4] hover:border-[#4285F4] w-[327px]"
          borderColor="border-[#E5E7EB]"
          fluid={false}
          alt="google"
        >
          <Icon name="google" />
        </Button>
        <Button
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
        </Button>
        {errorText && <div className="mt-2">{errorText}</div>}
      </div>
      <h4 className="mt-6">
        <a className="mr-2 text-sm font-light text-blue-1200" href="/">
          Terms of Service
        </a>
        ·
        <a className="ml-2 text-sm font-light text-blue-1200" href="/">
          Privacy Policy
        </a>
      </h4>
    </div>
  )
}

export default LoginPortal
