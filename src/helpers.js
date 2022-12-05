export const mutatingShuffle = (array) => {
  let j, k;
  for (let i = array.length; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    k = array[i - 1];
    array[i - 1] = array[j];
    array[j] = k;
  }
}