export {}
interface Predicate<T> {
    (item: T): boolean;
}

declare global {
    interface Array<T> {
        replace(predicate: Predicate<T>, item: T): void;
        remove(predicate: Predicate<T>): void;
    }
}

Array.prototype.replace = function<T>(predicate: Predicate<T>, item: T) {
    console.log('called replace')
    console.log({test: this})
    if (!this) return;

    const list = this as T[];
    const idx = list.findIndex(predicate);
    list.splice(idx, 1, item);
}

Array.prototype.remove = function<T>(predicate: Predicate<T>) {
    console.log('called remove')
    console.log({test: this})
    if (!this) return;

    const list = this as T[];
    const idx = list.findIndex(predicate);
    list.splice(idx, 1);
}

