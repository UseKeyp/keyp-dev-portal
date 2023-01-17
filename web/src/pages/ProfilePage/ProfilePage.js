import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import AppHeader from 'src/components/AppHeader/AppHeader'
import ClientCell from 'src/components/ClientCell'

const ProfilePage = () => {
  return (
    <>
      <MetaTags title="Profile" description="My profile" />
      <h1 className="mb-12 text-6xl font-light text-blue-1200">Dev Portal</h1>
      <AppHeader />
      <ClientCell />
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
