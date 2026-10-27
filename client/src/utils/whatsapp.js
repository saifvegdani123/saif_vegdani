/**
 * Reusable WhatsApp Enquiry Utility
 * Generates verified international phone links with URL-encoded messages
 */

// Configurable WhatsApp business phone number
// Default placeholder: 919876543210 (International format without '+' or spaces)
export const DEFAULT_WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "919876543210";

/**
 * Creates a formatted WhatsApp click-to-chat URL
 * @param {string} message - Unencoded message text
 * @param {string} [phoneNumber] - Optional custom phone number
 * @returns {string} - Complete WhatsApp web/app URL
 */
export function createWhatsAppUrl(message, phoneNumber = DEFAULT_WHATSAPP_NUMBER) {
  const cleanPhone = String(phoneNumber).replace(/[^0-9]/g, "");
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Pre-formatted enquiry message for specific academic programmes
 * @param {string} programmeTitle - e.g. "Primary Foundation (Std 3-8)"
 * @param {string} [board] - e.g. "CBSE" or "GSEB"
 * @returns {string} - WhatsApp URL
 */
export function getProgrammeWhatsAppUrl(programmeTitle, board = "") {
  const boardText = board ? ` (${board} Board)` : "";
  const msg = `Hello Saif Sir, I would like to enquire about admission for ${programmeTitle}${boardText} at your tuition classes. Please share details regarding batch availability.`;
  return createWhatsAppUrl(msg);
}

/**
 * Pre-formatted message from the enquiry form
 * @param {Object} details - Parent and student details
 * @returns {string} - WhatsApp URL
 */
export function getFormSubmissionWhatsAppUrl(details) {
  const { parentName, studentName, standard, board, phoneNumber, message } = details;
  let text = `Hello Saif Sir (Tuition Classes),

I would like to enquire about admission:
• Parent Name: ${parentName}
• Student Name: ${studentName}
• Standard: ${standard}
• Board: ${board}
• Contact: +91 ${phoneNumber}`;

  if (message && message.trim()) {
    text += `\n• Notes: ${message.trim()}`;
  }

  return createWhatsAppUrl(text);
}
