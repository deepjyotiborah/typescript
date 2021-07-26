//Base component class
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element : U;

        constructor(templateId: string, hostElementId: string, insertedAtStart: boolean, newElementId? : string) {
        this.templateElement =  document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T

        //Get hold of the copy of the content of template node
        const importedHtmlContent = document.importNode(this.templateElement.content, true);
        
        // assign first child node of template to element property
        this.element = importedHtmlContent.firstElementChild as U
        if (newElementId) {
            this.element.id = newElementId;
        }

        this.attach(insertedAtStart);
    }

    attach(insertedAtStart: boolean) {
        //inserts a given element node at a given position relative to the element it is invoked upon
        this.hostElement.insertAdjacentElement(insertedAtStart ? 'afterbegin' : 'beforeend', this.element);
   }

   abstract configure(): void;
   abstract renderContent(): void;
}