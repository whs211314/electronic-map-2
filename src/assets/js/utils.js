export function getRandom (len, start = 0) {
  return Math.floor(Math.random() * len) + start
}
