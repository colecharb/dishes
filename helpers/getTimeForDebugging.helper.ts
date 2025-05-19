const getTimeForDebugging = () => {
  return new Date().toLocaleTimeString('en-US', { fractionalSecondDigits: 3 });
};

export default getTimeForDebugging;
