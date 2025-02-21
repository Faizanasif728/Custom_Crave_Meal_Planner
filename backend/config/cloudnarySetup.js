require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Folder containing your images
const folderPath = "C:\\Users\\Hassan\\Downloads\\Compressed\\meals imgs"; // Change this to your actual folder path

// Read all files in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  // Upload each file
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) {
        console.error(`Error uploading ${file}:`, error);
      } else {
        console.log(`Uploaded ${file}: ${result.secure_url}`);
      }
    });
  });
});
