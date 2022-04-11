import React from "react";
import { Semester } from "../interfaces/semester";
import { Stack } from "react-bootstrap";
import { SemesterView } from "./semesterView";
import { Plan } from "../interfaces/plan";

export function PlanView({
    plan
}: //deleteSemester,
//viewSemester,
//editCourse,
//deleteCourse,
//viewing,
//setViewing,
//publishCourse
{
    plan: Plan;
    //deleteSemester: (id: number) => void;
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
                            //deleteSemester={deleteSemester}
                            //viewSemester={viewSemester}
                            //editCourse={editCourse}
                            //viewing={viewing}
                            //setViewing={setViewing}
                        ></SemesterView>
                    </div>
                ))}
            </Stack>
        </div>
    );
}
