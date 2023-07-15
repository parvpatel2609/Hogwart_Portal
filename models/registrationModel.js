//importing all require files, modules
import mongoose from "mongoose";


//mongoose schema for registration start and end time
const registrationTimeSchema = new mongoose.Schema({
    term:{
        type:String,
        require: true
    },
    startTime:{
        type: Date,
        require: true
    },
    endTime:{
        type: Date,
        require: true
    }
},{timestamps: true});


//export registrationTime using mongoose model method
export default mongoose.model('registrationtimes', registrationTimeSchema);