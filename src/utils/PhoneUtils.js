/**
 * Formats a phone number with hyphens for display
 * @param {string} phoneNumber - The phone number to format
 * @returns {string} The formatted phone number
 */
export function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) return '';

  // Remove any non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Format based on length
  if (cleaned.length === 11) {
    // Mobile: 010-1234-5678
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (cleaned.length === 10) {
    // Mobile or Local: 010-123-4567 or 02-1234-5678
    if (cleaned.startsWith('02')) {
      // Seoul number
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    } else {
      // Mobile or other area
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
  } else if (cleaned.length === 9) {
    // Local: 02-123-4567
    if (cleaned.startsWith('02')) {
      return cleaned.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
    }
  } else if (cleaned.length === 8) {
    // Just format as 4-4
    return cleaned.replace(/(\d{4})(\d{4})/, '$1-$2');
  }

  // If none of the above patterns match, return with basic formatting
  return cleaned;
}

/**
 * Formats a phone number as the user types
 * @param {string} value - The current input value
 * @returns {string} The formatted phone number
 */
export function formatPhoneNumberInput(value) {
  if (!value) return '';

  // Remove any non-numeric characters
  const cleaned = value.replace(/\D/g, '');

  // Apply formatting based on the current length
  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 7) {
    return cleaned.slice(0, 3) + '-' + cleaned.slice(3);
  } else {
    return cleaned.slice(0, 3) + '-' + cleaned.slice(3, 7) + '-' + cleaned.slice(7, 11);
  }
}

/**
 * Validates a phone number against Korean phone number patterns
 * @param {string} phoneNumber - The phone number to validate
 * @returns {boolean} Whether the phone number is valid
 */
export function isValidPhoneNumber(phoneNumber) {
  if (!phoneNumber) return false;

  // Remove any non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Korean phone number validation regex (same as backend)
  return cleaned.match(/^(01[016789]\d{7,8}|0[2-6]\d{1,2}\d{6,7}|0[7-9]\d{8,9})$/) !== null;
}

/**
 * Standardizes a phone number by removing all non-numeric characters
 * @param {string} phoneNumber - The phone number to standardize
 * @returns {string} The standardized phone number
 */
export function standardizePhoneNumber(phoneNumber) {
  if (!phoneNumber) return '';
  return phoneNumber.replace(/\D/g, '');
}
