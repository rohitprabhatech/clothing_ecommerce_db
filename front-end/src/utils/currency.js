/**
 * Currency Formatting Utility
 * Standardized formatting for Indian Rupees (INR) and international currencies.
 */

/**
 * Format a numeric amount into an Indian Rupee (INR) currency string.
 * Uses the Indian numbering system format (e.g. ₹1,50,000.00).
 *
 * @param {number|string} amount - The numeric value to format.
 * @param {Object} [options] - Optional formatting options.
 * @param {string} [options.currency='INR'] - Currency code.
 * @param {string} [options.locale='en-IN'] - Locale identifier.
 * @param {number} [options.minimumFractionDigits=2] - Minimum fraction digits.
 * @param {number} [options.maximumFractionDigits=2] - Maximum fraction digits.
 * @returns {string} Formatted currency string.
 */
export function formatCurrency(
  amount,
  {
    currency = 'INR',
    locale = 'en-IN',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = {}
) {
  const numericAmount = Number(amount);

  if (amount === null || amount === undefined || isNaN(numericAmount)) {
    return '₹0.00';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(numericAmount);
}

/**
 * Convenience helper specifically for Indian Rupees (INR).
 *
 * @param {number|string} amount
 * @returns {string}
 */
export function formatINR(amount) {
  return formatCurrency(amount, { currency: 'INR', locale: 'en-IN' });
}

/**
 * Format amount without currency symbol (useful for calculations or input displays).
 *
 * @param {number|string} amount
 * @returns {string}
 */
export function formatNumber(amount) {
  const numericAmount = Number(amount);
  if (isNaN(numericAmount)) return '0.00';
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

