import React, { FormEvent, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css';
import { v4 } from 'uuid';

type FibStep = {
  nums: number[],
  index?: number
}

export const FibonacciPage: React.FC = () => {
  const { values, handleChange } = useForm({num: ''});
  const [stepInd, setStepInd] = useState(0);
  const [currentStep, setCurrentStep] = useState<FibStep | null>(null);
  const [steps, setSteps] = useState<FibStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (steps.length === 0 || stepInd >= steps.length) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setCurrentStep(steps[stepInd]);
    setTimeout(() => {
      setStepInd(stepInd+1);
    }, 500);
  }, [steps, stepInd, currentStep]);

  const onFibSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setCurrentStep(null);
    setStepInd(0);
    setSteps(getFib(Number(values.num)));
  }

  const getFib = (ind: number) => {
    const arr = [];
    const steps: FibStep[] = [];

    let cur = 0;
    let prev = 1;

    for(let i=0; i<=ind; i++) {
      [cur, prev] = [cur + prev, cur];
      arr.push(cur);
      steps.push({
        nums: [...arr],
        index: i
      });
    }
    return steps;
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.container} onSubmit={onFibSubmit}> 
        <Input min={1} max={19} isLimitText={true} type='number' value={values.word} onChange={handleChange} name='num' />
        <Button text='Рассчитать' type="submit" isLoader={isLoading} disabled={0>= Number(values.num) || Number(values.num)>19} />
      </form>
      {currentStep &&
        <div className={styles.circles}>
        {
          currentStep.nums.map((num, ind) => <Circle letter={num.toString()} key={v4()} index={ind} />)
        }
        </div>
      }
    </SolutionLayout>
  );
};
