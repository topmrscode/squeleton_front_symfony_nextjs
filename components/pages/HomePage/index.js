import React, { useState } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import styles from "./home-component.module.css"

import redirection from "@/helpers/redirection"

import { Page, Card, Layout, TextField, Stack } from "@shopify/polaris"
const { Section } = Layout

const Home = ({ products }) => {
  const user = useSelector((state) => state.auth.user)
  const router = useRouter()
  const [valueQuantity, setValueQuantity] = useState("1")
  const changeQuantity = (value) => setValueQuantity(value)

  console.log(products)
  if (!user) return redirection(router, "/login")

  const generateProductCard = (products) => {
    const { title, description, imageUrl, price } = products

    return (
      <Card
        primaryFooterAction={{
          content: "Ajouter au panier",
          onAction: () => {
            console.log(product)
          },
        }}
      >
        <img
          alt=""
          width="100%"
          height="100%"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          src={imageUrl}
        />

        <Card.Section title={title}>{description}</Card.Section>
        <Card.Section title="Prix">
          <Stack distribution="fill">
            <Stack.Item fill>
              <p className={styles["label-price"]}>
                <strong>{price}€</strong>
              </p>
            </Stack.Item>
            <Stack.Item>
              <div className={styles["select-quantity"]}>
                <TextField
                  label="Quantite"
                  type="number"
                  value={valueQuantity}
                  onChange={changeQuantity}
                ></TextField>
              </div>
            </Stack.Item>
          </Stack>
        </Card.Section>
      </Card>
    )
  }
  return (
    <Page fullWidth title={"Choisissez votre produit"}>
      <Layout>
        <Section oneHalf>
          {products
            .filter((_, index) => {
              return index % 2 == 0
            })
            .map((product) => {
              return generateProductCard(product)
            })}
        </Section>
        <Section oneHalf>
          {products
            .filter((_, index) => {
              return index % 2 !== 0
            })
            .map((product) => {
              return generateProductCard(product)
            })}
        </Section>
      </Layout>
    </Page>
  )
}

export default Home
