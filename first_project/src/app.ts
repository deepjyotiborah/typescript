abstract class Departmemnt {
    //name: string;
    protected employees: string[] =[];

    constructor(private readonly id: number, public empName: string) {
        //this.name = n;
    }

    abstract describe():void;

    addEmployee(emp:string) {
        this.employees.push(emp);
    }

    printEmployees() {
        console.log(this.employees.length);
        console.log(this.empName + ' department employees - ' + this.employees);
    }

    static createEmployee(name:string) {
        return {name: name}
    }
}

class ITDepartment extends Departmemnt {
    constructor(id:number, public admins: string[]) {
        super(id, 'IT');
    }

    describe():void {
        console.log('IT department describe.....')
    }
}
  
class Accounting extends Departmemnt {
    private lastReport: string;

    constructor(id:number, public reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = this.reports[0];
    }

    describe():void {
        console.log('Accounting department describe.....')
    }

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }

        throw Error('No last report found.');
    }

    set mostRecentReport(value:string) {
        if (!value) {
            throw Error('Please pass in a value')
        }
        this.addReports(value);
    }

    addEmployee(emp:string) {
        if(emp === 'Test') {
            return;
        }
        this.employees.push(emp);
    }
    
    addReports(text:string) {
        this.reports.push(text);
        this.lastReport = text
    }

    printReports() {
        console.log('Reports - ' + this.reports);
    }
}
const IT = new ITDepartment(1, ['testAdmin']);

IT.addEmployee("Deep");
IT.addEmployee("Max");
IT.printEmployees();
IT.describe();
console.log('IT object - ' + IT);

const accounting = new Accounting(1,[]);
accounting.addEmployee('Deep')
accounting.addEmployee('Test');
accounting.printEmployees();

//accounting.mostRecentReport;

accounting.addReports('test Report 1');
accounting.addReports('test Report 2');
accounting.printReports();
console.log('last report - ' + accounting.mostRecentReport);

accounting.mostRecentReport = 'This is the recent report.'
console.log('last report - ' + accounting.mostRecentReport);
accounting.describe();

const emp = Departmemnt.createEmployee('staticEmployee');
console.log(emp);