import { useState } from 'react'

import ConfettiExplosion from 'react-confetti-explosion'

import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import AppHeader from 'src/components/AppHeader/AppHeader'
import ClientCell from 'src/components/ClientCell'
import Icon from 'src/components/Icon/Icon'
import { ItemDescriptionCell } from 'src/components/ItemDescriptionCell/ItemDescriptionCell'
import { TransferForm } from 'src/components/TransferForm/TransferForm'
import UserAccount, {
  getStyledUsernameFromCurrentUser,
} from 'src/components/UserAccount/UserAccount'

const ProfilePage = () => {
  const { logOut, currentUser, isAuthenticated } = useAuth()
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
      <div className="mt-8 mb-8 flex flex-col justify-between gap-y-8 sm:flex-row">
        <div className="flex flex-col gap-y-2 gap-x-4 sm:flex-row sm:gap-y-0">
          <Icon name="keypnameandlogo" height="48px" width="164px" />
          <h1 className="flex text-5xl font-light text-blue-1200">
            Dev Portal
          </h1>
        </div>
        {isAuthenticated && (
          <UserAccount currentUser={currentUser} logOut={logOut} />
        )}
      </div>
      <div className="mb-12 mt-12 flex flex-col">
        <AppHeader title="Wallet" />
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
        <div className="mb-8">
          <div className="absolute left-0">
            {isExploding && <ConfettiExplosion duration="4400" />}
          </div>
          <div className="absolute right-0">
            {isExploding && <ConfettiExplosion duration="4400" />}
          </div>
          <ClientCell
            onClientCreation={() => handleConfettiExplosion()}
          />
        </div>
      </div>
      <div className="mt-12 mb-8 flex flex-col">
        <AppHeader
          title="Tools"
          links={[
            {
              title: 'Docs',
              url: 'https://docs.usekeyp.com/api',
            },
          ]}
        />
        <div className="mb-4 flex flex-row gap-x-2">
          <TransferForm title="Transfer ERC-20" />
          <TransferForm title="Transfer ERC-721" />
        </div>
      </div>
    </>
  )
}

export default ProfilePage
