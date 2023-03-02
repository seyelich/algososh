import React, { useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import { useForm } from "../../hooks/useForm";
import { getRandomInt } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./list";
import styles from './list-page.module.css';

export const ListPage: React.FC = () => {
  const { values, setValues, handleChange } = useForm({val: '', ind: ''});
  const [elems, setElems] = useState<number[]>([]);

  const list = useMemo(() => new LinkedList<number>(Array.from({length: 4}, () => getRandomInt(1,5))), [])

  useEffect(() => {
    setElems(list.toArray())
  }, [list.getSize()]);

  const handleAddInd = () => {
    list.addByInd(Number(values.val), Number(values.ind))
  }

  const handleDelInd = () => {
    list.deleteByInd(Number(values.ind))
  }

  const handleAddHead = () => {
    list.prepend(Number(values.val));
  }

  const handleAddTail = () => {
    list.append(Number(values.val));
  }

  const handleDeleteHead = () => {
    list.deleteHead();
  }

  const handleDeleteTail = () => {
    list.deleteTail();
  }

  console.log(list.getSize())
  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form} >
        <fieldset className={styles.fieldset} >
          <Input 
            maxLength={4}
            placeholder='Введите значение' 
            isLimitText={true} 
            extraClass={styles.input} 
            name='val' 
            value={values.val}
            onChange={handleChange}
          />
          <Button text='Добавить в head' onClick={handleAddHead}/>
          <Button text='Добавить в tail' onClick={handleAddTail} />
          <Button text='Удалить из head' onClick={handleDeleteHead} />
          <Button text='Удалить из tail' onClick={handleDeleteTail} />
        </fieldset>
        <fieldset className={styles.fieldset} >
          <Input 
            placeholder="Введите индекс" 
            extraClass={styles.input} 
            name='ind'
            value={values.ind}
            onChange={handleChange}
          />
          <Button text="Добавить по индексу" onClick={handleAddInd} />
          <Button text="Удалить по индексу" onClick={handleDelInd} />
        </fieldset>
      </form>
      <div className={styles.circles} >
        {
          elems.map((el, i) => {
            return <>
              <Circle 
                letter={el.toString()} 
                key={i} 
                head={i===0 ? 'head' : ''}
                tail={i===list.getSize()-1 ? 'tail' : ''}
              />
              {i !== list.getSize()-1 && <ArrowIcon key={v4()} />}
            </>
          })
        }
      </div>
    </SolutionLayout>
  );
};
