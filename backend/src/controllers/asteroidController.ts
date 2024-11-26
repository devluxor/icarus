import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import { 
  currentDate, 
  processAsteroids,
  isValidDateFormat,
  isValidDateRange, 
  isDateRangeWithinAWeek, 
  DestructuredAsteroid
} from "../utils/helpers";

dotenv.config()

const ASTEROID_API_URL = process.env.ASTEROID_API_URL
const ASTEROID_DETAILS_API_URL = process.env.ASTEROID_DETAILS_API_URL
const API_KEY = process.env.API_KEY

//@desc Get Asteroids
//@route GET /api/asteroid
//@access public
export const getAsteroids = asyncHandler( async(req, res) => {
  const startDate = req.query.startDate as string || currentDate()
  const endDate = req.query.endDate as string || currentDate()

  if (!isValidDateFormat(startDate) || !isValidDateFormat(endDate)) {
    res.status(400)
    throw new Error('Invalid format date: must be YYYY-MM-DD')
  }

  if (!isValidDateRange(startDate, endDate)) {
    res.status(400)
    throw new Error('Start date must be earlier or equal to the end date!')
  }

  if (!isDateRangeWithinAWeek(startDate, endDate)) {
    res.status(400)
    throw new Error('Date ranges greater than a week are not allowed!')
  }

  const completeURL = 
    `${ASTEROID_API_URL}?start_date=${startDate}&end_date=${endDate}&detailed=false&api_key=${API_KEY}`

  const asteroidsRaw = await fetch(completeURL)
  const asteroidsAll = await asteroidsRaw.json()

  const asteroids = processAsteroids(asteroidsAll['near_earth_objects'])
  res.status(200).json(asteroids)
})

//@desc Get Asteroid Details
//@route GET /api/asteroid/:id
//@access public
export const getAsteroidDetails = asyncHandler( async(req, res) => {
  const asteroidID = req.params.id || ''
  const completeURL = 
    `${ASTEROID_DETAILS_API_URL}/${asteroidID}?api_key=${API_KEY}`
    
    try {
    const asteroidDetailsRaw = await fetch(completeURL)
    const asteroidDetailsAll = await asteroidDetailsRaw.json()
    const asteroidDetails = processAsteroidDetails(asteroidDetailsAll)
    res.status(200).json(asteroidDetails);
  } catch (error) {
    res.status(400).json({ 
      error: `Error fetching asteroid details: invalid asteroid id ${asteroidID}`
    })
  }
})


export const processAsteroidDetails = (asteroid: DestructuredAsteroid) => {
  const {id, name, estimated_diameter, is_potentially_hazardous_asteroid, nasa_jpl_url} = asteroid

  return {
    id,
    name: name.replace(/[\(\)]/g, ''),
    estimatedDiameter: averageDiameter(estimated_diameter.meters),
    nasaURL: nasa_jpl_url, 
    isDangerous: is_potentially_hazardous_asteroid,
  }
}

export const averageDiameter = (estimated_diameter: any) => {
  const {estimated_diameter_min, estimated_diameter_max} = estimated_diameter

  return (estimated_diameter_min + estimated_diameter_max / 2).toFixed(2)
}