import { Project, ProjectStatus } from '../models/project.js';

export class State<T> {
    protected listners: Listner<T>[] = [];

    addListners(listnerFn: Listner<T>) {
        this.listners.push(listnerFn);
    }
}

type Listner<T> = (items: T[]) => void;

class ProjectState extends State<Project>{
    
    private projects: any[] = [];
    private static instance: ProjectState;

    private constructor() { //private constructor for singleton
        super();
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
        this.updateListners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId)
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListners();
        }
    }

    private updateListners() {
        for (const listnerFn of this.listners) {
            listnerFn(this.projects.slice());
        }
    }
}

export const projectState = ProjectState.getInstance();