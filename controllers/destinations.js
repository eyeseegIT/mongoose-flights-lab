import { Destination } from "../models/destination.js";

function newDestination(req, res) {
  Destination.find({}, function (err, destinations) {
    res.render("destinations/new", {
      title: "Add Destination",
      destinations: destinations
    })
  })
}

function create(req, res) {
  Destination.create(req.body, function (err, destination) {
    res.redirect("/destinations/new")
  })
}

function deleteDestination(req, res) {
  Destination.findByIdAndDelete(req.params.id, function(err, destination) {
    res.redirect("/destinations/new")
  })
}

export {
  newDestination as new,
  create,
  deleteDestination as delete
}