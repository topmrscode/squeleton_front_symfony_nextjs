import { useForm, Controller } from "react-hook-form"
import {
  FormLayout,
  TextField,
  Form,
  InlineError,
  PageActions,
} from "@shopify/polaris"

export default function AddProductForm({
  error,
  defaultValues,
  onSubmit,
  dropZone,
}) {
  const { control, handleSubmit, errors } = useForm()

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout>
          <InlineError message={error && error.message}></InlineError>
          <Controller
            control={control}
            name="title"
            as={<TextField label="Titre" />}
            defaultValue={defaultValues.title}
            rules={{
              required: "Requis",
            }}
            error={errors.title && errors.title.message}
          />
          <Controller
            control={control}
            name="description"
            as={<TextField label="Description" />}
            defaultValue={defaultValues.description}
            rules={{
              required: "Requis",
            }}
            error={errors.description && errors.description.message}
          />
          <Controller
            control={control}
            name="price"
            as={<TextField label="Prix" />}
            defaultValue={defaultValues.price}
            rules={{
              required: "Requis",
            }}
            error={errors.price && errors.price.message}
          />
          <p>Image</p>
          {dropZone}
          <PageActions
            primaryAction={{
              content: "Ajouter un produit",
              submit: true,
            }}
          />
        </FormLayout>
      </Form>
    </>
  )
}
