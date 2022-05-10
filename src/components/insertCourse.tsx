import { useState } from "react";
import React from "react";
import {
    Button,
    Container,
    Row,
    Col,
    Form,
    FormLabel,
    InputGroup,
    FormControl
} from "react-bootstrap";
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
    const [preReqs, setPreReqs] = useState<string[]>([]);
    const [newPreReq, setNewPR] = useState<string>("");
    const [requires, setRequires] = useState<string[]>([]);
    const [newRequire, setNewRequire] = useState<string>("");
    const semesterId = String(semester.id);

    const newCourse = {
        code: code,
        title: title,
        prereq: [""],
        description: description,
        credits: credits,
        semesterId: semesterId,
        requirements: [""]
    };

    function cancel() {
        flipVisibility();
    }
    function save() {
        //new empty course updated when user saves
        editCourse(
            newCourse.code,
            {
                code: code,
                title: title,
                prereq: preReqs,
                description: description,
                credits: credits,
                requirements: requires,
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

    function newPRFunction(event: React.ChangeEvent<HTMLInputElement>) {
        setNewPR(event.target.value);
    }

    function manageNewPR() {
        setPreReqs([...preReqs, newPreReq]);
        setNewPR("");
    }

    function newRequireFunction(event: React.ChangeEvent<HTMLInputElement>) {
        setNewRequire(event.target.value);
    }

    function manageNewRequire() {
        setRequires([...requires, newRequire]);
        setNewRequire("");
    }

    return (
        <Container>
            <br></br>
            {/* Code */}
            <Form.Group controlId="formcourseCode" as={Row}>
                <Form.Label column sm={3}>
                    Code:
                </Form.Label>
                <Col>
                    <Form.Control
                        value={code}
                        className="default-form"
                        onChange={(
                            event: React.ChangeEvent<HTMLTextAreaElement>
                        ) => setCode(event.target.value)}
                    />
                </Col>
            </Form.Group>
            {/* Title */}
            <Form.Group controlId="formCourseTitle" as={Row}>
                <Form.Label column sm={3}>
                    Title:
                </Form.Label>
                <Col>
                    <Form.Control
                        className="default-form"
                        value={title}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setTitle(event.target.value)}
                    />
                </Col>
            </Form.Group>
            {/* Description */}
            <Form.Group controlId="formCourseDescription" as={Row}>
                <Form.Label column sm={3}>
                    Description:
                </Form.Label>
                <Col>
                    <Form.Control
                        className="default-form"
                        value={description}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setDescription(event.target.value)}
                    />
                </Col>
            </Form.Group>
            {/* Credits */}
            <Form.Group controlId="formCoursecredits" as={Row}>
                <Form.Label column sm={3}>
                    Credits:
                </Form.Label>
                <Col>
                    <Form.Control
                        className="default-form"
                        value={credits}
                        onChange={(
                            event: React.ChangeEvent<HTMLTextAreaElement>
                        ) => setCredits(event.target.value)}
                    />
                </Col>
            </Form.Group>
            {/*prereqs*/}
            {preReqs.map(
                (prereq: string): JSX.Element => (
                    <InputGroup key={prereq}>
                        <FormControl
                            className="default-form"
                            readOnly
                            value={prereq}
                            /*onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => manageCurrentPR(event, prereq)}
                                    This works but is annoying to use ^*/
                        />
                        <Button
                            className="default-button"
                            onClick={() =>
                                setPreReqs(
                                    preReqs.filter(
                                        (item: string): boolean =>
                                            item !== prereq
                                    )
                                )
                            }
                        >
                            X
                        </Button>
                    </InputGroup>
                )
            )}
            <InputGroup>
                <FormControl
                    placeholder="New PreReq"
                    value={newPreReq}
                    onChange={newPRFunction}
                    className="default-form"
                />
                <Button
                    variant="outline-secondary"
                    onClick={manageNewPR}
                    className="default-button"
                >
                    Add PreReq
                </Button>
            </InputGroup>
            {/*requirements*/}
            <br></br>
            <FormLabel>Degree Requirements:</FormLabel>
            {requires.map(
                (req: string): JSX.Element => (
                    <InputGroup key={req}>
                        <FormControl
                            className="default-form"
                            readOnly
                            value={req}
                            /*onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => manageCurrentPR(event, prereq)}
                                    This works but is annoying to use ^*/
                        />
                        <Button
                            className="default-button"
                            onClick={() =>
                                setRequires(
                                    requires.filter(
                                        (item: string): boolean => item !== req
                                    )
                                )
                            }
                        >
                            X
                        </Button>
                    </InputGroup>
                )
            )}
            <InputGroup>
                <FormControl
                    className="default-form"
                    placeholder="New Requirement"
                    value={newRequire}
                    onChange={newRequireFunction}
                />
                <Button
                    variant="outline-secondary"
                    onClick={manageNewRequire}
                    className="default-button"
                >
                    Add Requirement
                </Button>
            </InputGroup>
            <Button
                onClick={save}
                variant="success"
                className="me-4 default-button"
            >
                Save
            </Button>
            <Button
                onClick={cancel}
                variant="warning"
                className="me-5 default-button"
            >
                Cancel
            </Button>
        </Container>
    );
}
