export const CURRENCY_SYMBOLS = {
  UAH: '₴',
  USD: '$',
  EUR: '€',
};

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const ORDER_STATUS = {
  paid: 'Paid',
  'in progress': 'Progress',
  error: 'Error',
};

export const formatPrice = (price, currency = 'UAH') => (
  `${price.toFixed(2)} ${CURRENCY_SYMBOLS[currency]}`
);

export const getFormattedTime = (timestamp) => new Date(timestamp)
  .toLocaleString()
  .split(', ')
  .reverse()
  .join(', ');

export const getMonthNameByIndex = (index) => MONTHS[index];

export const getOrderStatusName = (status) => ORDER_STATUS[status];
