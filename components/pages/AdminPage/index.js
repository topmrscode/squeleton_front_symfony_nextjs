import React, { useState } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

import redirection from "@/helpers/redirection"
import {
  ERROR_INVALID_PRICE,
  ERROR_INVALID_FILE_TYPE,
} from "@/helpers/validations"
import { createProduct } from "@/data/products"

import SliderComponent from "@/components/common/SliderComponent/index"
import AddProductForm from "./AddProductForm"

import { NoteMinor } from "@shopify/polaris-icons"
import {
  Page,
  Layout,
  Button,
  DropZone,
  Stack,
  Thumbnail,
  Caption,
} from "@shopify/polaris"
const { Section } = Layout

const validImageTypes = ["image/gif", "image/jpeg", "image/png"]
const LABEL_ADD_PRODUCT = "Ajouter un produit"

const AdminPage = () => {
  const user = useSelector((state) => state.auth.user)
  const router = useRouter()
  const [file, setFile] = useState()
  const [sheetIsActive, setSheetIsActive] = useState(false)
  const [error, setError] = useState(null)
  const [defaultValues, setDefaultValues] = useState({
    title: null,
    description: null,
    price: null,
    imageUrl: null,
  })

  const handleDropZoneDrop = (_dropFiles, acceptedFiles, _rejectedFiles) =>
    setFile((file) => acceptedFiles[0])

  const toggleSheetActive = () => {
    setSheetIsActive(!sheetIsActive)
    setDefaultValues({
      title: null,
      description: null,
      price: null,
      imageUrl: null,
    })
    setFile()
  }

  if (!user) return redirection(router, "/login")
  if (user && !user.roles.includes("ROLE_ADMIN"))
    return redirection(router, "/")

  const onSubmit = (data) => {
    data.imageUrl = file
    data.price = parseFloat(data.price)
    if (isNaN(data.price)) {
      return setError({
        type: "manual",
        message: ERROR_INVALID_PRICE,
      })
    }
    const addProduct = async () => {
      const result = await createProduct(data)
      if (result.code) {
        return setError({
          type: "manual",
          message: result.message,
        })
      }
    }
    addProduct()
  }
  const fileUpload = !file && <DropZone.FileUpload />
  const uploadedFile = file && (
    <Stack>
      <Thumbnail
        size="small"
        alt={file.name}
        source={
          validImageTypes.indexOf(file.type) > 0
            ? window.URL.createObjectURL(file)
            : NoteMinor
        }
      />
      <div>
        {file.name.length < 45 ? file.name : "image"}
        <Caption>{file.size} bytes</Caption>
      </div>
    </Stack>
  )

  return (
    <Page fullWidth title={"Espace Admin"}>
      <Layout>
        <Section oneHalf>
          <Button primary onClick={toggleSheetActive}>
            {LABEL_ADD_PRODUCT}
          </Button>
          {sheetIsActive && (
            <SliderComponent
              active={sheetIsActive}
              handleClose={toggleSheetActive}
              labelAction={LABEL_ADD_PRODUCT}
              content={
                <AddProductForm
                  error={error}
                  defaultValues={defaultValues}
                  onSubmit={onSubmit}
                  dropZone={
                    <DropZone
                      accept="image/*"
                      type="image"
                      errorOverlayText={ERROR_INVALID_FILE_TYPE}
                      allowMultiple={false}
                      onDrop={handleDropZoneDrop}
                    >
                      {uploadedFile} {fileUpload}
                    </DropZone>
                  }
                />
              }
            />
          )}
        </Section>
      </Layout>
    </Page>
  )
}

export default AdminPage
