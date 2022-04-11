import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
//import { Quiz } from "../interfaces/quiz";
import { Course } from "../interfaces/course";

//chnaging credits does not fully work yet

export function CourseEditor({
    changeEditing,
    course,
    editCourse,
    deleteCourse
}: {
    changeEditing: () => void;
    course: Course;
    editCourse: (code: string, newCourse: Course) => void;
    deleteCourse: (code: string) => void;
}): JSX.Element {
    const [code, setCode] = useState<string>(course.code);
    const [title, setTitle] = useState<string>(course.title);
    const [credits, setCredits] = useState<number>(course.credits);
    const [description, setDescription] = useState<string>(course.description);

    function save() {
        editCourse(course.code, {
            ...course,
            title: title,
            description: description,
            code: code
        });
        changeEditing();
    }

    function cancel() {
        changeEditing();
    }

    return (
        <Container>
            <Row>
                <Col>
                    {/* Code */}
                    <Form.Group controlId="formCourseCode" as={Row}>
                        <Form.Label column sm={2}>
                            Code:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={code}
                                data-testid={"D" + course.code}
                                onChange={(
                                    event: React.ChangeEvent<HTMLTextAreaElement>
                                ) => setCode(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {/* credits */}
                    <Form.Group controlId="formCourseCredits" as={Row}>
                        <Form.Label column sm={2}>
                            Credits:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={credits}
                                data-testid={"D" + course.code}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setCredits(Number(event.target.value))}
                            />
                        </Col>
                    </Form.Group>
                    {/* Title */}
                    <Form.Group
                        controlId="formCourseTitle"
                        data-testid={"T" + course.code}
                        as={Row}
                    >
                        <Form.Label column sm={2}>
                            Title:
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
                            Description:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                data-testid={"D" + course.code}
                                onChange={(
                                    event: React.ChangeEvent<HTMLTextAreaElement>
                                ) => setDescription(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {/*did NOT add editing for prereqs yet- will more more complex since it will have to be a list*/}
                    <Button onClick={save} variant="success" className="me-4">
                        Save
                    </Button>
                    <Button onClick={cancel} variant="warning" className="me-5">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => deleteCourse(course.code)}
                        variant="danger"
                        className="me-8"
                    >
                        Delete
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
