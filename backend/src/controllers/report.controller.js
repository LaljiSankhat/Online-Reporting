import Report from "../models/report.model.js";
import cloudinary from "../lib/cloudinary.js";
import Feedback from "../models/feedback.model.js";
import User from "../models/user.model.js";

export const postAnIssue = async (req, res) => {
  try {
    const {
      fullName,
      number,
      email,
      postingDate,
      category,
      city,
      location,
      description,
      file,
      userId
    } = req.body;
    if (!fullName || !number || !email || !postingDate || !category || !city || !location) {
        return res.status(400).json({ error: "All fields are required." });
      }
    let imageUrl;
    if (file) {
      // upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(file);
      imageUrl = uploadResponse.secure_url;
    }

    const newReport = new Report({
      fullName: fullName,
      number: number,
      email: email,
      postingDate: postingDate,
      category: category,
      city: city,
      location: location,
      description: description,
      file: imageUrl,
      userId: userId,
    });

    const user = await User.findById(userId);
    user.reports.push(newReport);
    await user.save();

    await newReport.save();

    res.status(201).json(newReport);
  } catch (error) {
    console.log("Error in postAnIssue controller ", error.message);
    res.status(500).json({error: "Internal Server error"});
  }
};

export const postFeedback = async (req, res) => {
  try {
    const {
      overallSatisfaction,
      responseTime,
      qualityOfWork,
      communication,
      userExperience,
      suggestion,
      userId,
      fullName,
      number,
      email,
    } = req.body;

    const newFeedback = new Feedback({
      overallSatisfaction: overallSatisfaction,
      responseTime: responseTime,
      qualityOfWork: qualityOfWork,
      communication: communication,
      userExperience: userExperience,
      suggestion: suggestion,
      userId: userId,
      fullName: fullName,
      number: number,
      email: email,
    });

    await newFeedback.save();

    res.status(201).json(newFeedback);
  } catch (error) {
    console.log("Error in postFeedback controller ", error.message);
    res.status(500).json({error: "Internal Server error"});
  }
}


export const allIssues = async (req,res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    console.log("Error in allIssues controller ", error.message);
    res.status(500).json({error: "Internal Server error"});
  }
}

export const setAsCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    report.isComplited = true;
    await report.save();
    res.status(200).json(report);
  } catch (error) {
    console.log("Error in setAsCompleted controller ", error.message);
    res.status(500).json({error: "Internal Server error"});
  }
}



export const getAllFeedbacks = async (req,res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.log("Error in allFeedbacks controller ", error.message);
    res.status(500).json({error: "Internal Server error"});
  }
}


export const getMyFeedbacks = async (req, res) => {
  try {
    const {id} = req.params;
    const feedbacks = await Feedback.find({userId: id});
    res.status(200).json(feedbacks);    
  } catch (error) {
    console.log("Error in getMyFeedbacks controller", error.message);
    res.status(500).json({error: "Internal server error"});
  }
}


export const getMyReports = async (req, res) => {
  try {
    const {id} = req.params;
    const reports = await Report.find({userId: id});
    res.status(200).json(reports);    
  } catch (error) {
    console.log("Error in getMyReports controller", error.message);
    res.status(500).json({error: "Internal server error"});
  }
}
