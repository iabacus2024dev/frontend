/**
 * Formats a monetary value with Korean currency symbol and thousands separators
 * @param {number|string} value - The monetary value to format
 * @param {{showCurrency: boolean}} options - Formatting options
 * @param {boolean} options.showCurrency - Whether to show the currency symbol (₩)
 * @param {number} options.decimals - Number of decimal places to show
 * @returns {string} The formatted monetary value
 */
export function formatPrice(value, options = {}) {
  // Default options
  const defaults = {
    showCurrency: true,
    decimals: 0,
  }

  const opts = { ...defaults, ...options }

  // Handle null, undefined, or empty values
  if (value === null || value === undefined || value === '') {
    return '금액 정보 없음'
  }

  // Convert to number
  const numValue = parseFloat(value)

  // Handle NaN
  if (isNaN(numValue)) {
    return '유효하지 않은 금액'
  }

  // Standard formatting with Intl.NumberFormat
  return new Intl.NumberFormat('ko-KR', {
    style: opts.showCurrency ? 'currency' : 'decimal',
    currency: 'KRW',
    minimumFractionDigits: opts.decimals,
    maximumFractionDigits: opts.decimals,
  }).format(numValue)
}

/**
 * Formats a monetary value with Korean currency symbol and thousands separators
 * Shorthand for formatPrice with default options
 * @param {number|string} value - The monetary value to format
 * @returns {string} The formatted monetary value
 */
export function formatCurrency(value) {
  return formatPrice(value, { showCurrency: true })
}

/**
 * Formats a monetary value with Korean currency symbol and thousands separators
 * Shorthand for formatPrice with default options
 * @param {number|string} value - The monetary value to format
 * @returns {string} The formatted monetary value
 */
export function formatWithUnit(value) {
  return formatPrice(value, { showCurrency: true })
}
