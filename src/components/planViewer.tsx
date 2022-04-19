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
    deleteSemester,
    deletePlan,
    deleteCourse,
    editCourse,
    editPlan,
    editSemester,
    addPlan,
    deleteAllCourses
}: {
    planList: Plan[];
    deleteSemester: (id: string) => void;
    deletePlan: (id: number) => void;
    deleteCourse: (code: string, semesterId: string) => void;
    editCourse: (code: string, newCourse: Course, semesterId: string) => void;
    editPlan: (id: number, newPlan: Plan) => void;
    editSemester: (id: string, newSemester: Semester) => void;
    addPlan: (newPlan: Plan) => void;
    deleteAllCourses: (semesterId: string) => void;
}): JSX.Element {
    const [selection, Select] = useState<string>(planList[0].title);
    const [planInsert, setInsert] = useState<boolean>(false); //whether or not the adding semester view is visible
    //true means the addition screen is open
    function flipInsert(): void {
        setInsert(!planInsert);
    }
    function updateSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        Select(event.target.value);
    }

    return (
        <div>
            <p>Select a plan from below to get started:</p>
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
            <p>Or create a new plan here:</p>
            <Button
                data-testid={"NewPlan"}
                onClick={flipInsert}
                variant="danger"
                className="me-8"
            >
                New Plan
            </Button>
            {planInsert && (
                <InsertPlan
                    addPlan={addPlan}
                    planList={planList}
                    editPlan={editPlan}
                    flipInsert={flipInsert}
                ></InsertPlan>
            )}
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
                        ></PlanView>
                    </div>
                ))
            )}
        </div>
    );
}
