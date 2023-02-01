import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import AppHeader from 'src/components/AppHeader/AppHeader'
import ClientCell from 'src/components/ClientCell'
import Icon from 'src/components/Icon/Icon'

const ProfilePage = () => {
  const { currentUser } = useAuth()
  console.log(currentUser)

  return (
    <>
      <MetaTags title="Profile" description="My profile" />
      <div className="flex flex-row items-start gap-x-4">
        <div className="flex">
          <Icon name="keypnameandlogo" height="48px" width="164px" />
        </div>
        <h1 className="mb-8 flex text-5xl font-light text-blue-1200">
          Dev Portal
        </h1>
      </div>
      <AppHeader />
      <ClientCell />
    </>
  )
}

export default ProfilePage
