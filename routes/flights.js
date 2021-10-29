import { Router } from 'express'
const router = Router()
import * as flightsCtrl from "../controllers/flights.js"

/* GET flights listing. */

// localhost:3000/flights/index - GET
router.get('/', flightsCtrl.index)

// localhost:3000/flights/new - GET
router.get("/new", flightsCtrl.new)

// localhost:3000/flights/new - POST
router.post("/", flightsCtrl.create)

export {
  router
}
