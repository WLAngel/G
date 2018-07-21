require('dotenv').config();

function getEnv() {
  return {
    G_MAP_TABLE: process.env.G_MAP_TABLE,
    G_BUCKET: process.env.G_BUCKET,
  };
}

module.exports = {
  getEnv,
};
