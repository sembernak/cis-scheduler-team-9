import { useState } from "react";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";

export function InsertPlan({
    editPlan,
    flipInsert,
    addPlan
}: {
    planList: Plan[];
    editPlan: (id: string, newPlan: Plan) => void;
    flipInsert: () => void;
    addPlan: (newPlan: Plan) => void;
}): JSX.Element {
    const [title, setTitle] = useState<string>("");
    const [semesters /*, setSemesters*/] = useState<Semester[]>([]);

    const newPlan = {
        id: "",
        title: title,
        semesters: semesters
    };

    function cancel() {
        flipInsert();
    }
    function save() {
        newPlan.id = newPlan.title;
        editPlan(newPlan.id, {
            ...newPlan,
            title: title
        });
        addPlan(newPlan);
        flipInsert();
    }

    return (
        <Container>
            <Row>
                <Col>
                    {/* Title */}
                    <Form.Group controlId="formPlanTitle" as={Row}>
                        <Form.Label column sm={2}>
                            Plan Title:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={title}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setTitle(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Button onClick={save} variant="success" className="me-4">
                        Save
                    </Button>
                    <Button
                        data-testid={"CancelPlan"}
                        onClick={cancel}
                        variant="warning"
                        className="me-5"
                    >
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
