import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import Report  from "../models/report.model.js";

config();

const sampleReports = [
  {
    userId: "679a07a93898fecb5ed0e724",
    fullName: "Rajesh Patel",
    number: "9876543210",
    email: "rajesh.patel@example.com",
    postingDate: "2025-01-15",
    category: "patholes",
    city: "Ahmedabad",
    location: "Near Maninagar Station",
    description: "Large pothole causing traffic disruptions.",
    file: "https://www.gettyimages.in/detail/photo/purple-buildings-on-dirt-road-in-santa-maria-sal-royalty-free-image/1452724021",
    isComplited: false,
  },
  {
    userId: "679a07a93898fecb5ed0e724",
    fullName: "Anita Sharma",
    number: "9123456789",
    email: "anita.sharma@example.com",
    postingDate: "2025-01-10",
    category: "waste",
    city: "Mumbai",
    location: "Bandra West",
    description: "Uncleared waste pile near market area.",
    file: "https://www.gettyimages.in/detail/photo/poor-man-with-foam-on-his-body-surrounded-by-royalty-free-image/1649197795",
    isComplited: true,
  },
  {
    userId: "679a07a93898fecb5ed0e724",
    fullName: "Vikas Rao",
    number: "9988776655",
    email: "vikas.rao@example.com",
    postingDate: "2025-01-18",
    category: "water",
    city: "Bangalore",
    location: "Indiranagar 5th Block",
    description: "Water leakage causing road flooding.",
    file: "https://www.gettyimages.in/detail/photo/flood-during-rainy-season-royalty-free-image/1389166014",
    isComplited: false,
  },
  {
    userId: "679a07a93898fecb5ed0e724",
    fullName: "Sneha Kapoor",
    number: "9876654321",
    email: "sneha.kapoor@example.com",
    postingDate: "2025-01-12",
    category: "patholes",
    city: "Delhi",
    location: "Dwarka Sector 10",
    description: "Deep pothole on service lane.",
    file: "https://www.gettyimages.in/detail/photo/poor-road-repairs-by-locals-leave-the-road-royalty-free-image/1789720035",
    isComplited: false,
  },
  {
    userId: "679a07a93898fecb5ed0e724",
    fullName: "Mohit Verma",
    number: "9012345678",
    email: "mohit.verma@example.com",
    postingDate: "2025-01-22",
    category: "waste",
    city: "Chennai",
    location: "T. Nagar",
    description: "Overflowing garbage bin not attended.",
    file: "https://www.gettyimages.in/detail/photo/poverty-royalty-free-image/157313977",
    isComplited: true,
  },
];

const seedReports = async () => {
    try {
        await connectDB();
    
        // await Report.insertMany(sampleReports);
        await Report.insertMany(sampleReports);
    
        console.log("Data imported successfully");
    } catch (error) {
        console.error("Error importing data");
    }
}

seedReports();


