import { Router } from 'express'
const router = Router()
import * as flightsCtrl from "../controllers/flights.js"

/* GET flights listing. */

// localhost:3000/flights/index - GET
router.get('/', flightsCtrl.index)

// localhost:3000/flights/new - GET
router.get("/new", flightsCtrl.new)

// localhost:3000/flights/:id - GET
router.get("/:id", flightsCtrl.show)

// localhost:3000/flights/new - POST
router.post("/", flightsCtrl.create)

// localhost:3000/flights/:id/tickets - POST
router.post("/:id/tickets", flightsCtrl.createTicket)

export {
  router
}
