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

export const Empty = ({ onClientCreation }) => {
  const [createClient, { loading, error }] = useMutation(CREATE_ClIENT, {
    refetchQueries: [{ query: QUERY }],
    onCompleted: () => {
      toast.success('Client created!')
      onClientCreation()
    },
  })

  return (
    <>
      <div className="mt-4 flex flex-col items-center gap-y-8 gap-x-4 rounded-md border border-gray-800 p-4 sm:flex-row sm:gap-y-0 sm:gap-x-8 sm:p-6">
        <Button
          fluid={true}
          variant={`${loading ? 'grey' : 'green'}`}
          onClick={() => {
            createClient()
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
