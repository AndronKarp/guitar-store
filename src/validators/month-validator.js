const currentOrNextMonthSelected = monthDate => {
  const [year, month] = monthDate.split("-");
  const currentDate = new Date();
  return (
    year >= currentDate.getFullYear() && month >= currentDate.getMonth() + 1
  );
};

export { currentOrNextMonthSelected };
