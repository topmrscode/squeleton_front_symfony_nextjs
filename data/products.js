import api from "@/utils/api"

export const createProduct = async (data) => {
  const { title, description, price, imageUrl } = data
  // use form data because of upload file
  const bodyFormData = new FormData()
  bodyFormData.append("title", title)
  bodyFormData.append("description", description)
  bodyFormData.append("price", price)
  bodyFormData.append("imageUrl", imageUrl)

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  }

  try {
    const result = await api.post("/admin/products", bodyFormData, config)
    return result.data
  } catch (error) {
    if (error.response && error.response.data.message) {
      return error.response.data
    }
    return error
  }
}

export const listProducts = async () => {
  try {
    const result = await api.get("/products")
    console.log(result)
    return result.data
  } catch (error) {
    if (error.response && error.response.data.message) {
      return error.response.data
    }
    return error
  }
}
