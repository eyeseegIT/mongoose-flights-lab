import { Flight } from "../models/flight.js"
import { Destination } from "../models/destination.js"

function index(req, res) {
  Flight.find({}, function(err, flights) {
    console.log(flights)
    res.render("flights/index", {
      flights: flights,
      error: err,
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
      if (err) return res.redirect('flights/new')
      res.redirect(`/flights/${flight._id}`)
  })
}

function show(req, res) {
  Flight.findById(req.params.id) 
    .populate("currentDestinations").exec(function(err, flight) {
      Destination.find({_id: {$nin: flight.currentDestinations}}, function(err, destinationsNotPresent) {
        res.render("flights/show", {
          title: "Flight Details",
          flight: flight,
          destinationsNotPresent: destinationsNotPresent
      })
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

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function(err, flight) {
    res.redirect("/flights")
  })
}

function deleteTicket(req, res) { 
  Flight.findById(req.params.flightId, function(err, flight) {
    flight.tickets.remove({_id: req.params.ticketId})
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function addToCurrentDestinations(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.currentDestinations.push(req.body.destinationId)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function deleteCurrDest(req, res) {
  Flight.findById(req.params.flightId, function(err, flight) {
    flight.currentDestinations.remove({_id: req.params.currDestId})
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
  createTicket,
  deleteFlight as delete,
  deleteTicket,
  addToCurrentDestinations,
  deleteCurrDest
}