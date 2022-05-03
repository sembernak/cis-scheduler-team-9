import { useState } from "react";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

export function InsertCourse({
    semester,
    editCourse,
    editSemester,
    flipVisibility
}: {
    semester: Semester;
    editCourse: (code: string, newCourse: Course, semesterId: string) => void;
    editSemester: (id: string, newSemester: Semester) => void;
    flipVisibility: () => void;
}): JSX.Element {
    //new instance of semester created
    const [title, setTitle] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [credits, setCredits] = useState<string>("");
    //const [editing, setEditing] = useState<boolean>(false);
    const semesterId = String(semester.id);

    const newCourse = {
        code: code,
        title: title,
        prereq: [],
        description: description,
        credits: credits,
        semesterId: semesterId
    };

    //function changeEditing() {
    //    setEditing(!editing);
    //}
    function cancel() {
        flipVisibility();
    }
    function save() {
        //new empty course updated when user saves
        editCourse(
            newCourse.code,
            {
                ...newCourse,
                code: code,
                title: title,
                prereq: [],
                description: description,
                credits: credits,
                semesterId: semesterId
            },
            semesterId
        );
        //semester passed into function is updated with new course
        editSemester(semesterId, {
            ...semester,
            courses: [...semester.courses, newCourse]
        });
        flipVisibility();
    }

    return (
        <Container>
            <Row>
                <Col>
                    {/* Code */}
                    <Form.Group controlId="formcourseCode" as={Row}>
                        <Form.Label column sm={2}>
                            Course Code:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={code}
                                onChange={(
                                    event: React.ChangeEvent<HTMLTextAreaElement>
                                ) => setCode(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {/* Title */}
                    <Form.Group controlId="formCourseTitle" as={Row}>
                        <Form.Label column sm={2}>
                            Course Title:
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
                    {/* Description */}
                    <Form.Group controlId="formCourseDescription" as={Row}>
                        <Form.Label column sm={2}>
                            Course Description:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={description}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setDescription(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {/* Credits */}
                    <Form.Group controlId="formCoursecredits" as={Row}>
                        <Form.Label column sm={2}>
                            Credits:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={credits}
                                onChange={(
                                    event: React.ChangeEvent<HTMLTextAreaElement>
                                ) => setCredits(event.target.value)}
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
