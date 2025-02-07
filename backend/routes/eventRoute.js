const express = require("express");
const { eventController, getAllEventController, getEventControllerForEventManager, registerStudentForEventController } = require("../controllers/eventController.js");
const jwtAuth = require("../middlewares/jwtAuth.js");
const EventRouter = express.Router();

EventRouter.post("/create", jwtAuth, eventController);
EventRouter.get("/all",jwtAuth, getAllEventController); 
EventRouter.get("/all-user",jwtAuth, getEventControllerForEventManager);
EventRouter.post("/register", jwtAuth, registerStudentForEventController);

module.exports = EventRouter;