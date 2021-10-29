import { Router } from 'express'
const router = Router()
import * as flightsCtrl from "../controllers/flights.js"

/* GET flights listing. */

// localhost:3000/flights/index
router.get('/index', flightsCtrl.index)

export {
  router
}
