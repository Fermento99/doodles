
const randRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const randGauss = (min, max) => {
  let u = 0, v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  return num * (max - min) + min;
}