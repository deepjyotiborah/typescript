/* For property decorator, 
--> first argument would be the target of the property.
For decorator on instance property(eg. - title) target wold be the class prototype and 
for statiuc property that target would be the constructor 
--> Second arg would be property name */

function Log(target:any, propertyName: string) { // Proprty Decorator
    console.log('Property Decorator !!')
    console.log(target);
}

function Log2(target:any, name: string, descriptor: PropertyDescriptor) { // Accessor/Method Decorator
    console.log('Accessor/Method Decorator!!!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

/* Pram decorator's first arg is target of the property, 2nd name of the method, 
    3rd position of the param in that method.  */
function Log3(target:any, name: string | symbol, position: number) { // param decorator
    console.log('Parameter Accessor/Method Decorator!!!');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {

    @Log
    title: string;
    private _price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log2
    set price(val: number) {
        this.price = val;
    }

    getPriceWithTax(@Log3 tax: number) {
        return this._price * (1 + tax);
    } 

    /*
        Decorators executes when you define the class not when you create instance.
         Not at runtime when you access or call the methos or any property.

         ** From accessor/Method decorator we can return a new proprty descriptor.
         But propert & param decorator cant return anything. Even if you retrun something, typescript will ignore it.
    */
}