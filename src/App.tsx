import React from "react";
import unpackJson from "./helper_functions/unpackJSON";
import catalog from "./catalog.json";
import "./App.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Course } from "./interfaces/course";
import { PlanView } from "./components/planView";

const COURSELIST = [
    //Complete list of every course in order of department (see catalog.json)
    {
        code: "test",
        title: "test",
        prereq: ["test"],
        description:
            "I couldn't figure out another way to type this variable properly",
        credits: 1
    }
];
COURSELIST.pop();

let i: keyof typeof catalog;
for (i in catalog) {
    for (const j in catalog[i]) {
        COURSELIST.push(unpackJson(i, j));
    }
}

function App(): JSX.Element {
    //const [semesters, setSemesters] = useState<Semester[]>(SEMESTERS);

    const exampleSem2 = {
        season: "Spring",
        year: 2020,
        totalCredits: 15,
        courses: [COURSELIST[1], COURSELIST[34], COURSELIST[12]],
        id: 1
    };

    const exampleSem3 = {
        season: "Winter",
        year: 2019,
        totalCredits: 6,
        courses: [COURSELIST[8], COURSELIST[444]],
        id: 1
    };

    const examplePlan1 = {
        title: "Plan 1",
        semesters: [exampleSem2, exampleSem3]
    };

    /*function deleteSemester(id: number) {
        setSemesters(quizzes.filter((quiz: Quiz): boolean => quiz.id !== id));
    }*/
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript - Allie Platchek, Sam
                Bernal, and Anissa Spano
            </header>
            <p>
                Welcome to Team 9 schedule builder! This application has all the
                tools you need to create the perfect college course schedule. To
                get started, ----
            </p>
            <div className="schedule">
                <br></br>
                <p>
                    <PlanView plan={examplePlan1}></PlanView>
                </p>
            </div>
            <div className="control"></div>
        </div>
    );
}

export default App;
