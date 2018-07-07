const crypto = require('crypto');

function base64(length, safe = true) {
  const byteLength = Math.ceil(length * 3 / 4);
  let string = crypto.randomBytes(byteLength).toString('base64');
  if (safe) {
    string = string.replace(/\+/g, '-');
    string = string.replace(/\//g, '_');
  }
  return string.substr(0, length);
}

module.exports = {
  base64,
};
