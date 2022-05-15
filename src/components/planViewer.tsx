/* eslint-disable no-extra-parens */
import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { PlanView } from "../components/planView";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { InsertPlan } from "./insertPlan";

export function PlanViewer({
    planList,
    select,
    selection,
    deleteSemester,
    deletePlan,
    deleteCourse,
    editCourse,
    editPlan,
    editSemester,
    addPlan,
    deleteAllCourses,
    deleteAllSemesters,
    resetCourse,
    addCourse,
    checkPreReq
}: {
    planList: Plan[];
    select: (title: string) => void;
    selection: string;
    deleteSemester: (id: string) => void;
    deletePlan: (id: string) => void;
    deleteCourse: (code: string, semesterId: string) => void;
    editCourse: (code: string, newCourse: Course, semesterId: string) => void;
    editPlan: (id: string, newPlan: Plan) => void;
    editSemester: (id: string, newSemester: Semester) => void;
    addPlan: (newPlan: Plan) => void;
    deleteAllCourses: (semesterId: string) => void;
    deleteAllSemesters: (planid: string) => void;
    resetCourse: (code: string, semesterId: string) => void;
    addCourse: (
        code: string,
        newCourse: Course,
        semesterId: string,
        oldSemesterId: string
    ) => void;
    checkPreReq: (reqList: string[], courseNeed: Course) => boolean;
}): JSX.Element {
    if (planList.length < 1) {
        planList.push({ title: "New Plan", semesters: [], id: "New Plan" });
    }
    const [planInsert, setInsert] = useState<boolean>(false); //whether or not the adding semester view is visible
    //true means the addition screen is open
    function flipInsert(): void {
        setInsert(!planInsert);
    }
    function updateSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        select(event.target.value);
    }
    function makeCSV() {
        const planCSV = planList.find((plan) => plan.title == selection);
        let csvContent = "data:text/csv;charset=utf-8, ";
        csvContent = csvContent + JSON.stringify(planCSV);
        const a = document.createElement("a");
        const encodeUri = encodeURI(csvContent);
        a["download"] = "plans.csv";
        a.href = encodeUri;
        a.click();
        console.log(csvContent);
    }
    return (
        <div>
            <>Select a plan:</>
            <Form.Group controlId="planDrop">
                <Form.Select
                    data-testid={"PlanSelect"}
                    value={selection}
                    onChange={updateSelection}
                >
                    {planList.map((plan: Plan) => (
                        <option key={plan.title} value={plan.title}>
                            {plan.title}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <>Create a new plan: </>
            <Button
                data-testid={"NewPlan"}
                onClick={flipInsert}
                variant="success"
                className="insert-plan"
            >
                New Plan
            </Button>
            <> Download your current plan: </>
            <Button onClick={makeCSV} className="download-plan">
                Download Plan
            </Button>
            {planInsert && (
                <InsertPlan
                    addPlan={addPlan}
                    planList={planList}
                    editPlan={editPlan}
                    flipInsert={flipInsert}
                ></InsertPlan>
            )}
            <br></br>
            <br></br>
            {planList.length < 2 ? (
                <PlanView
                    deleteAllCourses={deleteAllCourses}
                    plan={planList[0]}
                    deleteCourse={deleteCourse}
                    deleteSemester={deleteSemester}
                    deletePlan={deletePlan}
                    editCourse={editCourse}
                    editPlan={editPlan}
                    editSemester={editSemester}
                    deleteAllSemesters={deleteAllSemesters}
                    resetCourse={resetCourse}
                    addCourse={addCourse}
                    checkPreReq={checkPreReq}
                ></PlanView>
            ) : (
                planList.map((plan: Plan) => (
                    <div
                        key={plan.id}
                        hidden={selection !== plan.title}
                        aria-hidden={selection !== plan.title}
                    >
                        <PlanView
                            deleteAllCourses={deleteAllCourses}
                            plan={plan}
                            deleteCourse={deleteCourse}
                            deleteSemester={deleteSemester}
                            deletePlan={deletePlan}
                            editCourse={editCourse}
                            editPlan={editPlan}
                            editSemester={editSemester}
                            deleteAllSemesters={deleteAllSemesters}
                            resetCourse={resetCourse}
                            addCourse={addCourse}
                            checkPreReq={checkPreReq}
                        ></PlanView>
                    </div>
                ))
            )}
        </div>
    );
}
