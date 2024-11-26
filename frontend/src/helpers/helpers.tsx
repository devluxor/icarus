export const currentDate = ():string => {
  const date = new Date()
  const formattedDate = date.toISOString().split('T')[0]
  return formattedDate
}