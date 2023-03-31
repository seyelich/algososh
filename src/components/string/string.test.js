import { reverse } from './string';
import { swap } from '../../utils/utils';
import { ElementStates } from '../../types/element-states';

const prevTestArr = [3,2,1];

const newTestArr = [1,2,3];

const setIsLoading = jest.fn();
const setLetters = jest.fn();

it('Swap func works correctly', () => {
    expect(swap(prevTestArr, 0, 2)).toEqual(newTestArr);
});

it('Reverse of even letters` number works correctly', async () => {
    const str = 'live';
    const res = 'evil';
    await reverse(setLetters, setIsLoading, str);
    expect(setLetters).toHaveBeenLastCalledWith(res.split('').map((val => ({ val, color: ElementStates.Modified }))));
});

it('Reverse of odd letters` number works correctly', async () => {
    const str = 'hello';
    const res = 'olleh';
    await reverse(setLetters, setIsLoading, str);
    expect(setLetters).toHaveBeenLastCalledWith(res.split('').map((val => ({ val, color: ElementStates.Modified }))));
}, 6000);

it('Reverse of 1 letter works correctly', async () => {
    const str = 'h';
    const res = 'h';
    await reverse(setLetters, setIsLoading, str);
    expect(setLetters).toHaveBeenLastCalledWith(res.split('').map((val => ({ val, color: ElementStates.Modified }))));
});

test('Reverse of empty string works correctly', () => {
    reverse(setLetters, setIsLoading, '');
    //expect(() => { reverse(setLetters, setIsLoading, '') }).toThrow(Error);
    //expect(() => reverse(setLetters, setIsLoading, '')).toThrow('Enter a string');
    expect(setLetters).toHaveBeenCalledTimes(0);
});