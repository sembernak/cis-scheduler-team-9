import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
//import { Quiz } from "../interfaces/quiz";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { Plan } from "../interfaces/plan";

//chnaging credits does not fully work yet

export function PlanEditor({
    changeEditing,
    editPlan,
    plan
}: {
    changeEditing: () => void;
    editPlan: (id: string, plan: Plan) => void;
    plan: Plan;
}): JSX.Element {
    const [title, setTitle] = useState<string>(plan.title);

    function cancel() {
        changeEditing();
    }

    function save() {
        //new empty semester updated when user saves
        plan.id = plan.title;
        plan.semesters.map((semester: Semester) => (semester.planId = plan.id));
        plan.semesters.map((semester: Semester) =>
            semester.courses.map(
                (course: Course) => (course.semesterId = semester.id)
            )
        );
        editPlan(plan.id, {
            ...plan,
            title: title,
            id: plan.id
        });
        changeEditing();
    }

    return (
        <Container>
            <Row>
                <Col>
                    {/* Title*/}
                    <Form.Group controlId="formSemesterYear" as={Row}>
                        <Form.Label column sm={2}>
                            Plan Title:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={title}
                                onChange={(
                                    event: React.ChangeEvent<HTMLTextAreaElement>
                                ) => setTitle(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Button onClick={save} variant="success" className="me-4">
                        Save
                    </Button>
                    <Button onClick={cancel} variant="warning" className="me-5">
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
