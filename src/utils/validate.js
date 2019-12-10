/**
 * @param { string } username
 * @returns { Boolean }
 */
export function validUsername(username) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(username.trim()) > -1
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}