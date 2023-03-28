import { ElementStates } from "../../types/element-states";
import { selectionSort, bubbleSort } from "./sorting-page";

const arr = [
    { val: 2, color: ElementStates.Default },
    { val: 8, color: ElementStates.Default },
    { val: 3, color: ElementStates.Default },
    { val: 7, color: ElementStates.Default }
];

const oneElArr = [{ val: 2, color: ElementStates.Default }];
const oneElArrSorted = [{ val: 2, color: ElementStates.Modified }];

const ascArr = [
    { val: 2, color: ElementStates.Modified },
    { val: 3, color: ElementStates.Modified },
    { val: 7, color: ElementStates.Modified },
    { val: 8, color: ElementStates.Modified }
];

const descArr = [
    { val: 8, color: ElementStates.Modified },
    { val: 7, color: ElementStates.Modified },
    { val: 3, color: ElementStates.Modified },
    { val: 2, color: ElementStates.Modified }
];

const setIsLoading = jest.fn();
const setNums = jest.fn();

describe('Selection sorting ascending', () => {
    it('Works with empty array correctly', async () => {
        await selectionSort([], 'asc', setIsLoading, setNums);
        expect(setNums).toHaveBeenCalledTimes(0);
    });

    it('Works with one-element array correctly', async () => {
        await selectionSort(oneElArr, 'asc', setIsLoading, setNums);
        expect(setNums).toHaveBeenLastCalledWith(oneElArrSorted);
    });

    it('Works with several-element array correctly', async () => {
        await selectionSort(arr, 'asc', setIsLoading, setNums);
        expect(setNums).toHaveBeenLastCalledWith(ascArr);
    });
});

describe('Selection sorting descending', () => {
    it('Works with empty array correctly', async () => {
        await selectionSort([], 'asc', setIsLoading, setNums);
        expect(setNums).toHaveBeenCalledTimes(0);
    });

    it('Works with one-element array correctly', async () => {
        await selectionSort(oneElArr, 'desc', setIsLoading, setNums);
        expect(setNums).toHaveBeenLastCalledWith(oneElArrSorted);
    });

    it('Works with several-element array correctly', async () => {
        await selectionSort(arr, 'desc', setIsLoading, setNums);
        expect(setNums).toHaveBeenLastCalledWith(descArr);
    });
});

describe('Bubble sorting ascending', () => {
    it('Works with empty array correctly', async () => {
        await bubbleSort([], 'asc', setIsLoading, setNums);
        expect(setNums).toHaveBeenCalledTimes(0);
    });

    it('Works with one-element array correctly', async () => {
        await bubbleSort(oneElArr, 'asc', setIsLoading, setNums);
        expect(setNums).toHaveBeenLastCalledWith(oneElArrSorted);
    });

    it('Works with several-element array correctly', async () => {
        await bubbleSort(arr, 'asc', setIsLoading, setNums);
        expect(setNums).toHaveBeenLastCalledWith(ascArr);
    });
});

describe('Bubble sorting descending', () => {
    it('Works with empty array correctly', async () => {
        await bubbleSort([], 'desc', setIsLoading, setNums);
        expect(setNums).toHaveBeenCalledTimes(0);
    });

    it('Works with one-element array correctly', async () => {
        await bubbleSort(oneElArr, 'desc', setIsLoading, setNums);
        expect(setNums).toHaveBeenLastCalledWith(oneElArrSorted);
    });

    it('Works with several-element array correctly', async () => {
        await bubbleSort(arr, 'desc', setIsLoading, setNums);
        expect(setNums).toHaveBeenLastCalledWith(descArr);
    });
});