import adminModel from "../models/adminModel.js";
import eventModel from "../models/eventModel.js";
import professorModel from "../models/professorModel.js";
import studentModel from "../models/studentModel.js";


//post method only for admin to add new events
export const addEventController = async (req, res) => {
    try {
        //validation
        if (!req.body.name) {
            return res.send({ message: "Event name is Required" });
        }
        if (!req.body.date) {
            return res.send({ message: "Event Date is Required" });
        }
        if (!req.body.description) {
            return res.send({ message: "Brief description of event is Required" });
        }

        //check events in database
        const exisiting_event = await eventModel.findOne({ name: req.body.name });

        //exisiting event
        if (exisiting_event) {
            return res.status(200).send({
                success: false,
                message: "Event is already exist"
            });
        }

        const eve = new eventModel({
            name: req.body.name,
            date: req.body.date,
            description: req.body.description
        });
        eve.save();

        //sending success response
        res.status(201).send({
            success: true,
            message: "New event added in events database",
            eve
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in adding new events",
            error
        });
    }
}

//post method to add participate as student, professor or admin in it
export const addParticipateController = async (req, res) => {
    try {
        //validation
        if (!req.body.id) {
            return res.send({ message: "Student id is Required" });
        }
        if (!req.body.event_id) {
            return res.send({ message: "Event id is Required" });
        }

        //finding events
        const event = await eventModel.findById(req.body.event_id);

        if (event.participate.includes(req.body.id)) {
            res.status(201).send({
                success: true,
                message: "You are already register for this event"
            });
        }

        else {
            const addParticipate = await eventModel.findByIdAndUpdate(req.body.event_id, { participate: [...event.participate, req.body.id] });
            addParticipate.save();

            res.status(201).send({
                success: true,
                message: "Participate details send to admin"
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in adding participater in event",
            error
        });
    }
}

//post method for display all events
export const displayEventsController = async (req, res) => {
    try {
        const event1 = await eventModel.find();
        res.status(201).send({
            success: true,
            message: "All events are send",
            event1
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting events from database"
        });
    }
}

//delete event from events
export const deleteEventController = async (req, res) => {
    try {
        //validation
        if (!req.body.event_id) {
            return res.send({ message: "Event id is Required" });
        }

        //find and delete event
        const delete_event = await eventModel.findByIdAndDelete(req.body.event_id);

        res.status(201).send({
            success: true,
            message: "Event is deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting event from database"
        });
    }
}

//details of event participate
export const detailsParticipateController = async (req, res) => {
    try {
        //validation
        if (!req.body.event_id) {
            return res.send({ message: "Event id is Required" });
        }

        //finding event
        const event9 = await eventModel.findById(req.body.event_id);

        let details = [];

        for(const item of event9.participate){
            const stu = await studentModel.findById(item);
            const pro = await professorModel.findById(item);
            const ad = await adminModel.findById(item);

            if(stu){
                details.push(stu);
            }
            if(pro){
                details.push(pro);
            }
            if(ad){
                details.push(ad);
            }
        }

        res.status(201).send({
            success: true,
            message: "Event details of participate is send to admin page",
            details,
            name: event9.name
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching particiate details event from database"
        });
    }
}