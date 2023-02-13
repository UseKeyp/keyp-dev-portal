import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import AppHeader from 'src/components/AppHeader/AppHeader'
import ClientCell from 'src/components/ClientCell'
import Icon from 'src/components/Icon/Icon'
import { ItemDescriptionCell } from 'src/components/ItemDescriptionCell/ItemDescriptionCell'

const ProfilePage = () => {
  const { logOut, currentUser, isAuthenticated } = useAuth()
  function getProviderIconFromCurrentUser() {
    if (!currentUser?.id) {
      return <></>
    }
    switch (currentUser.id.split('-')[0].toLowerCase()) {
      case 'discord':
        return (
          <div className="mt-1 flex">
            <Icon width="28" name="discord" />
          </div>
        )
      case 'google':
        return (
          <div className="flex">
            <Icon height="18px" width="22" name="google" />
          </div>
        )
      case 'chess':
        return (
          <div className="mt-1 flex">
            <Icon height="18" name="chess_com" />
          </div>
        )
      default:
        return (
          <div className="mt-1 flex">
            <Icon height="18px" width="18px" name="keypcircle" />
          </div>
        )
    }
  }

  return (
    <>
      <MetaTags title="Profile" description="My profile" />
      <div className="mt-8 mb-8 flex flex-row justify-between">
        <div className="flex flex-col gap-y-2 gap-x-4 sm:flex-row sm:gap-y-0">
          <Icon name="keypnameandlogo" height="48px" width="164px" />
          <h1 className="flex text-5xl font-light text-blue-1200">
            Dev Portal
          </h1>
        </div>
        {isAuthenticated && (
          <div className="my-auto flex flex-row gap-x-2 rounded-md border border-gray-400 p-2">
            {getProviderIconFromCurrentUser()}
            {currentUser?.username || <></>}
            <button
              className="text-sm font-light text-gray-400 hover:text-gray-800"
              onClick={logOut}
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="mb-12 mt-12 flex flex-col">
        <AppHeader title="Wallet" />
        <ItemDescriptionCell
          title={`Your ${
            currentUser?.username ? currentUser?.username : ''
          } Wallet Address`}
          tokenOrAddress={currentUser?.accessToken}
          description="Using Keyps OAuth creates a wallet for you. We use MPC and this wallet can be used like any other EVM compatible address."
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
          title="Access token"
          tokenOrAddress={currentUser?.accessToken}
          description="To let you try out the API right away we created an access token for the Dev Portal app. You can use this access token to test the API in Postman. Once you create, you can get an access token with the client...."
        >
          <div className="flex flex-row gap-x-1">
            <div>-&gt;</div>
            <a
              className="text-sm text-blue-1200 hover:text-blue-1600 sm:text-base"
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
        <ClientCell />
      </div>
    </>
  )
}

export default ProfilePage
