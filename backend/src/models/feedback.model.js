import mongoose from "mongoose";


const feedbackSchema = new mongoose.Schema({
    overallSatisfaction:{
        type: String,
        enum: ["verySatisfied", "satisfied", "normal", "dissatisfied", "veryDissatisfied"],
    },
    responseTime:{
        type: String,
        enum: ["veryPrompt", "prompt", "average", "slow", "verySlow"],
    },
    qualityOfWork:{
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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    fullName: {
        type: String,
    }, 
    number: {
        type: String,
    },
    email: {
        type: String,
    }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;