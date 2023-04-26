/**
 * Verifica através da expressão regular se email esta no formato correto.
 * @param {string} email 
 * @returns boolean
 */
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }