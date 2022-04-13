import React, { useState } from "react";
import { Semester } from "../interfaces/semester";
import { Button, Stack } from "react-bootstrap";
import { SemesterView } from "./semesterView";
import { Plan } from "../interfaces/plan";
import { Course } from "../interfaces/course";
import { InsertSemester } from "./insertSemester";

export function PlanView({
    plan,
    deleteSemester,
    deletePlan,
    deleteCourse,
    editCourse,
    editPlan,
    editSemester
}: {
    plan: Plan;
    deleteSemester: (id: number) => void;
    deletePlan: (id: number) => void;
    deleteCourse: (code: string, semesterId: string) => void;
    editCourse: (code: string, newCourse: Course, semesterId: string) => void;
    editPlan: (id: number, newPlan: Plan) => void;
    editSemester: (id: number, newSemester: Semester) => void;
}): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false); //whether or not the adding semester view is visible
    //true means the addition screen is open
    function flipVisibility(): void {
        setVisible(!visible);
    }

    return (
        <div>
            <h3>{plan.title}</h3>
            <Stack gap={3}>
                {plan.semesters.map((Semester: Semester) => (
                    <div key={Semester.id} className="bg-light border m-2 p-2">
                        <SemesterView
                            semester={Semester}
                            deleteSemester={deleteSemester}
                            deleteCourse={deleteCourse}
                            //viewSemester={viewSemester}
                            editCourse={editCourse}
                            editSemester={editSemester}
                            //viewing={viewing}
                            //setViewing={setViewing}
                        ></SemesterView>
                    </div>
                ))}
            </Stack>
            <Button
                onClick={() => deletePlan(plan.id)}
                variant="danger"
                className="me-8"
            >
                Delete Plan
            </Button>
            <Button onClick={flipVisibility} variant="danger" className="me-8">
                Insert Semester
            </Button>
            {visible && (
                <InsertSemester
                    plan={plan}
                    editPlan={editPlan}
                    editSemester={editSemester}
                ></InsertSemester>
            )}
        </div>
    );
}
