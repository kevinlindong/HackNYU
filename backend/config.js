// config.js
require('dotenv').config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'your-mongodb-atlas-connection-string',
  NESSIE_API_KEY: process.env.NESSIE_API_KEY || 'your-nessie-api-key',
  NESSIE_BASE_URL: process.env.NESSIE_BASE_URL || 'https://api.nessie.com/v1',
  PORT: process.env.PORT || 3000,
  PLACE: process.env.PLACE,
  PLAID: process.env.PLAID,
  PLAID_ID: process.env.PLAID_ID,
  OPENAI: process.env.OPENAI_API_KEY || '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'
};