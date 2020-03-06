import { adjectives, animals } from './tokens';

const numbers = Array.from({ length: 100 }, (_, i) => i).slice(2);

function getRandomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function getRandomID() {
  return (
    getRandomFromList(adjectives) +
    '-' +
    getRandomFromList(animals) +
    '-' +
    String(Math.floor(Math.random() * 98) + 2)
  );
}

export default getRandomID;
