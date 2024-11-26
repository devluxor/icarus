import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import { currentDate, processAsteroids } from "utils/helpers";

dotenv.config()

const ASTEROID_API_URL = process.env.ASTEROID_API_URL
const API_KEY = process.env.API_KEY

//@desc Get Asteroids
//@route GET /api/asteroid
//@access public
export const getAsteroids = asyncHandler( async(req, res) => {
  const startDate = req.query.startDate as string || currentDate()
  const endDate = req.query.endDate as string || currentDate()

  const completeURL = 
    `${ASTEROID_API_URL}?start_date=${startDate}&end_date=${endDate}&detailed=false&api_key=${API_KEY}`

  const asteroidsRaw = await fetch(completeURL)
  const asteroidsAll = await asteroidsRaw.json()

  const asteroids = processAsteroids(asteroidsAll['near_earth_objects'])
  res.status(200).json(asteroids)
})
