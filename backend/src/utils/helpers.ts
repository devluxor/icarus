type DestructuredAsteroid = {
  id: string, 
  name: string, 
  nasa_jpl_url: string, 
  absolute_magnitude_h: string, 
  estimated_diameter: {
    [key: string]: {[key: string]: number}
  }, 
  is_potentially_hazardous_asteroid: boolean,
}

type SimplifiedAsteroid = {
  id: string, 
  name: string, 
  date: string,
  estimatedDiameter: number, 
  absoluteMagnitude: string,
  isDangerous: boolean
}


export const processAsteroids = (asteroidDates: any) => {
  const asteroids: SimplifiedAsteroid[] = []
  const dates = Object.keys(asteroidDates)

  dates.forEach((dateKey: string) => {
    asteroidDates[dateKey].forEach(
      ({id, 
        name, 
        absolute_magnitude_h, 
        estimated_diameter,
        is_potentially_hazardous_asteroid
      }:DestructuredAsteroid) => {
      asteroids.push(
        {
          id, 
          name: name.replace(/[\(\)]/g, ''), 
          date: dateKey,
          estimatedDiameter: averageDiameter(estimated_diameter.meters),
          absoluteMagnitude: absolute_magnitude_h, 
          isDangerous: is_potentially_hazardous_asteroid 
        })
    })

  })

  return asteroids
}

export const processAsteroidDetails = (asteroid: any) => {
  const {id, name, estimated_diameter, is_potentially_hazardous_asteroid, nasa_jpl_url} = asteroid

  return {
    id,
    name: name.replace(/[\(\)]/g, ''),
    estimatedDiameter: averageDiameter(estimated_diameter.meters),
    nasaURL: nasa_jpl_url, 
    isDangerous: is_potentially_hazardous_asteroid,
  }
}

export const currentDate = () => {
  const date = new Date()
  const formattedDate = date.toISOString().split('T')[0]
  return formattedDate
}

export const averageDiameter = (estimated_diameter: any) => {
  const {estimated_diameter_min, estimated_diameter_max} = estimated_diameter

  return (estimated_diameter_min + estimated_diameter_max / 2).toFixed(2)
}
