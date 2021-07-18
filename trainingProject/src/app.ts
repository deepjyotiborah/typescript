//Project Type

enum ProjectStatus {
    Active, Finished
}
class Project {
    constructor(public id: string, public title: string, 
        public description: string, public people: number, public status: ProjectStatus) {

    }
}

//Project State management

type Listner = (items: Project[]) => void;

class ProjectState {
    private listners: Listner[] = [];
    private projects: any[] = [];
    private static instance: ProjectState;

    private constructor() { //private constructor for singleton

    }

     static getInstance(): ProjectState {
        if(this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    public addProject(title: string, description: string, people: number) {
        const newProject = new Project(Math.random().toString(), title, 
                                        description, people, ProjectStatus.Active);
        
        this.projects.push(newProject);
        for (const listnerFn of this.listners) {
            listnerFn(this.projects.slice());
        }
    }

    addListners(listnerFn: Listner) {
        this.listners.push(listnerFn);
    }
}

const projectState = ProjectState.getInstance();

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
    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
        this.templateElement =  document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement

        //Get hold of the copy of the content of template node
        const importedHtmlContent = document.importNode(this.templateElement.content, true);

        // assign first child node of template to element property
        this.element = importedHtmlContent.firstElementChild as HTMLElement
        this.element.id = `${this.type}-projects`;
        projectState.addListners((projects: Project[]) => {
            const relevantProjects = projects.filter(proj => {
                if (this.type === 'active') {
                    return proj.status === ProjectStatus.Active;
                }
                return proj.status === ProjectStatus.Finished;
            })
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        })

        this.attach();
        this.rederContent();
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const projItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = projItem.title;
            listEl.appendChild(listItem);
        }
    }

    private rederContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
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
            projectState.addProject(title, description, people);
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

const projInput = new ProjectInput();
const activeProjList = new ProjectList('active');
const finishedProjList = new ProjectList('finished');