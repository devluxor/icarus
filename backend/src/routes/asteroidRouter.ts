import Express, { Router } from "express";
import { getAsteroids, getAsteroidDetails } from '../controllers/asteroidController'

const asteroidRouter: Router = Express.Router()

asteroidRouter.get('/', getAsteroids)
asteroidRouter.get('/:id', getAsteroidDetails)

export default asteroidRouter