import { useState } from "react";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";

export function InsertSemester({
    plan,
    editPlan,
    editSemester,
    flipVisibility
}: {
    plan: Plan;
    editPlan: (id: number, newPlan: Plan) => void;
    editSemester: (id: number, newSemester: Semester) => void;
    flipVisibility: () => void;
}): JSX.Element {
    //new instance of semester created
    const [id, setId] = useState<number>(12);
    const [season, setSeason] = useState<string>("Spring");
    const [year, setYear] = useState<number>(2020);
    //const [totalCredits, setTotalCredits] = useState<number>(0);
    const [courses /*, setCourses*/] = useState<Course[]>([]);
    //const [editing, setEditing] = useState<boolean>(false);

    const newSemester = {
        season: season,
        year: year,
        totalCredits: 0,
        courses: courses,
        id: id,
        planId: plan.id
    };

    //function changeEditing() {
    //    setEditing(!editing);
    //}
    function cancel() {
        flipVisibility();
    }
    function save() {
        //new empty semester updated when user saves
        editSemester(newSemester.id, {
            ...newSemester,
            season: season,
            year: year,
            courses: courses,
            id: id
        });
        //plan passed into function is updated with new semester created by user
        editPlan(plan.id, {
            ...plan,
            semesters: [...plan.semesters, newSemester]
        });
        flipVisibility();
    }

    return (
        <Container>
            <Row>
                <Col>
                    {/* Id */}
                    <Form.Group controlId="formSemesterId" as={Row}>
                        <Form.Label column sm={2}>
                            Semester Id:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={id}
                                onChange={(
                                    event: React.ChangeEvent<HTMLTextAreaElement>
                                ) => setId(Number(event.target.value))}
                            />
                        </Col>
                    </Form.Group>
                    {/* Season */}
                    <Form.Group controlId="formSemesterSeason" as={Row}>
                        <Form.Label column sm={2}>
                            Semester Season:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={season}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setSeason(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {/* Year */}
                    <Form.Group controlId="formSemesterYear" as={Row}>
                        <Form.Label column sm={2}>
                            Semester Year:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={year}
                                onChange={(
                                    event: React.ChangeEvent<HTMLTextAreaElement>
                                ) => setYear(Number(event.target.value))}
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
