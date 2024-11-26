import Express, { Router } from "express";
import { getAsteroids } from '../controllers/asteroidController'

const asteroidRouter: Router = Express.Router()

asteroidRouter.get('/', getAsteroids)

export default asteroidRouter