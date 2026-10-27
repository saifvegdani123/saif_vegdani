import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    parentName: {
      type: String,
      required: [true, "Parent or guardian name is required"],
      trim: true,
      maxlength: [100, "Parent name cannot exceed 100 characters"]
    },
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      maxlength: [100, "Student name cannot exceed 100 characters"]
    },
    phoneNumber: {
      type: String,
      required: [true, "WhatsApp / phone number is required"],
      trim: true,
      match: [/^[0-9+() -]{7,20}$/, "Please provide a valid phone number"]
    },
    standard: {
      type: String,
      required: [true, "Standard is required"],
      enum: {
        values: [
          "Std 3",
          "Std 4",
          "Std 5",
          "Std 6",
          "Std 7",
          "Std 8",
          "Std 9",
          "Std 10",
          "Std 11",
          "Std 12"
        ],
        message: "{VALUE} is not a supported standard"
      }
    },
    board: {
      type: String,
      required: [true, "Board is required"],
      enum: {
        values: ["GSEB", "CBSE"],
        message: "{VALUE} is not a valid board option"
      }
    },
    programmeId: {
      type: String,
      enum: ["std-3-8", "std-9-10", "std-11-12", "general"],
      default: "general"
    },
    preferredContact: {
      type: String,
      enum: ["WhatsApp", "Phone Call"],
      default: "WhatsApp"
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
      default: ""
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Enrolled", "Archived"],
      default: "New"
    },
    ipAddress: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export const Enquiry = mongoose.model("Enquiry", enquirySchema);
