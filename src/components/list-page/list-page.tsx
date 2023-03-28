import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { useForm } from "../../hooks/useForm";
import { TArr } from "../../types/array";
import { ElementStates } from "../../types/element-states";
import { getRandomInt } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./list";
import styles from './list-page.module.css';

export const ListPage: React.FC = () => {
  const list = useMemo(() => new LinkedList<string>(Array.from({length: 4}, () => getRandomInt(1,5).toString())), []);

  const getColoredArr = () => {
    return list.toArray().map(el => ({val: el, color: ElementStates.Default}));
  }

  const [name, setName] = useState('');
  const { values, setValues, handleChange } = useForm({val: '', ind: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [arr, setArr] = useState<TArr<string>>([]);
  const [currInd, setCurrInd] = useState<number>(0);
  const [currVal, setCurrVal] = useState<string>('');

  useEffect(() => {
    setArr(getColoredArr())
  }, [])

  const value = values.val;
  const index = Number(values.ind);
  
  const handleAddHead = (e: MouseEvent<HTMLButtonElement>) => {
    handleAdd(0, e.currentTarget.name);
  }
 
  const handleAddTail = (e: MouseEvent<HTMLButtonElement>) => {
    handleAdd(arr.length-1, e.currentTarget.name);
  }

  const handleAddInd = (e: MouseEvent<HTMLButtonElement>) => {
    handleAdd(index, e.currentTarget.name);
  }

  const handleDeleteHead = (e: MouseEvent<HTMLButtonElement>) => {
    handleDelete(0, e.currentTarget.name);
  }

  const handleDeleteTail = (e: MouseEvent<HTMLButtonElement>) => {
    handleDelete(arr.length-1, e.currentTarget.name);
  }

  const handleDelInd = (e: MouseEvent<HTMLButtonElement>) => {
    handleDelete(index, e.currentTarget.name);
  }

  const handleDelete = async (i: number, operation: string) => {
    setIsLoading(true);
    setName(operation);
    
    const newArr = [...arr];
    setCurrVal(newArr[i].val);

    if((i === 0 || i === newArr.length-1) && operation !== 'delInd') {
      newArr[i] = {...newArr[i], color: ElementStates.Changing};
      setArr([...newArr]);
    } else {
      for(let i=0; i<=index; i++) {
        await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
        if(i<=index) {
          setCurrInd(i);
          newArr[i] = {...newArr[i], color: ElementStates.Changing};
          setArr([...newArr]);
        }
      }
    }

    await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
    newArr[i] = {...newArr[i], val: '', color: ElementStates.Default};
    setArr(newArr);
    list.deleteByInd(i);
    
    await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
    setArr(getColoredArr());
    setIsLoading(false);
    setValues({val: '', ind: ''});
    setName('');
  }

  const handleAdd = async (i: number, operation: string) => {
    setIsLoading(true);
    setName(operation);
    
    let newArr = [...arr];
    i === newArr.length-1 ? list.append(value) : list.addByInd(value, i);
    setCurrVal(value);
    
    if((i === 0 || i === newArr.length-1) && operation !== 'addInd') {
      newArr = getColoredArr();
      const actualIndex = i === 0 ? i : i+1
      await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
      newArr[actualIndex] = {...newArr[actualIndex], color: ElementStates.Modified};
      setArr([...newArr]);
      setName('');

      await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
      newArr[actualIndex] = {...newArr[actualIndex], color: ElementStates.Default};
      setArr([...newArr]);
      setIsLoading(false);
    } else {
      setCurrInd(0);
      for(let i=0; i<=index; i++) {
        await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
        if(i<=index) {
          setCurrInd(i);
          newArr[i-1] = {...newArr[i-1], color: ElementStates.Changing};
          setArr([...newArr]);
        }
      }
  
      await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
      newArr = getColoredArr();
      newArr[index] = {val: value, color: ElementStates.Modified};
      setArr([...newArr]);
      setCurrInd(-1);
  
      await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
      setArr(getColoredArr());
      setIsLoading(false);
      setValues({val: '', ind: ''});
      setName('');
    }
  }

  const setHead = (i: number) => {
    const head = (condition: boolean) => condition ? <Circle letter={currVal} state={ElementStates.Changing} isSmall={true} /> : i === 0 ? HEAD : undefined;
    switch (name) {
      case 'addHead':
        return head(i===0)
      case 'addTail':
        return head(i===arr.length-1)
      case 'addInd': 
          return head(i === currInd)
      default:
        return i === 0 ? HEAD : undefined
    }
  }

  const setTail = (i: number) => {
    const tail = (condition: boolean) => condition ? <Circle letter={currVal} state={ElementStates.Changing} isSmall={true} /> : i === arr.length-1 ? TAIL : undefined;
    switch (name) {
      case 'delHead':
        return tail(i===0 && arr[i].val === '')
      case 'delTail':
        return tail(i===arr.length-1 && arr[i].val === '')
      case 'delInd':
        return tail(i === index && arr[i].val === '')
      default:
        return i === arr.length-1 ? TAIL : undefined
    }
  }

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
            disabled={isLoading}
          />
          <Button 
            text='Добавить в head' 
            name='addHead'
            onClick={handleAddHead} 
            disabled={(name !== 'addHead' && isLoading) || list.getSize() === 6 || values.val === ''}
            isLoader={name === 'addHead' && isLoading}
          />
          <Button 
            text='Добавить в tail'
            name="addTail" 
            onClick={handleAddTail} 
            disabled={(name !== 'addTail' && isLoading) || list.getSize() === 6 || values.val === ''}
            isLoader={name === 'addTail' && isLoading}
          />
          <Button 
            text='Удалить из head' 
            name="delHead" 
            onClick={handleDeleteHead} 
            disabled={(name !== 'delHead' && isLoading )|| list.getSize() === 0} 
            isLoader={name === 'delHead' && isLoading}
          />
          <Button 
            text='Удалить из tail'
            name="delTail" 
            onClick={handleDeleteTail} 
            disabled={(name !== 'delTail' && isLoading) || list.getSize() === 0}
            isLoader={name === 'delTail' && isLoading} 
          />
        </fieldset>
        <fieldset className={styles.fieldset} >
          <Input 
            placeholder="Введите индекс" 
            extraClass={styles.input} 
            name='ind'
            value={values.ind}
            onChange={handleChange}
            type='number'
            disabled={isLoading}
          />
          <Button 
            text="Добавить по индексу" 
            onClick={handleAddInd} 
            name='addInd'
            disabled={(name !== 'addInd' && isLoading )|| list.getSize() === 6 || values.val === '' || values.ind === '' || index >= list.getSize() || index < 0}
            isLoader={name === 'addInd' && isLoading} 
          />
          <Button 
            text="Удалить по индексу" 
            onClick={handleDelInd} 
            name='delInd' 
            disabled={(name !== 'delInd' && isLoading) || list.getSize() === 0 || values.ind === '' || index >= list.getSize() || index < 0} 
            isLoader={name === 'delInd' && isLoading}
          />
        </fieldset>
      </form>
      <ul className={styles.circles} >
        {
          arr.map((el, i) =>
            <li className={styles.circle} key={i}>
              <Circle 
                letter={el.val}
                index={i}
                state={el.color}
                head={setHead(i)}
                tail={setTail(i)}
              />
              {i !== arr.length-1 && <ArrowIcon />}
            </li>
          )
        }
      </ul>
    </SolutionLayout>
  );
};
