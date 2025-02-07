const express = require("express");
const { eventController, getAllEventController, getEventControllerForEventManager } = require("../controllers/eventController.js");
const jwtAuth = require("../middlewares/jwtAuth.js");
const EventRouter = express.Router();

EventRouter.post("/create", jwtAuth, eventController);
EventRouter.get("/all", getAllEventController); 
EventRouter.get("/all-user",jwtAuth, getEventControllerForEventManager);

module.exports = EventRouter;