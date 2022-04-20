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

const COURSELIST = [
    //Complete list of every course in order of department (see catalog.json)
    {
        code: "test",
        title: "test",
        prereq: ["test"],
        description:
            "I couldn't figure out another way to type this variable properly",
        credits: "1"
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
    semesterId: "exampleSem2"
};

const course2 = {
    ...COURSELIST[34],
    semesterId: "exampleSem2"
};

const course3 = {
    ...COURSELIST[12],
    semesterId: "exampleSem2"
};

const exampleSem2 = {
    season: "Spring",
    year: 2020,
    totalCredits: 15,
    courses: [course1, course2, course3],
    id: "2",
    planId: "1"
};

const course4 = {
    ...COURSELIST[1],
    semesterId: "exampleSem3"
};

const exampleSem3 = {
    season: "Winter",
    year: 2019,
    totalCredits: 6,
    courses: [course4],
    id: "3",
    planId: "1"
};

const exampleSem4 = {
    season: "Winter",
    year: 2019,
    totalCredits: 6,
    courses: [course4],
    id: "4",
    planId: "2"
};

const examplePlan1 = {
    title: "Plan 1",
    semesters: [exampleSem2, exampleSem3],
    id: "1"
};

const examplePlan2 = {
    title: "Plan 2",
    semesters: [exampleSem4],
    id: "2"
};

const PLANS = [examplePlan1, examplePlan2];

function App(): JSX.Element {
    const [plans, setPlans] = useState<Plan[]>(PLANS);

    function deletePlan(id: string) {
        setPlans(plans.filter((plan: Plan): boolean => plan.id !== id));
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
                        planList={plans}
                        deleteSemester={deleteSemester}
                        deleteAllSemesters={deleteAllSemesters}
                        deletePlan={deletePlan}
                        deleteCourse={deleteCourse}
                        editCourse={editCourse}
                        editPlan={editPlan}
                        editSemester={editSemester}
                        addPlan={addPlan}
                    ></PlanViewer>
                </p>
            </div>
            <CoursePool></CoursePool>
        </div>
    );
}

export default App;
