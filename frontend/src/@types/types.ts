export type DateRange = {
  startDate: string,
  endDate: string
}

export type Asteroid = {
  id: string, 
  name: string,
  estimatedDiameter: number,
  date: string, 
  nasaURL: string, 
  absoluteMagnitude: string,
  isDangerous: boolean
}