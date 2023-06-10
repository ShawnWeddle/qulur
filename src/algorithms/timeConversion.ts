export const timeConversion = (time: number) => {
  const minutes = Math.floor(time / 60000);
  const seconds = (time % 60000) / 1000;
  
  const structuredTime = minutes > 0 ? `${minutes}:${seconds}` : `${seconds}`
  return structuredTime;
}