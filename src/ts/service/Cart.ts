import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
        const itemFind = this.items.find((elem) => elem.id === item.id);
        if(itemFind) {
          if (itemFind && item.quantity) {
            itemFind.quantity = item.quantity;
          }
        } else {
            this._items.push(item);
        }
    }

    get items(): Buyable[] {
        return [...this._items]; 
    }

    sum(): number {
        return this.items.reduce((result, item) => {
            if(!item.quantity) {
                result = item.price + result;
            } else if (item.quantity) {
                result = (item.price * item.quantity) + result;
            }
            return result;
        },0);
    }

    sumDiscount(discount: number): number {
        const result: number = this.sum();
        return result*(1-(discount/100));
    }

    deleteItem(id: number): void {
        const index = this.items.findIndex((item) => item.id === id);
        this._items.splice(index,1);
    }

    decrementItem(id: number): void {
        const itemDecr = this._items.find((item) => item.id === id);
        if (itemDecr && itemDecr.quantity && itemDecr.quantity > 1) {
            itemDecr.quantity -= 1;
        } else if ((itemDecr && !itemDecr.quantity) || (itemDecr && itemDecr.quantity === 1)) {
            this.deleteItem(id);
        }
    }
}