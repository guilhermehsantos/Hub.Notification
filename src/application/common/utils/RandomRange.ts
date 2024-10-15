export function getRandomSeconds(min, max) {
  const randomSeconds = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomSeconds;
}
