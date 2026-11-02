/**
 * Form and Input Validation Utility Functions
 */

/**
 * Check if a value is non-empty.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isRequired(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * Validate standard email format.
 *
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate password requirements.
 * Default: Minimum 8 characters, at least one letter and one number.
 *
 * @param {string} password
 * @param {number} [minLength=8]
 * @returns {boolean}
 */
export function isValidPassword(password, minLength = 8) {
  if (!password || typeof password !== 'string') return false;
  if (password.length < minLength) return false;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasLetter && hasNumber;
}

/**
 * Validate 10-digit Indian mobile number format.
 *
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidPhoneNumber(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const sanitized = phone.replace(/[\s-]/g, '');
  const phoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
  return phoneRegex.test(sanitized);
}

/**
 * Validate standard 6-digit Indian PIN code.
 *
 * @param {string} pinCode
 * @returns {boolean}
 */
export function isValidPostalCode(pinCode) {
  if (!pinCode || typeof pinCode !== 'string') return false;
  const pinRegex = /^[1-9][0-9]{5}$/;
  return pinRegex.test(pinCode.trim());
}

