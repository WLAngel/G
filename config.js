require('dotenv').config();

function getEnv() {
  return {
    G_MAP_TABLE: process.env.G_MAP_TABLE,
    G_BUCKET: process.env.G_BUCKET,
    CUSTOM_DOMAIN_NAME: process.env.CUSTOM_DOMAIN_NAME,
    CERTIFICATE_NAME: process.env.CERTIFICATE_NAME,
  };
}

module.exports = {
  getEnv,
};
