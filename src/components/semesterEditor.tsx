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
    editSemester: (id: string, semester: Semester) => void;
    plan: Plan;
}): JSX.Element {
    const [season, setSeason] = useState<string>(semester.season);
    const [year, setYear] = useState<number>(semester.year);
    //const [totalCredits, setTotalCredits] = useState<number>(0);
    const [courses /*, setCourses*/] = useState<Course[]>(semester.courses);

    function cancel() {
        changeEditing();
    }
    function save() {
        //new empty semester updated when user saves
        semester.id = semester.season + String(semester.year) + semester.planId;
        semester.courses.map(
            (course: Course) => (course.semesterId = semester.id)
        );
        editSemester(semester.id, {
            ...semester,
            season: season,
            year: year,
            courses: courses,
            planId: plan.id
        });
        changeEditing();
    }

    return (
        <Container>
            <Row>
                <Col>
                    {/* Season */}
                    <Form.Group controlId="formSemesterSeason" as={Row}>
                        <Form.Label column sm={2}>
                            Semester Season:
                        </Form.Label>
                        <Col>
                            <Form.Select
                                value={season}
                                onChange={(
                                    event: React.ChangeEvent<HTMLSelectElement>
                                ) => setSeason(event.target.value)}
                            >
                                <option key={"Winter"} value={"Winter"}>
                                    Winter
                                </option>
                                <option key={"Spring"} value={"Spring"}>
                                    Spring
                                </option>
                                <option key={"Summer"} value={"Summer"}>
                                    Summer
                                </option>
                                <option key={"Fall"} value={"Fall"}>
                                    Fall
                                </option>
                            </Form.Select>
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
