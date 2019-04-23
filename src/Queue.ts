export class Queue<T> {
    private items: T[] = [];
    public insert(item: T): void {
        this.items = [...this.items, item]
    }
    public remove(): void {
        const [_, ...rest] = this.items;
        this.items = rest;
    }
    public queryFirstElement(): T {
        return this.items[this.items.length - 1];
    }
    public getAll(): T[] {
        return this.items;
    }
}
