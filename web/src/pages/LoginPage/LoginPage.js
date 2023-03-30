import { useEffect } from 'react'

import { Button, Icon } from '@usekeyp/components-soft-ui'

import { useAuth } from '@redwoodjs/auth'
import { routes, navigate, useParams } from '@redwoodjs/router'

import { MoreAccordion } from 'src/components/MoreAccordion/MoreAccordion'
import { saveRedirectTo } from 'src/providers/redirection'
import { useToast } from 'src/providers/toast'

const LoginPortal = () => {
  const { signUp, isAuthenticated, reauthenticate } = useAuth()
  const { error, redirectTo } = useParams()
  const { toast } = useToast()
  const [errorText, setErrorText] = React.useState('')
  const [loading, setLoading] = React.useState('')

  const getErrorText = (error) => {
    if (error === 'expired') return `Session expired, please log in again.`
  }

  const onSubmitSignUp = async (type) => {
    setLoading(type)
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
      setLoading('')
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
    <div className="flex h-screen flex-col justify-center">
      <div className="max-w-2 flex sm:justify-center">
        <h1 className="mb-20 flex flex-col gap-x-4 gap-y-2 text-center sm:flex-row">
          <Icon height="60px" width="200px" name="keypnameandlogo" />
          <div className="mb-0 flex text-6xl font-light text-blue-1200 sm:mb-2">
            Dev Portal
          </div>
        </h1>
      </div>
      <div className="flex flex-col items-start gap-y-4 sm:items-center">
        <div className="flex w-full flex-col sm:w-[320px]">
          <div className="pb-4 text-[16px] font-light text-gray-1600">
            Log In or Sign Up
          </div>
          <Button
            onClick={() => onSubmitSignUp('KEYP_DISCORD')}
            disabled={loading === 'KEYP_DISCORD'}
            classNameVariant={`${
              loading === 'KEYP_DISCORD'
                ? 'bg-[#5865F2] border-[#5865F2] sm:w-[320px]'
                : 'hover:bg-[#5865F2] hover:border-[#5865F2] sm:w-[320px]'
            }`}
            borderColor="border-[#E5E7EB]"
            fluid={true}
            position="start"
            alt="discord"
          >
            <div
              className={`${
                loading === 'KEYP_DISCORD'
                  ? 'group flex flex-row gap-x-4 text-white'
                  : 'group flex flex-row gap-x-4 hover:text-white'
              }`}
            >
              <div className="flex pl-2">
                <Icon height="24" width="24" loading={loading} name="discord" />
              </div>
              <div
                className={`${
                  loading === 'KEYP_DISCORD'
                    ? 'flex font-light text-white'
                    : 'flex font-light text-gray-1200 group-hover:text-white'
                }`}
              >
                Discord
              </div>
            </div>
          </Button>
        </div>
        <Button
          onClick={() => onSubmitSignUp('KEYP_GOOGLE')}
          disabled={loading === 'KEYP_GOOGLE'}
          classNameVariant={`${
            loading === 'KEYP_GOOGLE'
              ? 'bg-[#4285F4] border-[#4285F4] sm:w-[320px]'
              : 'hover:bg-[#4285F4] hover:border-[#4285F4] sm:w-[320px]'
          }`}
          borderColor="border-[#E5E7EB]"
          fluid={true}
          position="start"
          alt="google"
        >
          <div
            className={`${
              loading === 'KEYP_GOOGLE'
                ? 'group flex flex-row items-center gap-x-6 text-white sm:gap-x-4'
                : 'group flex flex-row items-center gap-x-6 hover:text-white sm:gap-x-4'
            }`}
          >
            <div className="flex pl-1.5">
              <Icon height="24" loading={loading} name="google" />
            </div>
            <div
              className={`${
                loading === 'KEYP_GOOGLE'
                  ? 'flex font-light text-white'
                  : 'flex font-light text-gray-1200 group-hover:text-white'
              }`}
            >
              Google
            </div>
          </div>
        </Button>
        <Button
          onClick={() => onSubmitSignUp('KEYP_TWITTER')}
          classNameVariant={`${
            loading === 'KEYP_TWITTER'
              ? 'bg-[#4285F4] border-[#4285F4] sm:w-[320px]'
              : 'hover:bg-[#4285F4] hover:border-[#4285F4] sm:w-[320px]'
          }`}
          disabled={loading === 'KEYP_TWITTER'}
          borderColor="border-[#E5E7EB]"
          fluid={true}
          position="start"
          alt="twitter"
        >
          <div
            className={`${
              loading === 'KEYP_TWITTER'
                ? 'group flex flex-row items-center gap-x-6 text-white sm:gap-x-4'
                : 'group flex flex-row items-center gap-x-6 hover:text-white sm:gap-x-4'
            }`}
          >
            <div className="flex pl-2">
              <Icon height="24" loading={loading} name="twitter" />
            </div>
            <div
              className={`${
                loading === 'KEYP_TWITTER'
                  ? 'flex font-light text-white'
                  : 'flex font-light text-gray-1200 group-hover:text-white'
              }`}
            >
              Twitter
            </div>
          </div>
        </Button>
        {!['staging', 'prod'].includes(process.env.ENVIRONMENT) ? (
          <Button
            onClick={() => onSubmitSignUp('KEYP_NODE_OIDC')}
            disabled={loading === 'KEYP_NODE_OIDC'}
            classNameVariant={`${
              loading === 'KEYP_NODE_OIDC'
                ? 'bg-[#005285] border-[#005285] sm:w-[320px]'
                : 'hover:bg-[#005285] hover:border-[#005285] sm:w-[320px]'
            }`}
            borderColor="border-[#E5E7EB]"
            fluid={true}
            position="start"
            alt="discord"
          >
            <div
              className={`${
                loading === 'KEYP_NODE_OIDC'
                  ? 'group flex flex-row items-center gap-x-4 text-white'
                  : 'group flex flex-row items-center gap-x-4 hover:text-white'
              }`}
            >
              <div className="flex pl-2">
                <Icon
                  height="24px"
                  width="24px"
                  name="keypcircle"
                  loading={loading}
                />
              </div>
              <div
                className={`${
                  loading === 'KEYP_NODE_OIDC'
                    ? 'flex font-light text-white'
                    : 'flex font-light text-gray-1200 group-hover:text-white'
                }`}
              >
                Test Provider
              </div>
            </div>
          </Button>
        ) : (
          <></>
        )}
        {errorText && <div className="mt-2">{errorText}</div>}
        <div className="flex w-full flex-col sm:w-[320px]">
          <MoreAccordion title="More">
            <div className="flex gap-x-2 pl-3">
              <Button
                onClick={() => onSubmitSignUp('KEYP_CHESS')}
                disabled={loading === 'KEYP_CHESS'}
                classNameVariant={`${
                  loading === 'KEYP_CHESS'
                    ? 'bg-[#6c9d41] border-[#6c9d41] justify-center'
                    : 'hover:bg-[#6c9d41] hover:border-[#6c9d41] justify-center'
                }`}
                borderColor="border-[#E5E7EB]"
                size="square"
                fluid={false}
                position="start"
                alt="chess"
              >
                <div
                  className={`${
                    loading === 'KEYP_CHESS'
                      ? 'group flex flex-row items-center text-white'
                      : 'group flex flex-row items-center hover:text-white'
                  }`}
                >
                  <div className="flex">
                    <Icon
                      height="24"
                      width="24"
                      loading={loading}
                      name="chess_pawn"
                    />
                  </div>
                </div>
              </Button>
              <Button
                onClick={() => onSubmitSignUp('KEYP_TWITCH')}
                disabled={loading === 'KEYP_TWITCH'}
                classNameVariant={`${
                  loading === 'KEYP_TWITCH'
                    ? 'bg-[#5865F2] border-[#5865F2] justify-center'
                    : 'hover:bg-[#5865F2] hover:border-[#5865F2] justify-center'
                }`}
                borderColor="border-[#E5E7EB]"
                fluid={false}
                size="square"
                position="start"
                alt="discord"
              >
                <div className="group flex flex-row gap-x-4 hover:text-white">
                  <div className="flex">
                    <Icon
                      height="24"
                      width="24"
                      loading={loading}
                      name="twitch_logo_purple"
                    />
                  </div>
                </div>
              </Button>
            </div>
          </MoreAccordion>
          <div className="mt-2 flex items-center gap-x-1 text-[9px] text-gray-800">
            Powered by{' '}
            <div className="pt-0.5">
              <Icon
                color="fill-[#B0B6C1]"
                height="10.5px"
                width="30px"
                name="keypnameandlogogray"
              />
            </div>
          </div>
        </div>
        <h4 className="mt-20 w-full justify-center text-center">
          <a
            className="mr-4 text-[12px] font-light text-blue-1200"
            target="_blank"
            href="https://www.usekeyp.com/terms-of-use-privacy-policy#Terms-of-Use"
            rel="noreferrer"
          >
            Terms of Service
          </a>
          ·
          <a
            className="ml-4 text-[12px] font-light text-blue-1200"
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
