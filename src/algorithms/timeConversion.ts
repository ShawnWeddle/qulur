export const timeConversion = (time: number) => {
  const minutes = Math.floor(time / 60000);
  const seconds = (time % 60000) / 1000;
  let sectext = seconds.toString();

  if (sectext.length < 6) {
    sectext = "0" + sectext;
  }
  
  const structuredTime = minutes > 0 ? `${minutes}:${sectext}` : `${sectext}`
  return structuredTime;
}