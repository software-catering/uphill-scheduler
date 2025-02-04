export const pseudoNow = {
  year: 2000,
  mont: 1,
  day: 1,
  date: new Date(2000, 1, 1)
}

export const parseTime = (time: string): Date => {
  const [hours, minutes] = time?.split(':').map(Number);
  return new Date(pseudoNow.year, pseudoNow.mont, pseudoNow.day, hours, minutes, 0, 0);
}
