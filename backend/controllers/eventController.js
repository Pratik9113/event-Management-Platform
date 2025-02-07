const EventModel = require("../models/EventSchema.js");

const eventController = async(req,res)=>{
    const {title, description, date, location,
        category, maxAttendees, status, image,
        isPublic, companyId, price, tags} = req.body;
    const userId = req.userId;
    if(!title || !description || !date || !location || !category){
        return res.status(400).json({message: "Please fill all the fields"});
    }
    try {
        const newEvent = new EventModel({
            title, description, date, location,
            category, organizer: userId, maxAttendees,
            status, image, isPublic, companyId, price, tags
        });
        await newEvent.save();
        res.status(201).json({success:true,data:newEvent,message: "Event created successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}


const getAllEventController = async(req,res)=>{
    try {
        const events = await EventModel.find({isPublic: true}); 
        res.status(200).json({success:true,data:events});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}


const getEventControllerForEventManager = async(req,res)=>{
    const userId = req.userId;
    try {
        const events = await EventModel.find({organizer: userId});
        res.status(200).json({success:true,data:events});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {eventController, getAllEventController, getEventControllerForEventManager};