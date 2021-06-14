    function addFunc(n1: number, n2: number, showResult: boolean, outputString: String) {
        let result = n1 + n2;
        if (showResult) {
            return outputString + result.toString();
        } else {
            return result;
        }
    }

    let num1: number = 3;
    const num2: number = 5;
    const outputStr: string = "The result is ";
    console.log(addFunc(num1, num2, true, outputStr))

    enum DEPARTMENT {
        IT = 1, SCIENCE = "SC", COMMERCE = 2
    }

    const person: {
        name: string;
        age: number;
        hobbies: string[];
        role: [number, string]; //  its a tuple
        department: DEPARTMENT
    }
    = {
        name: "Deep",
        age: 34,
        hobbies: ["football", "swimming","cooking"],
        role: [2, "admin"],
        department: DEPARTMENT.SCIENCE
    }
    console.log("Name is " + person.name);

    for(const hobby of person.hobbies) {
        console.log("-> " + hobby.toUpperCase());
    }
    if(person.department === DEPARTMENT.SCIENCE) {
        console.log("In science.");
    }
