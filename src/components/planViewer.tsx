import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { PlanView } from "../components/planView";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function PlanViewer({
    planList,
    deleteSemester,
    deletePlan,
    deleteCourse,
    editCourse,
    editPlan,
    editSemester
}: {
    planList: Plan[];
    deleteSemester: (id: number) => void;
    deletePlan: (id: number) => void;
    deleteCourse: (code: string, semesterId: string) => void;
    editCourse: (code: string, newCourse: Course, semesterId: string) => void;
    editPlan: (id: number, newPlan: Plan) => void;
    editSemester: (id: number, newSemester: Semester) => void;
}): JSX.Element {
    /*const workingList = [...planList, STARTERPLAN];
    if (planList.length > 0) {
        workingList.pop();
    }*/

    const [selection, Select] = useState<Plan>(planList[0]);

    function changeSelection(event: ChangeEvent) {
        Select(
            planList.find(
                (item: Plan): boolean => item.title === event.target.value
            ) as Plan
        );
    }

    /*
    function updateSelection(event: React.ChangeEvent<HTMLSelectElement>){
        Select(event.target.value);
    }
*/
    return (
        <div>
            <p>Select a plan from below to get started:</p>
            <Form.Group controlId="planDrop">
                <Form.Select value={selection.title} onChange={changeSelection}>
                    {planList.map((plan: Plan) => (
                        <option key={plan.title} value={plan.title}>
                            {plan.title}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            {/*planList.filter((plan: Plan): boolean => plan.id !== selection.id)*/}
            {planList.map((plan: Plan) => (
                <div key={plan.id}>
                    <PlanView
                        plan={plan}
                        deleteCourse={deleteCourse}
                        deleteSemester={deleteSemester}
                        deletePlan={deletePlan}
                        editCourse={editCourse}
                        editPlan={editPlan}
                        editSemester={editSemester}
                    ></PlanView>
                </div>
            ))}
        </div>
    );
}
