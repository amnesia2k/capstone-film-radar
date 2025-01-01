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

export const minsToHours = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export const timeForGreeting = (user) => {
  const currHour = new Date().getHours();

  let greetMsg = "";
  if (currHour <= 11) {
    greetMsg = "Good Morning";
  } else if (currHour <= 16) {
    greetMsg = "Good Afternoon";
  } else {
    greetMsg = "Good Evening";
  }

  greetMsg += user?.displayName ? `, ${user.displayName}!` : "!";

  return greetMsg;
};
