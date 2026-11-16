/**
 * Format a number as USD currency.
 * @param {number} value
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value ?? 0)
}

/**
 * Format an ISO date string for display.
 * @param {string|number|Date} value
 */
export function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}

/**
 * Clamp a page number into a valid range.
 * @param {number} page
 * @param {number} totalPages
 */
export function clampPage(page, totalPages) {
  const safe = Number.isFinite(page) ? page : 1
  return Math.min(Math.max(1, safe), Math.max(1, totalPages))
}
