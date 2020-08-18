export const currentOrNextMonthSelected = monthDate => {
  const [year, month] = monthDate.split("-");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  if (year > currentYear) return true;
  if (year == currentYear) return month >= currentMonth;
  return false;
};
