import express from "express";
import mongoose from "mongoose";
import { Enquiry } from "../models/Enquiry.js";

const router = express.Router();

// Resilient In-Memory store for environments where MongoDB is not actively running
const inMemoryEnquiries = [];

/**
 * Validation Helper
 */
function validateEnquiryInput(data) {
  const errors = [];

  const parentName = data.parentName ? String(data.parentName).trim() : "";
  const studentName = data.studentName ? String(data.studentName).trim() : "";
  const phoneNumber = data.phoneNumber ? String(data.phoneNumber).trim().replace(/[\s-]/g, "") : "";
  const standard = data.standard ? String(data.standard).trim() : "";
  const board = data.board ? String(data.board).trim().toUpperCase() : "";
  const message = data.message ? String(data.message).trim() : "";
  const preferredContact = data.preferredContact === "Phone Call" ? "Phone Call" : "WhatsApp";

  if (!parentName || parentName.length < 2) {
    errors.push("Parent or guardian name is required (minimum 2 characters)");
  }
  if (!studentName || studentName.length < 2) {
    errors.push("Student name is required (minimum 2 characters)");
  }

  // Phone validation (accepting 10-digit Indian numbers or with country codes)
  const phoneClean = phoneNumber.replace(/^\+/, "");
  if (!phoneClean || phoneClean.length < 10 || !/^\d+$/.test(phoneClean)) {
    errors.push("Please provide a valid contact number (at least 10 digits)");
  }

  const validStandards = [
    "Std 3", "Std 4", "Std 5", "Std 6",
    "Std 7", "Std 8", "Std 9", "Std 10",
    "Std 11", "Std 12"
  ];
  if (!validStandards.includes(standard)) {
    errors.push(`Standard must be one of: ${validStandards.join(", ")}`);
  }

  // Board rules per client specifications:
  // - Standards 3–8: GSEB and CBSE
  // - Standards 9–10: GSEB board
  // - Standards 11–12: Commerce stream (GSEB)
  if (["Std 9", "Std 10"].includes(standard) && board !== "GSEB") {
    errors.push("Standards 9–10 are exclusively offered under the GSEB board");
  } else if (!["GSEB", "CBSE"].includes(board)) {
    errors.push("Board must be either GSEB or CBSE");
  }

  // Infer programmeId
  let programmeId = "general";
  if (["Std 3", "Std 4", "Std 5", "Std 6", "Std 7", "Std 8"].includes(standard)) {
    programmeId = "std-3-8";
  } else if (["Std 9", "Std 10"].includes(standard)) {
    programmeId = "std-9-10";
  } else if (["Std 11", "Std 12"].includes(standard)) {
    programmeId = "std-11-12";
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      parentName,
      studentName,
      phoneNumber,
      standard,
      board,
      programmeId,
      preferredContact,
      message
    }
  };
}

/**
 * @route   POST /api/enquiries
 * @desc    Submit a new tuition admission enquiry
 * @access  Public
 */
router.post("/", async (req, res) => {
  try {
    const { isValid, errors, sanitized } = validateEnquiryInput(req.body);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }

    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const enquiryData = {
      ...sanitized,
      ipAddress: String(ipAddress),
      status: "New"
    };

    let savedRecord = null;

    // Check if MongoDB connection is active
    if (mongoose.connection.readyState === 1) {
      const enquiryDoc = new Enquiry(enquiryData);
      savedRecord = await enquiryDoc.save();
    } else {
      // In-memory fallback
      const record = {
        _id: "mem_" + Date.now() + "_" + Math.random().toString(36).substring(2, 8),
        ...enquiryData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      inMemoryEnquiries.push(record);
      savedRecord = record;
    }

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully. Saif Sir will contact you shortly.",
      data: {
        id: savedRecord._id,
        studentName: savedRecord.studentName,
        standard: savedRecord.standard,
        board: savedRecord.board,
        preferredContact: savedRecord.preferredContact,
        createdAt: savedRecord.createdAt
      }
    });
  } catch (error) {
    console.error("Error saving enquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Server encountered an error processing your enquiry",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

/**
 * @route   GET /api/enquiries
 * @desc    Get enquiries count / summary (protected/internal audit)
 * @access  Internal
 */
router.get("/summary", async (req, res) => {
  try {
    let count = 0;
    if (mongoose.connection.readyState === 1) {
      count = await Enquiry.countDocuments();
    } else {
      count = inMemoryEnquiries.length;
    }
    return res.status(200).json({
      success: true,
      totalEnquiries: count,
      storageMode: mongoose.connection.readyState === 1 ? "MongoDB" : "In-Memory Store"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve summary"
    });
  }
});

export default router;
