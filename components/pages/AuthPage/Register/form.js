import { useForm, Controller } from "react-hook-form"
import {
  FormLayout,
  TextField,
  PageActions,
  Form,
  InlineError,
} from "@shopify/polaris"
import { ERROR_INVALID_EMAIL, REGEX_EMAIL } from "@/helpers/validations"
import {
  ERROR_INVALID_PASSWORD,
  REGEX_PASSWORD,
} from "../../../../helpers/validations"

export default function RegisterForm({
  error,
  defaultValues,
  onSubmit,
  onLogin,
}) {
  const { control, handleSubmit, errors } = useForm()
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout>
        <InlineError message={error && error.message}></InlineError>
        <Controller
          control={control}
          name="email"
          as={<TextField label="Adresse email" />}
          defaultValue={defaultValues.email}
          rules={{
            required: "Requis",
            pattern: {
              value: REGEX_EMAIL,
              message: ERROR_INVALID_EMAIL,
            },
          }}
          error={errors.email && errors.email.message}
        />
        <Controller
          control={control}
          name="password"
          as={<TextField type="password" label="Mot de passe" />}
          rules={{
            required: "Requis",
            pattern: {
              value: REGEX_PASSWORD,
              message: ERROR_INVALID_PASSWORD,
            },
          }}
          defaultValue={defaultValues.password}
          error={errors.password && errors.password.message}
        />
        <Controller
          control={control}
          name="passwordConfirmation"
          as={
            <TextField type="password" label="Confirmation du mot de passe" />
          }
          rules={{ required: "Requis" }}
          defaultValue={defaultValues.passwordConfirmation}
          error={
            errors.passwordConfirmation && errors.passwordConfirmation.message
          }
        />
        <PageActions
          primaryAction={{
            content: "Se connecter",
            submit: true,
          }}
          secondaryActions={[
            {
              content: "J'ai deja un compte'",
              onAction: onLogin,
            },
          ]}
        />
      </FormLayout>
    </Form>
  )
}
