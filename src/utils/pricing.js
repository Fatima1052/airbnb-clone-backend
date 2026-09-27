// Single place for price maths, kept in sync with the frontend's
// src/utils/pricing.js. The backend recomputes this from the listing's real
// price on every booking — it never trusts a total sent by the client.
const SERVICE_FEE_RATE = 0.14;

function calculatePricing(nightlyPrice, nights) {
  const price = Number(nightlyPrice) || 0;
  const count = Math.max(0, Number(nights) || 0);

  const subtotal = price * count;
  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE);

  return {
    nightlyPrice: price,
    nights: count,
    subtotal,
    serviceFee,
    total: subtotal + serviceFee,
  };
}

module.exports = { SERVICE_FEE_RATE, calculatePricing };
