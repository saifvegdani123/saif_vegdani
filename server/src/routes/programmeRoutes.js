import express from "express";
import { PROGRAMMES } from "../data/programmes.js";

const router = express.Router();

/**
 * @route   GET /api/programmes
 * @desc    Get all confirmed tuition programmes
 * @access  Public
 */
router.get("/", (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      count: PROGRAMMES.length,
      data: PROGRAMMES
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve programmes",
      error: error.message
    });
  }
});

/**
 * @route   GET /api/programmes/:id
 * @desc    Get single programme by ID
 * @access  Public
 */
router.get("/:id", (req, res) => {
  try {
    const programme = PROGRAMMES.find((p) => p.id === req.params.id);
    if (!programme) {
      return res.status(404).json({
        success: false,
        message: "Programme not found"
      });
    }
    return res.status(200).json({
      success: true,
      data: programme
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve programme",
      error: error.message
    });
  }
});

export default router;
