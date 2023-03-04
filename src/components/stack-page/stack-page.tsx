import React, { FormEvent, useEffect, useState } from "react";
import { v4 } from "uuid";
import { useForm } from "../../hooks/useForm";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack-page.module.css';
import { Stack } from "./stack";
import { ElementStates } from "../../types/element-states";

const st = new Stack<string>();

export const StackPage: React.FC = () => {
  const { values, setValues, handleChange } = useForm({ str: '' });
  const [step, setStep] = useState(-1);
  const [state, setState] = useState(ElementStates.Default);

  const handleDelete = () => {
    setTimeout(() => 
      {
        st.pop();
        setStep(step-1);
      }, 500); 
    setValues({str: ''});
    setState(ElementStates.Changing);
  }

  const handleReset = () => {
    st.clear();
    setValues({str: ''});
    setStep(-1);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    st.push(values.str);
    setValues({str: ''});
    setState(ElementStates.Changing);
    setStep(step+1);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {setState(ElementStates.Default)}, 500);
    return () => clearTimeout(timeout);
  }, [state]);

  return (
    <SolutionLayout title="Стек">
      <form className={styles.container} onSubmit={handleSubmit} onReset={handleReset} >
        <fieldset className={styles.fieldset}>
          <Input isLimitText={true} maxLength={4} name='str' value={values.str} onChange={handleChange} />
          <Button text="Добавить" disabled={!values.str || st.size() > 25} type='submit' />
          <Button text="Удалить" onClick={handleDelete} disabled={st.size() === 0}/>
        </fieldset>
        <Button text="Очистить" type="reset" disabled={st.size() === 0} />
      </form>
      <div className={styles.circles}>
        {
          st.elements().map((el, ind, arr) => 
            <Circle 
              letter={el} 
              key={v4()} 
              index={ind} 
              head={ind === arr.length-1 ? 'top': undefined} 
              state={step === ind ? state : ElementStates.Default}
          />)
        }
      </div>
    </SolutionLayout>
  );
};
