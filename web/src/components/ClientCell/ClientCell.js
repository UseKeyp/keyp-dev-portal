import { useState } from 'react'

import ConfettiExplosion from 'react-confetti-explosion'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Button from '../Button/Button.js'
import ClientCredentials from '../ClientCredentials/ClientCredentials.js'

export const QUERY = gql`
  query ClientsQuery {
    clients {
      id
      payload
      createdAt
      updatedAt
      accessLevel
    }
  }
`

// eslint-disable-next-line camelcase
const CREATE_ClIENT = gql`
  mutation CreateClientMutation {
    createClient {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  const [createClient, { loading, error }] = useMutation(CREATE_ClIENT, {
    refetchQueries: [{ query: QUERY }],
    onCompleted: () => {
      toast.success('Client created!')
    },
    onError: () => {
      setIsExploding(false)
    },
  })

  const [isExploding, setIsExploding] = useState(false)
  function handleConfettiExplosion() {
    setIsExploding(true)
    setTimeout(() => {
      setIsExploding(false)
    }, 2000)
  }

  return (
    <>
      <div className="mt-4 flex items-center gap-x-4 rounded-md border border-black p-4 sm:gap-x-8 sm:p-8">
        <div className="absolute left-0">
          {isExploding && <ConfettiExplosion duration="4400" />}
        </div>
        <div className="absolute right-0">
          {isExploding && <ConfettiExplosion duration="4400" />}
        </div>
        <Button
          fluid={true}
          variant="green"
          onClick={() => {
            createClient()
            handleConfettiExplosion()
          }}
          disabled={loading}
        >
          Create Client
        </Button>
        <div className="flex font-light text-gray-1600">
          Create a client to generate a Client ID for your app. Make sure to
          assign a Client URI and Redirect URIs.
        </div>
      </div>
      <div className="text-red-1200">{error?.message}</div>
    </>
  )
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ clients }) => {
  return (
    <div>
      {clients.map((client) => (
        <ClientCredentials key={client.id} client={client} />
      ))}
    </div>
  )
}
