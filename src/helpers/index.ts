/* Fisher–Yates shuffle algoritmh */
export const getRandomObjects = <ObjectType>(initArray: ObjectType[]) => {
  return initArray.map((_element, index, arr) => {
    const randomIndex = Math.floor(Math.random() * (arr.length - index) + index);
    [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
    return arr[index];
  });
};
