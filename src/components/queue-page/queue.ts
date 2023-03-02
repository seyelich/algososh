interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    elements: () => (T | undefined)[];
    clear: () => void;
}
  
export class Queue<T> implements IQueue<T> {
    private container: (T | undefined)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;
  
    constructor(size: number) {
        this.size = size;
        this.container = Array(size).fill(undefined);
    }
  
    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        
        if(this.tail >= this.size) this.tail = 0;
        this.container[this.tail % this.size] = item;
        ++this.tail;
        ++this.length;
    };
  
    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        
        this.container.splice(this.head % this.size, 1, undefined);
        ++this.head;
        if(this.head >= this.size) this.head = 0;
        --this.length;
    };
  
    clear = () => {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
        this.container = Array(this.size).fill(undefined);
    }

    elements = () => this.container;

    len = () => this.length;

    s = () => this.size;

    qHead = () => this.head;
    qTail = () => this.tail;
  
    isEmpty = () => this.length === 0;
}