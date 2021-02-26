import { useForm, Controller } from "react-hook-form"
import {
  FormLayout,
  TextField,
  PageActions,
  Form,
  InlineError,
} from "@shopify/polaris"
import { ERROR_INVALID_EMAIL, REGEX_EMAIL } from "@/helpers/validations"

export default function LoginForm({
  error,
  defaultValues,
  onSubmit,
  onRegister,
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
          rules={{ required: "Requis" }}
          defaultValue={defaultValues.password}
          error={errors.password && errors.password.message}
        />
        <PageActions
          primaryAction={{
            content: "Se connecter",
            submit: true,
          }}
          secondaryActions={[
            {
              content: "Je n'ai pas encore de compte",
              onAction: onRegister,
            },
          ]}
        />
      </FormLayout>
    </Form>
  )
}
