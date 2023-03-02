class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}
  
export interface ILinkedList<T> {
    append: (element: T) => void;
    prepend: (element: T) => void;
    addByInd: (element: T, ind: number) => void;
    getSize: () => number;
    toArray: () => T[];
    deleteByInd: (i: number) => void;
    deleteTail: () => void;
    deleteHead: () => void;
}

export class LinkedList<T> implements ILinkedList<T>{
    private head: Node<T> | null;
    private size: number;
    constructor(elements: T[]) {
        this.head = null;
        this.size = 0;

        if(elements.length) {
            elements.forEach(el => this.append(el));
        }
    }

    addByInd(element: T, ind: number) {
        if (ind < 0 || ind > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
        const node = new Node(element);

            if (ind === 0) {
                node.next =  this.head;
                this.head = node;
            } else {
                let curr = this.head;
                let currIndex = 0;

                if(curr) {
                    while(curr.next !== null && currIndex < ind-1) {
                        curr = curr.next;
                        ++currIndex;
                    }
                    node.next = curr.next;
                    curr.next = node; 
                }
            }

            this.size++;
        }
    }

    append(element: T) {
        const node = new Node(element);
        let current;

        if (this.head === null) {
        this.head = node;
        } else {
        current = this.head;
        while (current.next) {
            current = current.next;
        }

        current.next = node;
        }
        this.size++;
    }

    prepend(element: T) {
        const node = new Node(element);

        if(this.head === null) {
            this.head = node;
        } else {
            this.head.next = node;
            this.head = node;
            ++this.size;
        }
    }

    deleteByInd(ind: number) {
        if (ind < 0 || ind > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            if (ind === 0) {
                this.deleteHead();
            } else {
                let curr = this.head;

                if(curr) {
                    while (curr.next && curr.next.next !== null && ind > 0) {
                        curr = curr.next;
                        ind = ind - 1;
                    }
                  
                    const value = curr.value;
                    curr.next = curr.next!.next;
                }
            }

            --this.size;
        }
    }

    deleteHead() {
        if(this.head === null) {
            throw new Error('No head')
        } else {
            if(this.head.next) {
                this.head = this.head.next;
            }
            else this.head = null;
            --this.size;
        }
    }

    deleteTail() {
        let current;

        if (this.head === null) {
            throw new Error('No head')
        } else {
            current = this.head;
            while (current.next) {
                if (!current.next.next) {
                    current.next = null;
                } else {
                    current = current.next;
                }
            }
        }
        this.size--;
    }

    getSize() {
        return this.size;
    }

    toArray() {
        let curr = this.head;
        const res :T[] = [];
        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        }
        return res;
    }
}
