export const getAge = (timestamp: number) => {
  const day = new Date(timestamp);
  const age = Math.floor((Date.now() - day.getTime()) / 1000 / 60 / 60 / 24 / 365.25);
  return age > 0 ? age : 0;
};

export const formatThousand = new Intl.NumberFormat();
