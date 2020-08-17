const valid = cardNumber => {
  let digits = Array.from(cardNumber.split(""), Number);
  const lastDigit = digits.pop();
  digits = digits.map((digit, index) => (index % 2 ? digit : digit * 2));
  digits = digits.map(digit => (digit > 9 ? digit - 9 : digit));
  const sum = digits.reduce((sum, digit) => sum + digit, lastDigit);
  return sum % 10 === 0;
};

export { valid };
