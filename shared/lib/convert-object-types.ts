export const convertObjectTypes = (object: Record<string, any>): Record<string, any> => {
  const result = Object.entries(object).reduce(
    (acc, [key, value]) => {
      if (typeof value === 'string') {
        if (value === 'true') {
          acc[key] = true
        } else if (value === 'false') {
          acc[key] = false
        } else if (!isNaN(Number(value))) {
          acc[key] = Number(value)
        } else {
          acc[key] = value
        }
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        acc[key] = convertObjectTypes(value)
      } else {
        acc[key] = value
      }
      return acc
    },
    {} as Record<string, any>,
  )

  return result
}
