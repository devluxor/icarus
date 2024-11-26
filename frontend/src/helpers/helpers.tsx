import { DateRange, Asteroid } from "../@types/types"

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
  const secondsPerHour = 3600
  const hoursPerDay = 24
  // difference of days in seconds
  let timeDifference =(new Date(endDate).getTime() - new Date(startDate).getTime()) / 1000
  // converts from seconds to days
  timeDifference /= (secondsPerHour * hoursPerDay) 
  return Math.abs(Math.round(timeDifference)) <= daysInAWeek
}

export const sortAsteroidsByName = (asteroids: Asteroid[], setter: (asteroid: Asteroid[]) => void) => {
  if (!asteroids) return;

  const sortedAsteroids = [...asteroids];
  sortedAsteroids.sort((a, b) => {
    const partsNameA = a.name.split(' ', 2)
    const partsNameB = b.name.split(' ', 2)

    const [digitsA, restA] = [parseInt(partsNameA[0], 10), partsNameA[1]]
    const [digitsB, restB] = [parseInt(partsNameB[0], 10), partsNameB[1]]

    if (digitsA === digitsB) {
      return restA.localeCompare(restB)
    }

    return digitsA - digitsB
  });

  setter(sortedAsteroids)
}