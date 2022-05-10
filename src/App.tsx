import React, { useState } from "react";
import unpackJson from "./helper_functions/unpackJSON";
import catalog from "./catalog.json";
import "./App.css";
import { Course } from "./interfaces/course";
import { PlanViewer } from "./components/planViewer";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";
import { CoursePool } from "./components/coursePool";
import { Button /*, Container*/ } from "react-bootstrap";
import { Requirements } from "./components/requirements";
import { Requirement } from "./interfaces/requirement";
import { WelcomeMessage } from "./components/welcomeMessage";
//import userEvent from "@testing-library/user-event";
//import { textSpanContainsPosition } from "typescript";

const COURSELIST = [
    //Complete list of every course in order of department (see catalog.json)
    {
        code: "test",
        title: "test",
        prereq: ["test"],
        description:
            "I couldn't figure out another way to type this variable properly",
        credits: "1",
        semesterId: "",
        requirements: [""]
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
    totalCredits: "15",
    courses: [course1, course2, course3],
    id: "Spring2020Plan 1",
    planId: "Plan 1"
};

const exampleSem3 = {
    season: "Winter",
    year: 2019,
    totalCredits: "6",
    courses: [course4],
    id: "Winter2019Plan 1",
    planId: "Plan 1"
};

const exampleSem4 = {
    season: "Winter",
    year: 2019,
    totalCredits: "6",
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
//save data information
const PLANS = [examplePlan1, examplePlan2];
let loadedData = PLANS; //initial save data = initial plan
const saveDataKey = "MyPageData";
const previousData = localStorage.getItem(saveDataKey);
// If the data doesn't exist, `getItem` returns null
if (previousData !== null) {
    loadedData = JSON.parse(previousData);
}

function App(): JSX.Element {
    const [plans, setPlans] = useState<Plan[]>(loadedData);
    const [selection, select] = useState<string>(PLANS[0].title);
    const [requires, setRequires] = useState<Requirement[]>([]);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true); //Welcome message visible?

    const handleWelcomeMessage = () => setShowWelcomeMessage(false);

    function compareSeason(a: string, b: string): number {
        const numerify = ["Winter", "Spring", "Summer", "Fall"];
        return (
            numerify.findIndex((item: string): boolean => item === a) -
            numerify.findIndex((item: string): boolean => item === b)
        );
    }
    function sortSemesters(start: Semester[]): Semester[] {
        const toSort = [...start];
        toSort.sort((a: Semester, b: Semester): number =>
            a.year === b.year
                ? compareSeason(a.season, b.season)
                : a.year - b.year
        );
        return toSort;
    }

    function saveData() {
        localStorage.setItem(saveDataKey, JSON.stringify(plans));
    }
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
                    semesters: sortSemesters(
                        newplan.semesters.filter(
                            (semester1: Semester): boolean =>
                                semester1.id !== id
                        )
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
            plans.map(
                (plan: Plan): Plan =>
                    plan.id === id
                        ? {
                              ...newPlan,
                              semesters: sortSemesters(newPlan.semesters)
                          }
                        : plan
            )
        );
        select(newPlan.title);
    }

    function editSemester(id: string, newSemester: Semester) {
        setPlans(
            plans.map(
                (newPlan: Plan): Plan => ({
                    ...newPlan,
                    semesters: sortSemesters(
                        newPlan.semesters.map(
                            (semester: Semester): Semester =>
                                semester.id === id ? newSemester : semester
                        )
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
            editCourse(
                code,
                { ...defaultCourse[0], semesterId: semesterId },
                semesterId
            );
        }
    }

    function addCourse(
        code: string,
        newCourse: Course,
        semesterId: string,
        oldSemesterId: string
    ) {
        if (!contains(code, semesterId)) {
            const currentPlans = [...plans];
            const withoutCourse = currentPlans.map(
                (newplan: Plan): Plan => ({
                    ...newplan,
                    semesters: newplan.semesters.map(
                        (semester1: Semester): Semester => ({
                            ...semester1,
                            courses: semester1.courses.filter(
                                (course1: Course): boolean =>
                                    course1.code !== code ||
                                    course1.semesterId !== oldSemesterId
                            )
                        })
                    )
                })
            );
            setPlans(
                withoutCourse.map(
                    (newPlan: Plan): Plan => ({
                        ...newPlan,
                        semesters: newPlan.semesters.map(
                            (semester1: Semester): Semester =>
                                semester1.id === semesterId
                                    ? {
                                          ...semester1,
                                          courses: [
                                              ...semester1.courses,
                                              newCourse
                                          ]
                                      }
                                    : { ...semester1 }
                        )
                    })
                )
            );
        }
    }

    function contains(code: string, semesterID: string) {
        //helper for addCourse()
        const currentPlan = plans.find((plan: Plan) =>
            plan.semesters.some(
                (semester: Semester): boolean => semester.id === semesterID
            )
        );
        if (currentPlan) {
            const searchSem = currentPlan.semesters.find(
                (semester: Semester) => semester.id === semesterID
            );
            if (searchSem) {
                const arr = searchSem.courses.filter(
                    (course: Course) => course.code === code
                );
                if (arr.length > 0) {
                    //the course is not already in the semester
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    }

    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 Schedule Planner{" "}
                <p className="names">
                    created by Allie Platchek, Sam Bernal, and Anissa Spano
                </p>
                <WelcomeMessage
                    show={showWelcomeMessage}
                    handleClose={handleWelcomeMessage}
                ></WelcomeMessage>
            </header>
            <div className="schedule">
                <br></br>
                <div>
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
                        addCourse={addCourse}
                    ></PlanViewer>
                </div>
            </div>
            <CoursePool addCourse={addCourse}></CoursePool>
            <Button onClick={makeCSV}>Download Plan</Button>
            <Button onClick={saveData}>Save Data</Button>
            <Requirements
                plan={
                    plans.find(
                        (plan: Plan): boolean => plan.title === selection
                    ) as Plan
                }
                requires={requires}
                setRequires={setRequires}
            ></Requirements>
        </div>
    );
}

export default App;
