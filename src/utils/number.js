export const toFixed = (num, fixed = 0) => {
  return num ? (+num)?.toFixed(fixed) || 0 : 0
}
