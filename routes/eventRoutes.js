import express from "express";
import { isAdmin, isProfessor, isStudent, requireSignIn } from "../middlewares/authMiddleware.js";
import { addEventController, addParticipateController, deleteEventController, detailsParticipateController, displayEventsController } from "../controller/eventsController.js";


//route object
const router = express.Router();


//routing

//add new events only through admin
router.post("/add_new_event", requireSignIn, isAdmin, addEventController);

//register participate in particular event
router.post("/participate", requireSignIn, addParticipateController);

//display all events
router.get("/display_events", requireSignIn, displayEventsController);

//delete event only through admin
router.post("/delete_event", requireSignIn, isAdmin, deleteEventController);

//details of register participate in event
router.post("/details_participate", requireSignIn, isAdmin, detailsParticipateController);



//export router
export default router;