/**
 * Reusable WhatsApp & Communication Enquiry Utility
 * Generates verified international phone links with URL-encoded messages and email enquiry links.
 * Derives phone number exclusively from VITE_WHATSAPP_NUMBER and contact email from VITE_CONTACT_EMAIL.
 */

const envNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
const isPlaceholder = !envNumber || envNumber === "919876543210" || envNumber.trim() === "";

if (import.meta.env.DEV && isPlaceholder) {
  console.warn(
    "[S.V Tutorials Notice] VITE_WHATSAPP_NUMBER is missing or set to placeholder in client environment. Owner must supply real number in client/.env"
  );
}

// Configurable WhatsApp business phone number derived solely from environment
export const DEFAULT_WHATSAPP_NUMBER = (envNumber || "").trim();

// Configurable Academy contact email derived from environment with verified fallback
export const DEFAULT_CONTACT_EMAIL = (import.meta.env.VITE_CONTACT_EMAIL || "saif@svtutorial.in").trim();

/**
 * Creates a formatted WhatsApp click-to-chat URL
 * @param {string} message - Unencoded message text
 * @param {string} [phoneNumber] - Optional custom phone number
 * @returns {string} - Complete WhatsApp web/app URL
 */
export function createWhatsAppUrl(message, phoneNumber = DEFAULT_WHATSAPP_NUMBER) {
  const cleanPhone = String(phoneNumber || "").replace(/[^0-9]/g, "");
  const encodedText = encodeURIComponent(message.trim());
  return cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodedText}`
    : `https://wa.me/?text=${encodedText}`;
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
 * Pre-formatted message from the enquiry form for WhatsApp
 * @param {Object} details - Parent and student details
 * @returns {string} - WhatsApp URL
 */
export function getFormSubmissionWhatsAppUrl(details) {
  const { parentName, studentName, standard, board, phoneNumber, message } = details;
  let text = `Hello Saif Sir (S.V Tutorials),

I would like to enquire about admission:
• Parent / Guardian: ${parentName}
• Student Name: ${studentName}
• Standard: ${standard}
• Curriculum Board: ${board}
• Contact: +91 ${phoneNumber}`;

  if (message && message.trim()) {
    text += `\n• Notes: ${message.trim()}`;
  }

  return createWhatsAppUrl(text);
}

/**
 * Pre-formatted mailto URL from the enquiry form for Direct Email
 * @param {Object} details - Parent and student details
 * @param {string} [recipientEmail] - Optional custom email recipient
 * @returns {string} - Mailto URL
 */
export function getFormSubmissionEmailUrl(details, recipientEmail = DEFAULT_CONTACT_EMAIL) {
  const { parentName, studentName, standard, board, phoneNumber, message } = details;
  const subject = `New Admission Enquiry - S.V Tutorials (${studentName} - ${standard})`;
  
  let body = `Dear Saif Sir,

I would like to enquire about admission at S.V Tutorials:

• Parent / Guardian: ${parentName}
• Student Name: ${studentName}
• Standard: ${standard}
• Curriculum Board: ${board}
• Contact Number: +91 ${phoneNumber}`;

  if (message && message.trim()) {
    body += `\n• Additional Notes / Specific Queries:\n${message.trim()}`;
  }

  body += `\n\nLooking forward to your guidance regarding batch availability and enrolment details.`;

  return `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
