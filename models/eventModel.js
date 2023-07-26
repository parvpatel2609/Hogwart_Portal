//importing all require files, modules
import mongoose from "mongoose";

//mongoose schema of events
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    participate: { type: [mongoose.Schema.Types.ObjectId], refPath: 'model_type' },
    model_type: { type: String, enum: ['students', 'professors', 'admins']}
}, { timestamps: true });

//exports eventSchema using mongoose model method
export default mongoose.model('events', eventSchema);