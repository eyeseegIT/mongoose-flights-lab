import { Flight } from "../models/flight.js"

function index(req, res) {
  Flight.find({}, function(error, flights) {
    console.log(flights)
    res.render("flights/index", {
      flights: flights,
      error: error
    })
  })
}

function newFlight(req, res) {
  res.render("flights/new")
}

function create(req, res) { //POST new flight
  const flight = new Flight(req.body)

  console.log(flight) //confirm

  flight.save(function (err) {
      if (err) return res.render('flights/new')
      res.redirect(`/flights`)
  })
}
// function create(req, res) {
//   console.log(req.body)
//   Flight.create(req.body, function(error, flight) {
//     res.redirect("/flights")
//   })
  // const flight = new Flight(req.body)
  // flight.save(function(err) {
  //   if (err) {
  //     return res.redirect("/flights/new")
  //   }
  //   res.redirect("/flights/index")
  // })




export {
  index,
  newFlight as new,
  create
}