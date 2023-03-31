import { TArr } from "../types/array";

export const swap = (arr: TArr<string | number>, firstIndex: number, secondIndex: number): TArr<string | number> => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    return arr;
}

export const getRandomInt = (min: number, max: number) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

export const randomArr = () => {
    const arr = [];
    const len = getRandomInt(3,17);

    for(let i=0; i<len; i++) {
        arr.push(Math.round(Math.random()*100));
    }

    return arr;
}