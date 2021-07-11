class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItems(item:T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if(this.data.indexOf(item) === -1) {
            return;
        }

        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string> ();
textStorage.addItems('mango');
textStorage.addItems('orange');
console.log('Items - ' + textStorage.getItems());

const numberStorage = new DataStorage<number> ();