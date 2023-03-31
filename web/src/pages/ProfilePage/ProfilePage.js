import { useState } from 'react'

import {
  AppHeader,
  ItemDescriptionCell,
  getStyledUsernameFromCurrentUser,
} from '@usekeyp/components-soft-ui'
import ConfettiExplosion from 'react-confetti-explosion'

import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import ClientCell from 'src/components/ClientCell'
import { TransferForm } from 'src/components/TransferForm/TransferForm'

const ProfilePage = () => {
  const { currentUser } = useAuth()
  const [isExploding, setIsExploding] = useState(false)

  function handleConfettiExplosion() {
    setIsExploding(true)
    setTimeout(() => {
      setIsExploding(false)
    }, 2000)
  }

  return (
    <>
      <MetaTags title="Profile" description="My profile" />
      <div className="mb-12 mt-12 flex flex-col">
        <AppHeader title="Wallet" />
        <div className="mt-2"></div>
        <ItemDescriptionCell
          tooltipID="wallet-address"
          title={
            <div className="flex flex-row gap-x-1 text-gray-1600">
              Your{' '}
              {currentUser?.username ? (
                <div className="font-bold">
                  {getStyledUsernameFromCurrentUser(currentUser, 'text-[16px]')}
                </div>
              ) : (
                ''
              )}
              Wallet Address
            </div>
          }
          tokenOrAddress={currentUser?.address}
          description="Keyp's OAuth creates a wallet for you. This wallet uses MPC and can be used like any other EVM compatible address."
        />
      </div>
      <div className="mt-12 flex flex-col">
        <AppHeader
          links={[
            {
              title: 'Postman',
              url: 'https://www.postman.com/speeding-spaceship-663022/workspace/keyp-public-workspace/collection/25667367-e1156fb2-60c3-4a42-b76b-47902a22512e?ctx=documentation',
            },
          ]}
          title="API Access Token"
        />
        <div className="mt-2"></div>
        <ItemDescriptionCell
          tooltipID="access-token"
          title="Access token"
          tokenOrAddress={currentUser?.accessToken}
          description="We created an access token for the Dev Portal app so that you can try out our API right away! You can use this token to test the API in Postman."
        >
          <div className="flex flex-row gap-x-1">
            <div>-&gt;</div>
            <a
              className="text-[16px] text-blue-1200 hover:text-blue-1600 sm:text-base"
              target="_blank"
              href="https://www.postman.com/speeding-spaceship-663022/workspace/keyp-public-workspace/collection/25667367-e1156fb2-60c3-4a42-b76b-47902a22512e?ctx=documentation"
              rel="noreferrer"
            >
              Use in Postman
            </a>
          </div>
        </ItemDescriptionCell>
      </div>
      <div className="mt-12 flex flex-col">
        <AppHeader
          title="Applications"
          links={[
            {
              title: 'Docs',
              url: 'https://docs.usekeyp.com/',
            },
          ]}
        />
        <div className="mt-2"></div>
        <div className="mb-12">
          <div className="absolute left-0">
            {isExploding && <ConfettiExplosion duration="4400" />}
          </div>
          <div className="absolute right-0">
            {isExploding && <ConfettiExplosion duration="4400" />}
          </div>
          <ClientCell onClientCreation={() => handleConfettiExplosion()} />
        </div>
      </div>
      <div className="mb-12 flex flex-col">
        <AppHeader
          title="Tools"
          links={[
            {
              title: 'Docs',
              url: 'https://docs.usekeyp.com/api',
            },
          ]}
        />
        <div className="mt-2"></div>
        <div className="flex flex-row gap-x-2">
          <TransferForm title="Transfer ERC-20" />
          <TransferForm title="Transfer ERC-721" />
        </div>
      </div>
    </>
  )
}

export default ProfilePage
