import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import { 
  currentDate, 
  processAsteroids,
  processAsteroidDetails
} from "../utils/helpers";

dotenv.config()

const ASTEROID_API_URL = process.env.ASTEROID_API_URL;
const ASTEROID_DETAILS_API_URL = process.env.ASTEROID_DETAILS_API_URL;
const API_KEY = process.env.API_KEY;

//@desc Get Asteroids
//@route GET /api/asteroid
//@access public
export const getAsteroids = asyncHandler(async(req, res) => {
  const startDate = req.headers['startDate'] as string || currentDate();
  const endDate = req.headers['endDate'] as string || currentDate();

  const completeURL = 
    `${ASTEROID_API_URL}?start_date=${startDate}&end_date=${endDate}&detailed=false&api_key=${API_KEY}`;

  const asteroidsRaw = await fetch(completeURL);
  const asteroidsAll = await asteroidsRaw.json();

  const asteroids = processAsteroids(asteroidsAll['near_earth_objects']);
  res.status(200).json(asteroids);
})

//@desc Get Asteroid Details
//@route GET /api/asteroid/:id
//@access public
export const getAsteroidDetails = asyncHandler( async(req, res) => {
  const asteroidID = req.params.id || '';
  const completeURL = 
    `${ASTEROID_DETAILS_API_URL}/${asteroidID}?api_key=${API_KEY}`;
    
    try {
    const asteroidDetailsRaw = await fetch(completeURL);
    const asteroidDetailsAll = await asteroidDetailsRaw.json();
    const asteroidDetails = processAsteroidDetails(asteroidDetailsAll);
    res.status(200).json(asteroidDetails);
  } catch (error) {
    res.status(400).json({ 
      error: `Error fetching asteroid details: invalid asteroid id ${asteroidID}`
    })
  }
});


