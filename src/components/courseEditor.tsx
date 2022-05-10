import React, { useState } from "react";
import {
    Button,
    Container,
    Row,
    Col,
    Form,
    InputGroup,
    FormControl,
    FormLabel
} from "react-bootstrap";
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
    editCourse: (code: string, newCourse: Course, semesterId: string) => void;
    deleteCourse: (code: string, semesterId: string) => void;
}): JSX.Element {
    const [code] = useState<string>(course.code);
    const [title, setTitle] = useState<string>(course.title);
    const [credits, setCredits] = useState<string>(course.credits);
    const [description, setDescription] = useState<string>(course.description);
    const [preReqs, setPreReqs] = useState<string[]>(course.prereq);
    const [newPreReq, setNewPR] = useState<string>("");
    const [requires, setRequires] = useState<string[]>(course.requirements);
    const [newRequire, setNewRequire] = useState<string>("");

    function save() {
        editCourse(
            course.code,
            {
                ...course,
                title: title,
                description: description,
                code: code,
                credits: credits,
                prereq: preReqs,
                requirements: requires
            },
            course.semesterId
        );
        changeEditing();
    }

    function cancel() {
        changeEditing();
    }

    function newPRFunction(event: React.ChangeEvent<HTMLInputElement>) {
        setNewPR(event.target.value);
    }

    function manageNewPR() {
        setPreReqs([...preReqs, newPreReq]);
        setNewPR("");
    }

    /*function manageCurrentPR(
        event: React.ChangeEvent<HTMLInputElement>,
        key: string
    ) {
        setPreReqs(
            preReqs.map((item: string): string =>
                item === key ? event.target.value : item
            )
        );
    }*/

    function newRequireFunction(event: React.ChangeEvent<HTMLInputElement>) {
        setNewRequire(event.target.value);
    }

    function manageNewRequire() {
        setRequires([...requires, newRequire]);
        setNewRequire("");
    }

    /*function manageCurrentPR(
        event: React.ChangeEvent<HTMLInputElement>,
        key: string
    ) {
        setRequires(
            requires.map((item: string): string =>
                item === key ? event.target.value : item
            )
        );
    }*/

    return (
        <Container>
            <br></br>
            <Row>
                <Col>
                    {/* credits */}
                    <Form.Group controlId="formCourseCredits" as={Row}>
                        <Form.Label column sm={3}>
                            Credits:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                className="default-form"
                                value={credits}
                                data-testid={"D" + course.code}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setCredits(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {/* Title */}
                    <Form.Group
                        controlId="formCourseTitle"
                        data-testid={"T" + course.code}
                        as={Row}
                    >
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
                    {/*prereqs*/}
                    <br></br>
                    <FormLabel>PreReqs:</FormLabel>
                    {preReqs.map(
                        (prereq: string): JSX.Element => (
                            <InputGroup key={prereq}>
                                <FormControl
                                    readOnly
                                    defaultValue={prereq}
                                    className="default-form"
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
                                    className="default-button"
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
                                                (item: string): boolean =>
                                                    item !== req
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
                            placeholder="New Requirement"
                            value={newRequire}
                            onChange={newRequireFunction}
                            className="default-form"
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
                        className="default-button me-5"
                    >
                        Save
                    </Button>
                    <Button
                        onClick={cancel}
                        variant="warning"
                        className="default-button me-5"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() =>
                            deleteCourse(course.code, course.semesterId)
                        }
                        variant="danger"
                        className="default-button me-8"
                    >
                        Delete
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
