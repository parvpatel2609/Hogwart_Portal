import adminModel from "../models/adminModel.js";
import eventModel from "../models/eventModel.js";
import professorModel from "../models/professorModel.js";
import studentModel from "../models/studentModel.js";
import { transporter } from "./mailSender.js"
import cron from "node-cron";

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

        for (const item of event9.participate) {
            const stu = await studentModel.findById(item);
            const pro = await professorModel.findById(item);
            const ad = await adminModel.findById(item);

            if (stu) {
                details.push(stu);
            }
            if (pro) {
                details.push(pro);
            }
            if (ad) {
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



//reminder of event 
// Function to send the reminder email
async function sendReminderEmail(event, user) {

    // console.log("sendReminder Event :" + event);

    const eve = await eventModel.findById(event);

    // console.log("send Event :" + eve);
    // console.log("send Event :" + event.name);
    // console.log("send Event :" + event.date);


    const mailOptions = {
        from: "unims2407@gmail.com",
        to: user.col_email,
        subject: `Reminder: Event - ${eve.name}`,
        text: `Dear participants,\n\nThis is a reminder for the event "${eve.name}" happening on "${eve.date}". Please be prepared to attend the event.\n\nBest regards,\nHogwarts Portal`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Reminder email sent for event ${event.name}`);
    } catch (error) {
        console.error(`Error sending reminder email for event ${event.name}:`, error);
    }
}

// Function to check for events and send reminder emails
async function checkAndSendReminders() {
    const currentTime = new Date();
    const oneHourBefore = new Date(currentTime.getTime() + 60 * 60 * 1000);

    try {
        const events = await eventModel.find({
            date: { $gt: currentTime, $lte: oneHourBefore },
        });

        // console.log("Event :" + events);

        if (events) {
            for (const ev of events) {
                for (const event of ev.participate) {
                    const stu10 = await studentModel.findById(event);
                    // console.log("Student :" + stu10);
                    const prof = await professorModel.findById(event);
                    const adm = await adminModel.findById(event);

                    if (stu10 !== null) {
                        sendReminderEmail(ev, stu10);
                    }

                    if (prof !== null) {
                        sendReminderEmail(event, prof);
                    }

                    if (adm !== null) {
                        sendReminderEmail(event, adm);
                    }

                };
            }
        }
    } catch (error) {
        console.error("Error fetching events for reminders:", error);
    }
}


// Schedule the task to run every hour
cron.schedule("0 * * * *", async () => {
    console.log("Running event reminder job...");
    await checkAndSendReminders();
});