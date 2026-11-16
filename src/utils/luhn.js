/**
 * Validate a card number with the Luhn algorithm.
 * @param {string} raw
 * @returns {boolean}
 */
export function isValidLuhn(raw) {
  const digits = String(raw).replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let alt = false
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = Number(digits[i])
    if (alt) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
    alt = !alt
  }
  return sum % 10 === 0
}
