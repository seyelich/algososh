interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    clear: () => void;
    size: () => number;
    elements: () => T[];
}
  
export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item);
    };

    pop = (): void => {
        this.container.length && this.container.pop();
    };

    clear = () => this.container = [];

    size = () => this.container.length;
    elements = () => this.container;
}