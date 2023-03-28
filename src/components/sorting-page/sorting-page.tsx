import React, { FormEvent, useState, useEffect, Dispatch, SetStateAction } from "react";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { randomArr, swap } from "../../utils/utils";
import { Column } from "../ui/column/column";
import styles from './sorting-page.module.css';
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TArr } from "../../types/array";

export const selectionSort = async (arr: TArr<number>, direction: string, setIsLoading: Dispatch<SetStateAction<boolean>>, setNums: Dispatch<SetStateAction<TArr<number>>>) => {
  setIsLoading(true);
  const { length } = arr;

  if(length === 0) {
    return;
  }
  
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = i+1; j < length; j++) {
      arr[i].color = ElementStates.Changing;
      arr[j].color = ElementStates.Changing;
      setNums([...arr]);

      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      if(direction === 'asc' ? arr[maxInd].val > arr[j].val : arr[maxInd].val < arr[j].val) {
        maxInd = j;
      }
      arr[j].color = ElementStates.Default;
      setNums([...arr]);
    }

    swap(arr, maxInd, i);
    arr[i].color = ElementStates.Modified;
  }
  arr[arr.length - 1].color = ElementStates.Modified;
  setNums([...arr]);
  setIsLoading(false);
}

export const bubbleSort = async (arr: TArr<number>, direction: string, setIsLoading: Dispatch<SetStateAction<boolean>>, setNums: Dispatch<SetStateAction<TArr<number>>>) => {
  setIsLoading(true);

  if(arr.length === 0) {
    return;
  }

  for (let j = arr.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      arr[i].color = ElementStates.Changing;
      arr[i+1].color = ElementStates.Changing;
      setNums([...arr]);

      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      if (direction === 'asc' ? arr[i].val > arr[i + 1].val : arr[i].val < arr[i + 1].val) {
        arr[i].color = ElementStates.Modified;
        arr[i+1].color = ElementStates.Modified;
        swap(arr, i, i+1);
      }
      arr[i].color = ElementStates.Default;
      arr[i+1].color = ElementStates.Modified;
      setNums([...arr]);
    }
  }
  arr[arr.length - 1].color = ElementStates.Modified;
  arr[0].color = ElementStates.Modified;
  setNums([...arr]);
  setIsLoading(false);
}

export const SortingPage: React.FC = () => {
  const [nums, setNums] = useState<TArr<number>>([]);
  const [direction, setDirection] = useState('asc');
  const [isLoading, setIsLoading] = useState(false);
  const {values, handleChange} = useForm({sorting: 'selection'});

  const handleRandomArr = () => {
    setNums(randomArr().map(el => ({val: el, color: ElementStates.Default})));
  }

  useEffect(() => {
    handleRandomArr();
  }, []);

  const handleSort = () => {
    if(values.sorting === 'selection') {
      return selectionSort(nums, direction, setIsLoading, setNums);
    }
    else {
      return bubbleSort(nums, direction, setIsLoading, setNums);
    }
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSort();
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.container} onSubmit={handleFormSubmit}> 
        <fieldset className={`${styles.fieldset} ${styles.fieldset_type_sorting}`}>
          <RadioInput 
            label='Выбор' 
            name='sorting' 
            value='selection' 
            onChange={handleChange} 
            defaultChecked disabled={isLoading}
          />
          <RadioInput 
            label='Пузырек' 
            name='sorting' 
            value='bubble' 
            onChange={handleChange} 
            disabled={isLoading}
          />
        </fieldset>
        <fieldset className={`${styles.fieldset} ${styles.fieldset_type_direction}`}>
          <Button 
            text='По возрастанию' 
            sorting={Direction.Ascending} 
            onClick={() => setDirection('asc')} 
            type='submit' 
            isLoader={direction === 'asc' && isLoading} 
            disabled={direction === 'desc' && isLoading || nums.length===0} 
            extraClass={styles.btn}
          />
          <Button 
            text='По убыванию' 
            sorting={Direction.Descending} 
            onClick={() => setDirection('desc')} 
            type='submit' 
            isLoader={direction === 'desc' && isLoading} 
            disabled={direction === 'asc' && isLoading || nums.length===0} 
            extraClass={styles.btn}
          />
        </fieldset>
        <Button text="Новый массив" onClick={handleRandomArr} disabled={isLoading} />
      </form>
      <div className={styles.columns}>
        {nums.map((el, ind) => <Column index={el.val} key={ind} state={el.color} />)}
      </div>
    </SolutionLayout>
  );
};
