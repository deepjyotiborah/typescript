    function add(n1: number, n2: number) : number {
        return n1 + n2;
    }

    function addAndHandle(n1: number, n2: number, cb : (result : number) => void) {
        const res = n1 + n2;
        cb(res);
    }

    let combineValues: (a: number, b: number) => number;
    combineValues = add;
    // combineValues = 8;
    console.log("Result : " + combineValues(3, 5))
    addAndHandle(12, 34, (result) => {
        console.log("Callback result : " + result);
    })