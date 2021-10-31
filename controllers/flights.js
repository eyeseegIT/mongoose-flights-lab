import { Flight } from "../models/flight.js"

function index(req, res) {
  Flight.find({}, function(error, flights) {
    console.log(flights)
    res.render("flights/index", {
      flights: flights,
      error: error,
      title: "List of Flights"
    })
  })
}

function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add New Flight"
  })
}

function create(req, res) { //POST new flight
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key]
  }

  const flight = new Flight(req.body)

  console.log(flight) //confirm

  flight.save(function (err) {
      if (err) return res.render('flights/new')
      res.redirect(`/flights`)
  })
}

function show(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    res.render("flights/show", {
      err: err,
      flight: flight,
      title: "Flight Details"
    })
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.tickets.push(req.body)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  createTicket
}