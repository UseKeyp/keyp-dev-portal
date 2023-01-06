import { useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import APIKeyGenerator from 'src/components/APIKeyGenerator/APIKeyGenerator'
import AppHeader from 'src/components/AppHeader/AppHeader'
import URLRedirects from 'src/components/URLRedirects/URLRedirects'
const ProfilePage = () => {
  const { currentUser } = useAuth()
  const [apiKey] = useState(generateAPIKey())
  function generateAPIKey() {
    // TODO: Check if user has already generated an API key--if not, generate one
    const apiKey = uuidv4()
    return apiKey
  }
  return (
    <>
      <MetaTags title="Profile" description="My profile" />
      <h1 className="mb-12 text-6xl font-light text-blue-1200">Dev Portal</h1>
      <AppHeader />
      <div className="mt-4 flex"></div>
      <APIKeyGenerator
        clientSecret={apiKey}
        clientID={currentUser?.id}
        createdBy={currentUser?.email}
        created="created date"
        lastUsed="last used"
      />
      <div className="mt-4 flex">
        <URLRedirects />
      </div>
      <div className="mt-4 flex flex-row gap-x-4 font-light text-blue-1200">
        <div className="flex text-sm">Integration Guide</div>
        <a
          href="https://docs.usekeyp.com/"
          target="_blank"
          className="flex text-sm"
          rel="noreferrer"
        >
          Read the Docs
        </a>
      </div>
    </>
  )
}

export default ProfilePage
