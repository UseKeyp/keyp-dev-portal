import {
  FieldError,
  Form,
  Label,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import URLRedirects from 'src/components/URLRedirects/URLRedirects'

import Button from '../Button/Button.js'
import ClientCredentials from '../ClientCredentials/ClientCredentials.js'
import Icon from '../Icon/Icon.js'
import Tooltip from '../Tooltip/Tooltip.js'

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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const UPDATE_ClIENT = gql`
  mutation UpdateClientMutation($id: String!, $redirectUrls: String!) {
    updateClient(id: $id, redirectUrls: $redirectUrls) {
      id
    }
  }
`

export const Success = ({ clients }) => {
  const [updateClient, { loading, error }] = useMutation(UPDATE_ClIENT, {
    onCompleted: () => {
      toast.success('Client updated!')
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    updateClient({ variables: data })
  }

  return (
    <div>
      {clients.map((client) => (
        <>
          <ClientCredentials client={client} />
        </>
      ))}
    </div>
  )
}
