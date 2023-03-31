import React, { FormEvent, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css';
import { swap } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { TArr } from "../../types/array";

export const StringComponent: React.FC = () => {
  const {values, setValues, handleChange } = useForm({ word: '' });
  const [letters, setLetters] = useState<TArr<string>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onLettersSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    reverse();
    setValues({word: ''});
  }

  const reverse = async () => {
    setIsLoading(true);
    const arr = values.word.split('').map((val => ({ val, color: ElementStates.Default })));
    const mid = Math.ceil(arr.length / 2);

    if (arr.length === 0) {
      throw new Error('Enter a string');
    }
  
    for(let i=0; i<mid; i++) {
      let j = arr.length - 1 - i;
      setLetters([...arr]);
      await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
      if (i !== j) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setLetters([...arr]);
        await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
      };
      
      swap(arr, i, j);
      
      arr[i].color = ElementStates.Modified;
      arr[j].color = ElementStates.Modified;
      
      setLetters([...arr]);
    }
    setIsLoading(false);
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.container} onSubmit={onLettersSubmit} > 
        <Input maxLength={11} isLimitText={true} value={values.word} onChange={handleChange} name='word' />
        <Button text='Развернуть' type="submit" isLoader={isLoading} disabled={!values.word} />
      </form>
      {
        <div className={styles.circles}>
          {
            letters.map((el, ind) => <Circle letter={el.val} key={ind} state={el.color} />)
          }
        </div>
      }
    </SolutionLayout>
  );
};
