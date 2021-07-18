//Validation
interface Validatable {
    value: string | number;
    required?: boolean; // ? is to make it optional, allow undefined.
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validateInput : Validatable): boolean {
    let isValid = true;
    if (validateInput.required) {
        isValid = isValid && validateInput.value.toString().trim().length != 0;
    }

    if (validateInput.minLength != null && typeof validateInput.value === 'string') {
       isValid = isValid && validateInput.value.length > validateInput.minLength;
    }

    if (validateInput.maxLength != null && typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length <= validateInput.maxLength;
     }

     if (validateInput.min != null && typeof validateInput.value === 'number') {
         isValid = isValid && validateInput.value >= validateInput.min;
     }

     if (validateInput.max != null && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value < validateInput.max;
    }

    return isValid;
}

//Autobind Decorator
function autobind(_: any, _1: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element : HTMLElement;

    constructor(private type: 'active' | 'finished') {
        this.templateElement =  document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement

        //Get hold of the copy of the content of template node
        const importedHtmlContent = document.importNode(this.templateElement.content, true);

        // assign first child node of template to element property
        this.element = importedHtmlContent.firstElementChild as HTMLElement
        this.element.id = `${this.type}-projects`;
        this.attach();
    }

    private rederContent() {

    }
    private attach() {
         //inserts a given element node at a given position relative to the element it is invoked upon
         this.hostElement.insertAdjacentElement('beforeend', this.element)
    }
}

class ProjectInput {

    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element : HTMLFormElement;
    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    peopleInput: HTMLInputElement;

    constructor() {
        this.templateElement =  document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement

        //Get hold of the copy of the content of template node
        const importedHtmlContent = document.importNode(this.templateElement.content, true);

        // assign first child node of template to element property
        this.element = importedHtmlContent.firstElementChild as HTMLFormElement
        this.element.id = 'user-input';
        this.titleInput = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInput = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInput = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
        this.updateTempleteContentInHostElement();
    }

    private gatherUserInput() : [string, string, number] | void {
        const enteredTitle = this.titleInput.value;
        const enteredDescription = this.descriptionInput.value;
        const enteredPeople = this.peopleInput.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        }
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

        if (validate(titleValidatable) && validate(descriptionValidatable) && validate(peopleValidatable)) {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
        alert('Invalid input!!')
        
    }

    private clearInput() {
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.peopleInput.value = '';
    }
    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const[title, description, people] = userInput;
            console.log(title, description, people);
        }
        this.clearInput();
    }
    private configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }
    private updateTempleteContentInHostElement() {
        //inserts a given element node at a given position relative to the element it is invoked upon
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }
}

const projInput = new ProjectInput()