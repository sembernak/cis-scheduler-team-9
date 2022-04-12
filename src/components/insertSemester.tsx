import { useState } from "react";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";

export function InsertSemester({
    plan,
    editPlan,
    editSemester
}: {
    plan: Plan;
    editPlan: (id: number, newPlan: Plan) => void;
    editSemester: (id: number, newSemester: Semester) => void;
}): JSX.Element {
    //new instance of semester created
    const newSemester = {
        season: "",
        year: 0,
        totalCredits: 0,
        courses: [],
        id: 1234
    };
    const [id, setId] = useState<number>(newSemester.id);
    const [season, setSeason] = useState<string>(newSemester.season);
    const [year, setYear] = useState<number>(newSemester.year);
    const [totalCredits, setTotalCredits] = useState<number>(
        newSemester.totalCredits
    );
    const [courses, setCourses] = useState<Course[]>(newSemester.courses);
    const [editing, setEditing] = useState<boolean>(false);

    function changeEditing() {
        setEditing(!editing);
    }
    function cancel() {
        changeEditing();
    }
    function save() {
        //new empty semester updated when user saves
        editSemester(newSemester.id, {
            ...newSemester,
            season: season,
            year: year,
            totalCredits: totalCredits,
            courses: courses,
            id: id
        });
        //plan passed into function is updated with new semester created by user
        editPlan(plan.id, {
            ...plan,
            semesters: [...plan.semesters, newSemester]
        });
        changeEditing();
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
                    {/* credits */}
                    <Form.Group controlId="formSemesterCredits" as={Row}>
                        <Form.Label column sm={2}>
                            Semester Credits:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={totalCredits}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setTotalCredits(Number(event.target.value))
                                }
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
