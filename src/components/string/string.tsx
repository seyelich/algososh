import React, { FormEvent, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css';
import { v4 } from "uuid";
import { swap } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";

export interface LettersStep {
  letters: string[];
  index?: number;
  state?: ElementStates;
}

export const StringComponent: React.FC = () => {
  const {values, handleChange } = useForm({ word: '' });
  
  const [steps, setSteps] = useState<LettersStep[]>([]);
  const [currentStep, setCurrentStep] = useState<LettersStep | null>(null);
  const [stepsIndex, setStepsIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (steps.length === 0 || stepsIndex >= steps.length) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setCurrentStep(steps[stepsIndex]);
    setTimeout(() => {
      setStepsIndex(stepsIndex + 1);
    }, 1000);
    
  }, [steps, currentStep, stepsIndex]);

  const onLettersSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const letters = values.word;

    setCurrentStep(null);
    setStepsIndex(0);
    setSteps(getSteps(letters));
  };

  const getSteps = (source: string): LettersStep[] => {
    const letters = source.split("");
    const steps: LettersStep[] = [];
  
    if (letters.length === 0) {
      return steps;
    }
  
    steps.push({
      letters: [...letters]
    });
  
    let leftIndex = 0;
    let rightIndex = letters.length - leftIndex - 1;
  
    while (leftIndex <= rightIndex) {
      steps.push({
        letters: [...letters],
        index: leftIndex,
        state: ElementStates.Changing
      });

      swap(letters, leftIndex, rightIndex);

      steps.push({
        letters: [...letters],
        index: leftIndex,
        state: ElementStates.Modified
      });
  
      leftIndex++;
      rightIndex--;
    }
  
    steps.push({
      letters: [...letters]
    });
  
    return steps;
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.container} onSubmit={onLettersSubmit} > 
        <Input maxLength={11} isLimitText={true} value={values.word} onChange={handleChange} name='word' />
        <Button text='Развернуть' type="submit" isLoader={isLoading} disabled={!values.word} />
      </form>
      {
        currentStep &&
        <div className={styles.circles}>
          {
            currentStep.letters.map((letter, index) => {
              let stateClass = ElementStates.Default;
              const stepIndex = currentStep.index;
              if (stepIndex !== undefined) {
                if (
                  index === stepIndex ||
                  index === currentStep.letters.length - stepIndex - 1
                ) {
                  stateClass = currentStep.state ?? ElementStates.Default;
                }
              }
              else { stateClass = ElementStates.Modified}
              return <Circle letter={letter} key={v4()} state={stateClass} />
            })
          }
        </div>
      }
    </SolutionLayout>
  );
};
