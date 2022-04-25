import React, { useState } from "react";
import unpackJson from "./helper_functions/unpackJSON";
import catalog from "./catalog.json";
import "./App.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Course } from "./interfaces/course";
import { PlanViewer } from "./components/planViewer";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";
import { CoursePool } from "./components/coursePool";
import { Button } from "react-bootstrap";
import userEvent from "@testing-library/user-event";

const COURSELIST = [
    //Complete list of every course in order of department (see catalog.json)
    {
        code: "test",
        title: "test",
        prereq: ["test"],
        description:
            "I couldn't figure out another way to type this variable properly",
        credits: "1",
        semesterId: ""
    }
];
COURSELIST.pop();

let i: keyof typeof catalog;
for (i in catalog) {
    for (const j in catalog[i]) {
        COURSELIST.push(unpackJson(i, j));
    }
}
const course1 = {
    ...COURSELIST[1],
    semesterId: "Spring2020Plan 1"
};

const course2 = {
    ...COURSELIST[34],
    semesterId: "Spring2020Plan 1"
};

const course3 = {
    ...COURSELIST[12],
    semesterId: "Spring2020Plan 1"
};

const course4 = {
    ...COURSELIST[1],
    semesterId: "Winter2019Plan 1"
};

const course5 = {
    ...COURSELIST[433],
    semesterId: "Winter2019Plan 2"
};

const exampleSem2 = {
    season: "Spring",
    year: 2020,
    totalCredits: 15,
    courses: [course1, course2, course3],
    id: "Spring2020Plan 1",
    planId: "Plan 1"
};

const exampleSem3 = {
    season: "Winter",
    year: 2019,
    totalCredits: 6,
    courses: [course4],
    id: "Winter2019Plan 1",
    planId: "Plan 1"
};

const exampleSem4 = {
    season: "Winter",
    year: 2019,
    totalCredits: 6,
    courses: [course5],
    id: "Winter2019Plan 2",
    planId: "Plan 2"
};

const examplePlan1 = {
    title: "Plan 1",
    semesters: [exampleSem2, exampleSem3],
    id: "Plan 1"
};

const examplePlan2 = {
    title: "Plan 2",
    semesters: [exampleSem4],
    id: "Plan 2"
};

const PLANS = [examplePlan1, examplePlan2];

function App(): JSX.Element {
    const [plans, setPlans] = useState<Plan[]>(PLANS);
    const [selection, select] = useState<string>(PLANS[0].title);

    function makeCSV() {
        let csvContent = "data:text/csv;charset=utf-8, ";
        csvContent =
            csvContent +
            plans
                .map(
                    (plan: Plan): string =>
                        plan.title +
                        ",\n" +
                        plan.semesters
                            .map(
                                (semester: Semester): string =>
                                    semester.season +
                                    ", " +
                                    semester.year +
                                    ",\n" +
                                    semester.courses
                                        .map(
                                            (course: Course): string =>
                                                course.code +
                                                ", " +
                                                course.title +
                                                ", " +
                                                course.credits +
                                                ", " +
                                                course.description +
                                                ", " +
                                                course.prereq
                                        )
                                        .join(",\n")
                            )
                            .join(",\n")
                )
                .join(",\n");
        const a = document.createElement("a");
        const encodeUri = encodeURI(csvContent);
        a["download"] = "plans.csv";
        a.href = encodeUri;
        a.click();
        console.log(csvContent);
    }

    function deletePlan(id: string) {
        setPlans(plans.filter((plan: Plan): boolean => plan.id !== id));
        select(PLANS[0].title);
    }

    function deleteSemester(id: string) {
        setPlans(
            plans.map(
                (newplan: Plan): Plan => ({
                    ...newplan,
                    semesters: newplan.semesters.filter(
                        (semester1: Semester): boolean => semester1.id !== id
                    )
                })
            )
        );
    }
    function deleteAllSemesters(planid: string) {
        setPlans(
            plans.map(
                (newplan: Plan): Plan => ({
                    ...newplan,
                    semesters: newplan.semesters.filter(
                        (semester1: Semester): boolean =>
                            semester1.planId !== planid
                    )
                })
            )
        );
    }

    function deleteCourse(code: string, semesterId: string) {
        setPlans(
            plans.map(
                (newplan: Plan): Plan => ({
                    ...newplan,
                    semesters: newplan.semesters.map(
                        (semester1: Semester): Semester => ({
                            ...semester1,
                            courses: semester1.courses.filter(
                                (course1: Course): boolean =>
                                    course1.code !== code ||
                                    course1.semesterId !== semesterId
                            )
                        })
                    )
                })
            )
        );
    }
    function deleteAllCourses(semesterId: string) {
        setPlans(
            plans.map(
                (newplan: Plan): Plan => ({
                    ...newplan,
                    semesters: newplan.semesters.map(
                        (semester1: Semester): Semester => ({
                            ...semester1,
                            courses: semester1.courses.filter(
                                (course1: Course): boolean =>
                                    course1.semesterId !== semesterId
                            )
                        })
                    )
                })
            )
        );
    }

    function editCourse(code: string, newCourse: Course, semesterId: string) {
        setPlans(
            plans.map(
                (newPlan: Plan): Plan => ({
                    ...newPlan,
                    semesters: newPlan.semesters.map(
                        (semester1: Semester): Semester => ({
                            ...semester1,
                            courses: semester1.courses.map(
                                (course1: Course): Course =>
                                    course1.code === code &&
                                    course1.semesterId === semesterId
                                        ? newCourse
                                        : course1
                            )
                        })
                    )
                })
            )
        );
    }

    function editPlan(id: string, newPlan: Plan) {
        setPlans(
            plans.map((plan: Plan): Plan => (plan.id === id ? newPlan : plan))
        );
        select(newPlan.title);
    }

    function editSemester(id: string, newSemester: Semester) {
        setPlans(
            plans.map(
                (newPlan: Plan): Plan => ({
                    ...newPlan,
                    semesters: newPlan.semesters.map(
                        (semester: Semester): Semester =>
                            semester.id === id ? newSemester : semester
                    )
                })
            )
        );
    }
    function addPlan(newPlan: Plan) {
        plans.push(newPlan);
        setPlans(plans);
    }

    function resetCourse(code: string, semesterId: string) {
        const defaultCourse = COURSELIST.filter(
            (course: Course) => course.code === code
        );
        if (defaultCourse.length > 0) {
            editCourse(code, defaultCourse[0], semesterId);
        }
    }

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
                    <PlanViewer
                        deleteAllCourses={deleteAllCourses}
                        select={select}
                        selection={selection}
                        planList={plans}
                        deleteSemester={deleteSemester}
                        deleteAllSemesters={deleteAllSemesters}
                        deletePlan={deletePlan}
                        deleteCourse={deleteCourse}
                        editCourse={editCourse}
                        editPlan={editPlan}
                        editSemester={editSemester}
                        addPlan={addPlan}
                        resetCourse={resetCourse}
                    ></PlanViewer>
                </p>
            </div>
            <CoursePool></CoursePool>
            <Button onClick={makeCSV}>Download CSV</Button>
        </div>
    );
}

export default App;
