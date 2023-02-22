/**
 * Verifica se através da expressão regular se email esta no formato correto.
 * @param {*} email 
 * @returns boolean
 */
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }