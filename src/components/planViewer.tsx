import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { PlanView } from "../components/planView";
type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

const STARTERPLAN = {
    title: "New Plan",
    semesters: [],
    id: 0
};

export function PlanViewer({
    planList,
    deleteSemester,
    deletePlan,
    deleteCourse
}: {
    planList: Plan[];
    deleteSemester: (id: number) => void;
    deletePlan: (id: number) => void;
    deleteCourse: (code: string) => void;
}): JSX.Element {
    const [selection, Select] = useState<Plan>(STARTERPLAN);

    const workingList = [STARTERPLAN, ...planList];

    function changeSelection(event: ChangeEvent) {
        Select(
            workingList.find(
                (item: Plan): boolean => item.title === event.target.value
            ) as Plan
        );
    }

    return (
        <div>
            <p>Select a plan from below to get started:</p>
            <Form.Group controlId="planDrop">
                <Form.Select value={selection.title} onChange={changeSelection}>
                    {workingList.map((plan: Plan) => (
                        <option key={plan.title} value={plan.title}>
                            {plan.title}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <PlanView
                plan={selection}
                deleteCourse={deleteCourse}
                deleteSemester={deleteSemester}
                deletePlan={deletePlan}
            ></PlanView>
        </div>
    );
}
