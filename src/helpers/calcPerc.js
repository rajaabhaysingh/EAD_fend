// calculatePercentage
// returns percentage
const calculatePercentage = (num, den, precision = 2) => {
  if (den === 0) {
    return "0%";
  }
  return ((num / den) * 100).toFixed(precision) + "%";
};

export default calculatePercentage;
