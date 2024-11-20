class Employee {
    constructor(name, work) {
        this.name = name;
        this.work = work;
    }
}


let rndWorkAssign = ['fullTime', 'partTime'];
let rndAttendance = ['absent', 'present'];

class Company {

    constructor(name, wph, fullDay, halfDay) {
        this.name = name;
        this.wph = wph;
        this.fullDay = fullDay;
        this.halfDay = halfDay;
        this.genWorkerNumber;
        this.workers = [];
        this.perDayDetails = [];
        this.forMonth = new Array(30);
        this.PerMonthDetails = [];
        this.wageBuilder = 0;
        this.names = [
            "Aarav", "Sofia", "Mohammed", "Yuki", "Liam",
            "Anaya", "Xiang", "Carlos", "Amina", "Luca",
            "Khadija", "Dmitri", "Priya", "Akira", "Emma",
            "Hassan", "Ines", "Jorge", "Miyuki", "Olivia",
            "Jibran", "Sara", "Ivan", "Mei", "Amara",
            "Santiago", "Aya", "Enzo", "Chloe", "Farah",
            "Hiroshi", "Emily", "Ayesha", "Julien", "Mina",
            "Youssef", "Hana", "Oscar", "Shanaya", "Niko",
            "Layla", "Ravi", "Svetlana", "Kaito", "Camila",
            "Omar", "Alina", "Ren", "Leila", "Fabio"
        ];
    }

    initializeWorkers() {
        this.workers = [];
        this.genWorkerNumber = 0;
        this.genWorkerNumber = Math.floor(Math.random() * 50) + 1;
        console.log(`Generated ${this.genWorkerNumber} workers`);

        for (let i = 0; i < this.genWorkerNumber; i++) {
            let inNames = Math.floor(Math.random() * this.names.length);
            if (this.names[inNames]) {
                let employeeInstance = new Employee(this.names[inNames], rndWorkAssign[Math.floor(Math.random() * 2)]);
                this.names[inNames] = undefined;
                this.workers[i] = employeeInstance;
            }
            else { i--; continue; }
        }

    }

    runPerDayDetails() {
        this.perDayDetails = [];
        for (let i = 0; i < this.workers.length; i++) {
            let stat = Math.floor(Math.random() * 2);
            this.perDayDetails[i] = {
                ...this.workers[i],
                status: rndAttendance[stat],
                wage: stat === 1 ? this.workers[i].work === 'fullTime' ? this.fullDay * this.wph : this.halfDay * this.wph : 0
            }
        }
    }

    runPerMonthDetails() {
        this.forMonth = new Array(30);
        for (let i = 0; i < this.forMonth.length; i++) {
            this.perDayDetails = [];
            this.runPerDayDetails();
            this.forMonth[i] = this.perDayDetails.map(emp => ({ ...emp }));
        }
        for (let emp = 0; emp < this.forMonth[0].length; emp++) {
            let wageCount = 0;
            let workingDays = 0;
            for (let day = 0; day < this.forMonth.length; day++) {
                if (wageCount >= 2000 || workingDays >= 20) break;
                if (this.forMonth[day][emp].status === 'present') {
                    wageCount += this.forMonth[day][emp].wage;
                    workingDays++;
                }
            }
            this.PerMonthDetails[emp] = {
                ...this.workers[emp],
                wageCount: wageCount,
                workingDays: workingDays
            }
            this.wageBuilder += wageCount;
        }
    }

    displayForDay() {
        console.log(`
+--------------+---------------+--------------+--------+
|     name     |     work      |  attendance  |  wage  |
+--------------+---------------+--------------+--------+`);

        for (let emp of this.perDayDetails) {
            console.log(`| ${emp.name.padEnd(12, ' ')} | ${emp.work.padEnd(13, ' ')} | ${emp.status.padEnd(12, ' ')} | ${String(emp.wage).padEnd(6, ' ')} |`);
        }
        console.log("+--------------+---------------+--------------+--------+");
    }

    displayForMonth() {
        console.log(`
+--------------+---------------+--------------+--------+
|     name     |     work      | working days |  wage  |
+--------------+---------------+--------------+--------+`);
    
        for (let i = 0; i < this.PerMonthDetails.length; i++) {
            let emp = this.PerMonthDetails[i];  
            console.log(`| ${emp.name.padEnd(12, ' ')} | ${emp.work.padEnd(13, ' ')} | ${String(emp.workingDays).padEnd(12, ' ')} | ${String(emp.wageCount).padEnd(6, ' ')} |`);
        }
    
        console.log("+--------------+---------------+--------------+--------+");
    }
}
    
//interface
class EmpWageBuilderInterface{
    addCompany(comp){
        throw "addCompany() method must be implemented";
    }
    display(){
        throw "display() method must be implemented";
    }

}
//data structure
class ArrayList{
    constructor(){
        this.WageBuilder = [];
    }
    toString(){
        return this.WageBuilder;
    }
    push(ele){
        this.WageBuilder.push(ele);
    }
}
//implementation class
class EmpWageBuilder extends EmpWageBuilderInterface {
    constructor() {
        super();
        this.WageBuilder = new ArrayList();
    }
    addCompany(comp){
        this.WageBuilder.push(comp);
    }
    display(){
        for(let i of this.WageBuilder.toString()){
            console.log(`${i.name} ${i.wph} ${i.wageBuilder}`);
        }
    }
}

let comp1 = new Company('apple', 22, 6, 4);
comp1.initializeWorkers();
comp1.runPerMonthDetails();
comp1.displayForMonth();
// let comp2 = new Company('nvidia', 30, 8, 6);
// comp2.initializeWorkers();
// comp2.runPerMonthDetails();
// let EWB = new EmpWageBuilder();
// EWB.addCompany(comp1);
// EWB.addCompany(comp2);
// EWB.display();