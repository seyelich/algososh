import React, { FormEvent, useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { randomArr, swap } from "../../utils/utils";
import { Column } from "../ui/column/column";
import { v4 } from "uuid";
import styles from './sorting-page.module.css';
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";

type SortStep = {
  nums: number[],
  index?: number,
  state?: ElementStates
}

export const SortingPage: React.FC = () => {
  const [nums, setNums] = useState<number[]>([]);
  const [direction, setDirection] = useState('asc');
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStep, setCurrentStep] = useState<SortStep | null>(null);
  const [stepsIndex, setStepsIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const {values, handleChange} = useForm({sorting: 'selection'});

  useEffect(() => {
    if (steps.length === 0 || stepsIndex >= steps.length) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setCurrentStep(steps[stepsIndex]);
    setTimeout(() => {
      setStepsIndex(stepsIndex+1);
    }, 500);
  }, [steps, stepsIndex, currentStep, nums, direction]);


  const selectionSort = (arr: number[]) => {
    const { length } = arr;

    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      for (let j = i+1; j < length; j++) {
        if(direction === 'asc') {
          if (arr[maxInd] > arr[j]) {
            steps.push({
              nums: [...nums],
              index: maxInd,
              state: ElementStates.Changing
            });
            swap(arr, maxInd, j);
            steps.push({
              nums: [...nums],
              index: maxInd,
              state: ElementStates.Modified
            });
          }
        }
        else {
          if (arr[maxInd] < arr[j]) {
            steps.push({
              nums: [...nums],
              index: maxInd,
              state: ElementStates.Changing
            });
            swap(arr, maxInd, j);
            steps.push({
              nums: [...nums],
              index: maxInd,
              state: ElementStates.Modified
            });
          }
        }
      }
    }
    
    return steps;
  }

  const bubbleSort = (arr: number[]) => {
    for (let j = arr.length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        if (direction === 'asc' ? arr[i] > arr[i + 1] : arr[i] < arr[i + 1]) {
          steps.push({
            nums: [...nums],
            index: i,
            state: ElementStates.Changing
          });
          swap(arr, i, i+1);
          steps.push({
            nums: [...nums],
            index: i,
            state: ElementStates.Modified
          });
        }
      }
    }
    return steps;
  }

  const handleSort = () => {
    if(values.sorting === 'selection') {
      return selectionSort(nums);
    }
    else {
      return bubbleSort(nums);
    }
  }

  const handleRandomArr = () => {
    setNums(randomArr());
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setCurrentStep(null);
    setStepsIndex(0);
    setSteps(handleSort());
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.container} onSubmit={handleFormSubmit}> 
        <fieldset className={`${styles.fieldset} ${styles.fieldset_type_sorting}`}>
          <RadioInput label='Выбор' name='sorting' value='selection' onChange={handleChange} defaultChecked />
          <RadioInput label='Пузырек' name='sorting' value='bubble' onChange={handleChange} />
        </fieldset>
        <fieldset className={`${styles.fieldset} ${styles.fieldset_type_direction}`}>
          <Button text='По возрастанию' sorting={Direction.Ascending} onClick={() => setDirection('asc')} type='submit' isLoader={isLoading} disabled={nums.length===0} />
          <Button text='По убыванию' sorting={Direction.Descending} onClick={() => setDirection('desc')} type='submit' isLoader={isLoading} disabled={nums.length===0} />
        </fieldset>
        <Button text="Новый массив" onClick={handleRandomArr}/>
      </form>
      <div className={styles.columns}>
        { currentStep ? currentStep.nums.map((num, index) => {
            let stateClass = ElementStates.Default;
            const stepIndex = currentStep.index;
            if (stepIndex !== undefined) {
              if (
                index === stepIndex ||
                index === currentStep.nums.length - stepIndex - 1
              ) {
                stateClass = currentStep.state ?? ElementStates.Default;;
              }
            }
            return <Column index={num} key={v4()} state={stateClass} />
          })
          :  nums.map(num => <Column index={num} key={v4()} />)
        }
      </div>
    </SolutionLayout>
  );
};
