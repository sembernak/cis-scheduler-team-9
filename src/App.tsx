import React from "react";
import { Button } from "react-bootstrap";
import unpackJson from "./helper_functions/unpackJSON";
import catalog from "./catalog.json";
import "./App.css";
import { Course } from "./interfaces/course";
import { CourseViewer } from "./components/courseViewer";

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
    const exampleSem1 = [
        //for testing
        COURSELIST[1],
        COURSELIST[300],
        COURSELIST[20],
        COURSELIST[808],
        COURSELIST[1227]
    ];

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
                {/*feel free to delete this:*/}
                <CourseViewer
                    changeView={() => console.log("hi")}
                    course={exampleSem1[0]}
                ></CourseViewer>
            </div>
            <div className="control"></div>
        </div>
    );
}

export default App;
