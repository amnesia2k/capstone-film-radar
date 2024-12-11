export const toPercentage = (rating) => {
  return (rating * 10)?.toFixed(0);
};

export const resColor = (rating) => {
  if (rating >= 7) {
    return "green";
  } else if (rating >= 5) {
    return "orange";
  } else {
    return "red";
  }
};
