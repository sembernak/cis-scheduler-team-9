import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
//import { Quiz } from "../interfaces/quiz";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { Plan } from "../interfaces/plan";

//chnaging credits does not fully work yet

export function SemestorEditor({
    changeEditing,
    semester,
    editSemester,
    plan
}: {
    changeEditing: () => void;
    semester: Semester;
    editSemester: (id: number, semester: Semester) => void;
    plan: Plan;
}): JSX.Element {
    const [id, setId] = useState<number>(semester.id);
    const [season, setSeason] = useState<string>(semester.season);
    const [year, setYear] = useState<number>(semester.year);
    //const [totalCredits, setTotalCredits] = useState<number>(0);
    const [courses /*, setCourses*/] = useState<Course[]>(semester.courses);

    //function changeEditing() {
    //    setEditing(!editing);
    //}
    function cancel() {
        changeEditing();
    }
    function save() {
        //new empty semester updated when user saves
        editSemester(semester.id, {
            ...semester,
            season: season,
            year: year,
            courses: courses,
            id: id,
            planId: plan.id
        });
        //plan passed into function is updated with new semester created by user
        /*editPlan(plan.id, {
            ...plan,
            semesters: [...plan.semesters, semester]
        });*/
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
