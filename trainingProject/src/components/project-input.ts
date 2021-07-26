import Component from './base-component.js';
import * as Validation from '../util/validation.js';
import { autobind as Autobind} from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{

    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    peopleInput: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInput = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInput = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInput = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
    }

    renderContent() {}

    private gatherUserInput() : [string, string, number] | void {
        const enteredTitle = this.titleInput.value;
        const enteredDescription = this.descriptionInput.value;
        const enteredPeople = this.peopleInput.value;

        const titleValidatable: Validation.Validatable = {
            value: enteredTitle,
            required: true
        }
        const descriptionValidatable: Validation.Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }
        const peopleValidatable: Validation.Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

        if  (Validation.validate(titleValidatable) &&
             Validation.validate(descriptionValidatable) && 
             Validation.validate(peopleValidatable)) {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
        alert('Invalid input!!')
        
    }

    private clearInput() {
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.peopleInput.value = '';
    }
    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const[title, description, people] = userInput;
            projectState.addProject(title, description, people);
            console.log(title, description, people);
        }
        
        this.clearInput();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }
}