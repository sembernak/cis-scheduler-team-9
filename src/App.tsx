import React, { useState } from "react";
import unpackJson from "./helper_functions/unpackJSON";
import catalog from "./catalog.json";
import "./App.css";
import { Course } from "./interfaces/course";
import { PlanViewer } from "./components/planViewer";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";
import { CoursePool } from "./components/coursePool";
import { Button /*, Container*/, Col, Form, Row } from "react-bootstrap";
import { Requirements } from "./components/requirements";
import { Requirement } from "./interfaces/requirement";
import { WelcomeMessage } from "./components/welcomeMessage";
import {
    examplePlan1,
    examplePlan2,
    defReq1
} from "./helper_functions/initialData";

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

//save data information
const PLANS = [examplePlan1, examplePlan2];
let loadedData = PLANS; //initial save data = initial plan
let loadedRequire = defReq1;
const saveDataKey = "MyPageData";
const saveRequireKey = "MyRequireData";
const previousData = localStorage.getItem(saveDataKey);
const previousRequire = localStorage.getItem(saveRequireKey);
// If the data doesn't exist, `getItem` returns null
if (previousData !== null) {
    loadedData = JSON.parse(previousData);
}
if (previousRequire !== null) {
    loadedRequire = JSON.parse(previousRequire);
}

function App(): JSX.Element {
    const [plans, setPlans] = useState<Plan[]>(loadedData);
    const [selection, select] = useState<string>(PLANS[0].title);
    const [requires, setRequires] = useState<Requirement[]>(loadedRequire);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true); //Welcome message visible?

    const handleWelcomeMessage = () => setShowWelcomeMessage(false);
    const handleWelcomeButton = () => setShowWelcomeMessage(true);

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
        localStorage.setItem(saveRequireKey, JSON.stringify(requires));
    }

    //Upload CSV file
    const [fileContent, setContent] = useState<string>("No file data uploaded");
    function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
        // Might have removed the file, need to check that the files exist
        if (event.target.files && event.target.files.length) {
            // Get the first filename
            const filename = event.target.files[0];
            // Create a reader
            const reader = new FileReader();
            // Create lambda callback to handle when we read the file
            reader.onload = (loadEvent) => {
                // Target might be null, so provide default error value
                const newContent =
                    loadEvent.target?.result || "Data was not loaded";
                // FileReader provides string or ArrayBuffer, force it to be string
                setContent(newContent as string);
            };
            // Actually read the file
            reader.readAsText(filename);
        }
    }
    function uploadPlan() {
        const fileContentData = JSON.parse(fileContent);
        setPlans([...plans, fileContentData]);
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
    //editPlan() had issues with lint and prettier disagreeing so we had to switch to if statements
    function editPlan(id: string, newPlan: Plan) {
        setPlans(
            plans.map((plan: Plan): Plan => {
                if (plan.id === id) {
                    return {
                        ...newPlan,
                        semesters: sortSemesters(newPlan.semesters)
                    };
                } else {
                    return plan;
                }
            })
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

    //had to use if statements in addCourse() to avoid lint/prettier conflict
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
                            (semester1: Semester): Semester => {
                                if (semester1.id === semesterId) {
                                    return {
                                        ...semester1,
                                        courses: [
                                            ...semester1.courses,
                                            newCourse
                                        ]
                                    };
                                } else {
                                    return { ...semester1 };
                                }
                            }
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

    //Helper function for checking if PreReqs are fulfilled
    function compSemesters(semesterChk2: Semester, course: Course): boolean {
        const currentPlan = plans.find(
            (plan: Plan): boolean => plan.title === selection
        ) as Plan;
        const semesterChk1 = currentPlan.semesters.find(
            (sem: Semester): boolean => contains(course.code, sem.id)
        ) as Semester;
        return semesterChk1.year === semesterChk2.year
            ? 0 < compareSeason(semesterChk1.season, semesterChk2.season)
            : 0 < semesterChk1.year - semesterChk2.year;
    }

    //Check if PreReqs are fulfilled
    function checkPreReq(reqList: string[], courseNeed: Course): boolean {
        const currentPlan = plans.find(
            (plan: Plan): boolean => plan.title === selection
        ) as Plan;
        return reqList.every((req: string): boolean =>
            currentPlan.semesters.some((sem: Semester): boolean =>
                sem.courses.some(
                    (course: Course): boolean =>
                        course.code === req && compSemesters(sem, courseNeed)
                )
            )
        );
    }

    return (
        <div className="App">
            <header className="App-header" id="header">
                UD CISC275 Schedule Planner{" "}
                <p className="names">
                    created by Allie Platchek, Sam Bernal, and Anissa Spano
                </p>
                <WelcomeMessage
                    show={showWelcomeMessage}
                    handleClose={handleWelcomeMessage}
                ></WelcomeMessage>
                <Button className="save-btn" onClick={saveData}>
                    Save Data
                </Button>
                <br></br>
                <Button className="save-btn" onClick={handleWelcomeButton}>
                    {" "}
                    Help{" "}
                </Button>
            </header>
            <div className="schedule">
                <br></br>
                <Row>
                    <Col sm={8}>
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
                            checkPreReq={checkPreReq}
                        ></PlanViewer>
                    </Col>
                    <Col sm={4}>
                        <div
                            className="sticky-top scroll-stick"
                            id="sticky-div"
                            style={{
                                overflowY: "scroll",
                                height: "100vh",
                                msOverflowStyle: "none",
                                scrollbarWidth: "none",
                                paddingTop: "12px",
                                paddingBottom: "12px"
                            }}
                        >
                            <Requirements
                                plan={
                                    plans.find(
                                        (plan: Plan): boolean =>
                                            plan.title === selection
                                    ) as Plan
                                }
                                requires={requires}
                                setRequires={setRequires}
                            ></Requirements>
                            <br></br>
                            <br></br>
                            <CoursePool></CoursePool>
                            <br></br>
                            <br></br>
                            <div
                                style={{
                                    width: "auto",
                                    border: "solid",
                                    borderWidth: "1px",
                                    borderRadius: "8px",
                                    borderColor: "gray",
                                    padding: "5px"
                                }}
                                className="uploadBackground"
                            >
                                Upload an existing plan below
                                <Form.Group controlId="uploadForm">
                                    <Form.Control
                                        type="file"
                                        onChange={uploadFile}
                                    />
                                </Form.Group>
                                <Button
                                    className="uploadPlanBtn"
                                    onClick={uploadPlan}
                                >
                                    Upload
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <br></br>
        </div>
    );
}

export default App;
