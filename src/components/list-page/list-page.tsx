import React, { useEffect, useMemo, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
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
    return list.toArray().map(el => ({val: el, small:false, state: ElementStates.Default}));
  }

  const [name, setName] = useState('');
  const { values, setValues, handleChange } = useForm({val: '', ind: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [arr, setArr] = useState<{val: string, small:boolean, state: ElementStates}[]>([]);
  const [curr, setCurr] = useState<number>(0);

  useEffect(() => {
    setArr(getColoredArr())
  }, [])

  const value = values.val;
  const index = Number(values.ind);
  
  const handleAddHead = async () => {
    setIsLoading(true);
    setName('addHead');
    list.prepend(value);
    setValues({val: '', ind: ''});
    const newArr = getColoredArr();
    newArr[0] = {...newArr[0], small: true, state: ElementStates.Changing};
    setArr([...newArr]);
    await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
    newArr[0] = {...newArr[0], small: false, state: ElementStates.Modified};
    setArr([...newArr]);
    await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
    newArr[0] = {...newArr[0], small: false, state: ElementStates.Default};
    setArr([...newArr]);
    setIsLoading(false);
  }
 
  const handleAddTail = async () => {
    setIsLoading(true);
    setName('addTail');
    list.append(value);

    const newArr = getColoredArr();
    newArr[newArr.length-1] = {val: value, small: true, state: ElementStates.Changing};

    setArr(newArr);
    setValues({val: '', ind: ''});
    await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
    setArr([...arr, {val: value, small: false, state: ElementStates.Modified}]);
    await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
    setArr([...arr, {val: value, small: false, state: ElementStates.Default}]);
    setIsLoading(false);
  }

  const handleDeleteHead = async () => {
    setIsLoading(true);
    setName('delHead');
    setValues({val: '', ind: ''});
    let newArr = [...arr];

    newArr.unshift({ val: '', small: false, state: ElementStates.Default});
    newArr[1] = {...newArr[1], small: true, state: ElementStates.Changing};
    
    setArr(newArr);

    await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
    list.deleteHead();
    
    newArr = getColoredArr();
    setArr(newArr);

    setIsLoading(false);
  }

  const handleDeleteTail = async () => {
    setIsLoading(true);
    setName('delTail');
    setValues({val: '', ind: ''});
    let newArr = [...arr];
    newArr.push({ val: '', small: false, state: ElementStates.Default});
    newArr[newArr.length-2] = {...newArr[newArr.length-2], small: true, state: ElementStates.Changing};
    setArr(newArr);
    await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
    list.deleteTail();
    newArr = getColoredArr();
    setArr(newArr);
    setIsLoading(false);
  }

  const handleAddInd = async () => {
    setName('addInd');
    setIsLoading(true);
    list.addByInd(value, index);
    const newArr = getColoredArr();
    newArr[index] = {val: value, small: true, state: ElementStates.Changing};

    for(let i=0; i<=index; i++) {
      await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
      if(i<=index) {
        setCurr(i);
        newArr[i-1] = {...newArr[i-1], state: ElementStates.Changing};
        setArr([...newArr]);
        
      }
    }

    newArr[index] = {val: value, small: false, state: ElementStates.Modified};
    setArr(newArr);

    await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
    setArr(getColoredArr());
    setIsLoading(false);
    setCurr(0);
  }
  
  const handleDelInd = async () => {
    setName('delInd');
    setIsLoading(true);
    const newArr = [...arr];

    for(let i=0; i<=index; i++) {
      await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
      if(i<=index) {
        setCurr(i);
        newArr[i] = {...newArr[i], state: ElementStates.Changing};
        setArr(newArr);
      }
    }

    newArr[index] = {...newArr[index], small: true, state: ElementStates.Changing};
    newArr.splice(index, 0, {val: '', small: false, state: ElementStates.Default});
    
    setArr(newArr);

    await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
    list.deleteByInd(index);
    setArr(getColoredArr());
    setIsLoading(false);
    setCurr(0);
  }
  
  const setHead = (i: number) => {
    switch (name) {
      case 'addHead':
        return i===1 && arr[0].small ? <Circle letter={arr[0].val} state={arr[0].state} isSmall={true} /> : undefined;
      case 'addTail':
        return i===arr.length-2 && arr[arr.length-1].small ? <Circle letter={arr[arr.length-1].val} state={arr[arr.length-1].state} isSmall={true} /> : undefined;
      case 'addInd': 
          return i === curr && arr[index].small ? <Circle letter={arr[index].val} state={arr[index].state} isSmall={true} /> : undefined;
      default:
        return i === 0 ? 'head' : undefined
    }
  }

  const setTail = (i: number) => {
    switch (name) {
      case 'delHead':
        return i===0 && arr.length > 1 && arr[1].small ? <Circle letter={arr[1].val} state={arr[1].state} isSmall={true} /> : undefined;
      case 'delTail':
        return i===arr.length-1 && arr.length > 2 && arr[arr.length-2].small ? <Circle letter={arr[arr.length-2].val} state={arr[arr.length-2].state} isSmall={true} /> : undefined;
      case 'delInd':
        return i === index && arr.length > index+1 && arr[index+1].small ? <Circle letter={arr[index+1].val} state={arr[index+1].state} isSmall={true} /> : undefined;
      default:
        return i === arr.length-1 ? 'tail' : undefined
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
            onClick={handleAddHead} 
            disabled={name !== 'addHead' && isLoading || list.getSize() === 6 || values.val === ''}
            isLoader={name === 'addHead' && isLoading}
          />
          <Button 
            text='Добавить в tail'
            name="addTail" 
            onClick={handleAddTail} 
            disabled={name !== 'addTail' && isLoading || list.getSize() === 6 || values.val === ''}
            isLoader={name === 'addTail' && isLoading}
          />
          <Button 
            text='Удалить из head' 
            onClick={handleDeleteHead} 
            disabled={name !== 'delHead' && isLoading || list.getSize() === 0} 
            isLoader={name === 'delHead' && isLoading}
          />
          <Button 
            text='Удалить из tail'
            name="delTail" 
            onClick={handleDeleteTail} 
            disabled={name !== 'delTail' && isLoading || list.getSize() === 0}
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
            disabled={name !== 'addInd' && isLoading || list.getSize() === 6 || values.val === '' || values.ind === '' || index >= list.getSize() || index < 0}
            isLoader={name === 'addInd' && isLoading} 
          />
          <Button 
            text="Удалить по индексу" 
            onClick={handleDelInd} 
            name='delInd' 
            disabled={name !== 'delInd' && isLoading || list.getSize() === 0 || values.ind === '' || index >= list.getSize() || index < 0} 
            isLoader={name === 'delInd' && isLoading}
          />
        </fieldset>
      </form>
      <ul className={styles.circles} >
        {
          arr.map((el, i) =>
            !el.small &&
            <li className={styles.circle} key={i}>
              <Circle 
                letter={el.val}
                index={i}
                state={el.state}
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
