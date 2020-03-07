import { adjectives, animals } from './tokens';

function getRandomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function getRandomID() {
  return (
    getRandomFromList(adjectives) +
    '-' +
    getRandomFromList(animals) +
    '-' +
    // 2 ~ 100
    String(Math.floor(Math.random() * 98) + 2)
  );
}

export default getRandomID;
