
// function Logger(constructor: Function) {
//     console.log("Logging ...");
//     console.log(constructor);
// }

function Logger(logDetail: string) {
    console.log('Logger Factory ...')
    return function(constructor: Function) {
        console.log(logDetail);
        //console.log(constructor);
    }
}

/*
    We can return a new constructor from the class level decorator for the class where the decorator present.
*/
function WithTemplate(template:string, hookId: string) {
    console.log('template Factory ...')
    return function<T extends {new (...args: any[]): {name: string} }>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('With Template decorator...')
                const hookElement = document.getElementById(hookId);
                const p = new originalConstructor();
            
                if (hookElement) {
                    hookElement.innerHTML = template;
                    hookElement.querySelector('h1')!.innerHTML = this.name;
                }
            }
            
        }
        
    }
}

@Logger('Logging Person Detail')    // First Decorator
@WithTemplate('<h1> Person Object</h1>', 'app')  
/* Decorators executes in bottom-up fashion
in our case WithTemplate will executes forst then Logger decorator 

But in case of decorator factory execution or creation of decorators are top to bottom.
In our case  'Logger Factory ... will print first then 'template Factory ...'*/
class PersonDetail {
 name: string = 'Deep';

    constructor() {
        console.log('in constructor, name - ' + this.name);
    }
}
