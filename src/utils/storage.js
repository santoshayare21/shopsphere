const PREFIX = 'shopsphere:'

/**
 * Read a JSON value from localStorage.
 * @param {string} key
 * @param {*} fallback
 */
export function loadJSON(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw == null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

/**
 * Write a JSON value to localStorage.
 * @param {string} key
 * @param {*} value
 */
export function saveJSON(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* ignore quota / private mode */
  }
}

/**
 * Remove a prefixed key from localStorage.
 * @param {string} key
 */
export function removeJSON(key) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    /* ignore */
  }
}
