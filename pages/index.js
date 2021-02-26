import HomePage from "@/components/pages/HomePage"
import { listProducts } from "@/data/products"

export default function Home({ products }) {
  return <HomePage products={products} />
}

export async function getStaticProps() {
  const products = await listProducts()
  if (products.code) {
    return {
      props: {
        products: products.message,
      },
    }
  }

  return {
    props: {
      products,
    },
  }
}
