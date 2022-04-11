import React from "react";
import { Semester } from "../interfaces/semester";
import { Button, Stack } from "react-bootstrap";
import { SemesterView } from "./semesterView";
import { Plan } from "../interfaces/plan";

export function PlanView({
    plan,
    deleteSemester,
    deletePlan,
    deleteCourse
}: //deleteSemester,
//viewSemester,
//editCourse,
//deleteCourse,
//viewing,
//setViewing,
//publishCourse
{
    plan: Plan;
    deleteSemester: (id: number) => void;
    deletePlan: (id: number) => void;
    deleteCourse: (code: string) => void;
    //viewSemester: (id: number, newSemester: Semester) => void;
    //editCourse: (id: number, newCourse: Course) => void;
    //deleteCourse: (id: number) => void;
    //viewing: boolean;
    //setViewing: (viewing: boolean) => void;
    //publishCourse: (id: number) => void;
}): JSX.Element {
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
                            //editCourse={editCourse}
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
        </div>
    );
}
