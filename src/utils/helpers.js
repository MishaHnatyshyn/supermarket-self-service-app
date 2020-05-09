export const CURRENCY_SYMBOLS = {
  UAH: '₴',
  USD: '$',
  EUR: '€',
};

export const formatPrice = (price, currency = 'UAH') => (
  `${price.toFixed(2)} ${CURRENCY_SYMBOLS[currency]}`
);
