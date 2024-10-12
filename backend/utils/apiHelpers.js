const axios = require('axios');

async function getComparableSales(address) {
  const response = await axios.get('https://api.attomdata.com/propertyapi/v1.0.0/sales', {
    params: { address },
    headers: { apikey: process.env.ATTOM_API_KEY },
  });
  return response.data;
}

module.exports = { getComparableSales };
