const mongoose = require('mongoose')


const connectSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Please add the Contact name"],
    },
    email: {
        type: String,
        required: [true, "Please add the Contact email address"],
    },
    phone: {
        type: String,
        required: [true, "Please add the Contact phone number"],
    },
},
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Contact", connectSchema);