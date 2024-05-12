const mongoose = require('mongoose');


const feedbackSchema = new mongoose.Schema({
    satisfaction:{
        type: String,
        enum: ["verySatisfied", "satisfied", "normal", "dissatisfied", "veryDissatisfied"],
    },
    time:{
        type: String,
        enum: ["veryPrompt", "prompt", "average", "slow", "verySlow"],
    },
    work:{
        type: String,
        enum: ["excellent", "good", "fair", "poor", "veryPoor"],
    },
    communication:{
        type: String,
        enum: ["clearAndHelpful", "somewhatClear", "normal", "unclear", "veryUnclear"],
    },
    userExperience:{
        type: String,
        enum: ["excellent", "good", "fair", "poor", "veryPoor"],
    },
    suggestion:{
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
    }, 
    number: {
        type: String,
    },
    email: {
        type: String,
    }


});

exports.Feedback = mongoose.model("Feedback", feedbackSchema);