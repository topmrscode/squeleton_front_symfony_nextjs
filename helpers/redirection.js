export default (router, path) => {
  if (process.browser) {
    router.push(path)
    return null
  }
  return <div />
}
