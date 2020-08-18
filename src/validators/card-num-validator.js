export const valid = cardNumber => {
  let digits = Array.from(cardNumber.split(""), Number);
  const lastDigit = digits.pop();
  digits = doubleEachOddElement(digits);
  digits = decreaseTwoDigitValuesByNine(digits);
  const sum = digits.reduce((sum, digit) => sum + digit, 0);
  return (sum + lastDigit) % 10 === 0;
};

const doubleEachOddElement = arr =>
  arr.map((element, index) => (index % 2 ? element : element * 2));

const decreaseTwoDigitValuesByNine = arr =>
  arr.map(element => (element > 9 ? element - 9 : element));
