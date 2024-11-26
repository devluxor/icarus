import Express, { Router } from "express";
import { getAsteroids, getAsteroidDetails } from '../controllers/asteroidController'
import validateDateRange from "../middleware/validateDateRange";

const asteroidRouter: Router = Express.Router()

asteroidRouter.get('/', validateDateRange, getAsteroids)
asteroidRouter.get('/:id', getAsteroidDetails)

export default asteroidRouter