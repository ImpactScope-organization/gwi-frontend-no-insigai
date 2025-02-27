export const toJSON = (t) => {
  try {
    return JSON.parse(t)
  } catch (e) {
    return []
  }
}
