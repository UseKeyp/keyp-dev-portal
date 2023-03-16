import {
  FieldError,
  Form,
  Label,
  TextField,
  Submit,
  FormError,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: ContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`
export const ExampleForm = () => {
  const [create, { error }] = useMutation(CREATE_CONTACT)

  const onSubmit = async (data) => {
    create({ variables: { input: data } })
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Label name="name" errorClassName="error">
          NAME <FieldError name="name" className="error" />
        </Label>
        <TextField
          name="name"
          placeholder="Blockchain Bob"
          validation={{ required: true, minLength: 3 }}
          errorClassName="error"
        />

        <Label name="email" errorClassName="error">
          EMAIL <FieldError name="email" className="error" />
        </Label>
        <TextField
          name="email"
          placeholder="http://domain.com/redirecturl"
          validation={{ required: true, minLength: 6 }}
          errorClassName="error"
        />

        <Label name="message" errorClassName="error">
          PRIVACY POLICY URI <FieldError name="message" className="error" />
        </Label>
        <TextField
          name="message"
          placeholder="http://domain.com/privacyurl"
          validation={{ required: true }}
          errorClassName="error"
        />
        <Submit>Save</Submit>
        <FormError
          wrapperStyle={{ color: 'red', maxWidth: '200px', textAlign: 'left' }}
          error={error}
        />
      </Form>
    </>
  )
}
