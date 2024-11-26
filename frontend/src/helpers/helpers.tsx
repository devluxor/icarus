import { DateRange } from "../@types/types"

export const currentDate = ():string => {
  const date = new Date()
  const formattedDate = date.toISOString().split('T')[0]
  return formattedDate
}

export const isValidDateRange = (dateRange:DateRange) => {
  const {startDate, endDate} = dateRange

  const epochStartDate = new Date(startDate).getTime()
  const epochEndDate = new Date(endDate).getTime()

  return epochStartDate <= epochEndDate
}

export const isDateRangeWithinAWeek = ({startDate, endDate}: DateRange) => {
  const daysInAWeek = 7
  let daysOfDifference =(new Date(endDate).getTime() - new Date(startDate).getTime()) / 1000
  daysOfDifference /= (60 * 60 * 24) // converts from milliseconds to days
  return Math.abs(Math.round(daysOfDifference)) <= daysInAWeek
}