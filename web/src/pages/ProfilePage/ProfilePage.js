import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import AppHeader from 'src/components/AppHeader/AppHeader'
import ClientCell from 'src/components/ClientCell'
import Icon from 'src/components/Icon/Icon'

const ProfilePage = () => {
  const { logOut, currentUser } = useAuth()
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
      </div>
      <AppHeader />
      <ClientCell />
    </>
  )
}

export default ProfilePage
