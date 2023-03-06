import { ElementStates } from "./element-states";

export type TEl<T> = {
    val: T, 
    color: ElementStates,
}

export type TArr<T> = TEl<T>[]