import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/useForm";
import { Queue } from "./queue";
import { ElementStates } from "../../types/element-states";

const q = new Queue<string>(7);

export const QueuePage: React.FC = () => {
  const {values, setValues, handleChange} = useForm({str: ''});
  const [state, setState] = useState(ElementStates.Default);
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const tail = q.qTail();
  const head = q.qHead();
  const length = q.len();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    q.enqueue(values.str);
    setValues({str: ''});
    setState(ElementStates.Changing);
    setStep(tail);
    setIsLoading(true);
  }

  const handleDelete = () => {
    setStep(head);
    setValues({str: ''});
    setTimeout(() => q.dequeue(), 500); 
    setState(ElementStates.Changing);
    setIsLoading(true);
  }

  const handleReset = () => {
    q.clear();
    setValues({str: ''});
    setStep(0);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {setState(ElementStates.Default); setIsLoading(false)}, 500);
    return () => clearTimeout(timeout);
  }, [state]);

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.container} onSubmit={handleSubmit} onReset={handleReset} >
        <fieldset className={styles.fieldset}>
          <Input isLimitText={true} maxLength={4} name='str' value={values.str} onChange={handleChange} />
          <Button text="Добавить" type="submit" disabled={!values.str || length === q.s()} isLoader={isLoading} />
          <Button text="Удалить" onClick={handleDelete} disabled={length === 0} isLoader={isLoading} />
        </fieldset>
        <Button text="Очистить" type="reset" disabled={length === 0}/>
      </form>
      <div className={styles.circles}>
        {
          q.elements().map((el, ind) => 
            {console.log(step, ind); return <Circle 
              letter={el ? el : undefined} 
              key={ind} 
              index={ind} 
              tail={ind+1 === tail && !q.isEmpty()  ? 'tail': undefined} 
              head={ind === head && !q.isEmpty() ? 'head' : undefined}
              state={step === ind ? state : ElementStates.Default}
          />})
        } 
      </div>
    </SolutionLayout>
  );
};
