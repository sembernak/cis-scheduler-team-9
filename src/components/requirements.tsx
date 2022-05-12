import React, { useState } from "react";
import {
    Button,
    Container,
    Col,
    Row,
    InputGroup,
    FormControl
} from "react-bootstrap";
import { Requirement } from "../interfaces/requirement";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";

export function Requirements({
    plan,
    requires,
    setRequires
}: {
    plan: Plan;
    requires: Requirement[];
    setRequires: (requires: Requirement[]) => void;
}): JSX.Element {
    const [newRequire, setNewRequire] = useState<string>("");
    const [credits, setCredits] = useState<number>(0);

    function newRequireFunction(event: React.ChangeEvent<HTMLInputElement>) {
        setNewRequire(event.target.value);
    }

    function manageNewRequire() {
        setRequires([...requires, { name: newRequire, credits: credits }]);
        setNewRequire("");
    }

    function checkFulfilled(req: string, needCred: number) {
        const compCred = plan.semesters.reduce(
            (total: number, semester: Semester) =>
                total +
                semester.courses.reduce(
                    (subTotal: number, course: Course) =>
                        course.requirements.includes(req)
                            ? subTotal + parseInt(course.credits.trim()[0])
                            : subTotal,
                    0
                ),
            0
        );
        return compCred >= needCred;
    }
    return (
        <div
            style={{
                overflowY: "scroll",
                height: "60vh",
                width: "auto",
                border: "solid",
                borderWidth: "1px",
                borderRadius: "8px",
                borderColor: "gray",
                padding: "5px"
            }}
            className="background1"
        >
            <h2>Degree Requirements:</h2>
            <div>
                Add a requirement for your degree here. If a course fufills that
                requirement, edit the course and add that requirement. The
                requirment, once met for the appropriate amount of credits, will
                be marked as complete.
            </div>
            {requires.map(
                (req: Requirement): JSX.Element => (
                    <Container key={req.name}>
                        <Row>
                            <Col md={8}>
                                <FormControl
                                    readOnly
                                    value={req.name}
                                    /*onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => manageCurrentPR(event, prereq)}
                                    This works but is annoying to use ^*/
                                />
                            </Col>
                            <Col md={1}>
                                <Button
                                    onClick={() =>
                                        setRequires(
                                            requires.filter(
                                                (item: Requirement): boolean =>
                                                    item.name !== req.name
                                            )
                                        )
                                    }
                                >
                                    X
                                </Button>
                            </Col>
                            <Col md={2}>
                                <p>Required Credits: {req.credits}</p>
                                <p>
                                    Met?{" "}
                                    {checkFulfilled(req.name, req.credits)
                                        ? "✅"
                                        : "❌"}
                                </p>
                                <br></br>
                            </Col>
                        </Row>
                    </Container>
                )
            )}
            <InputGroup as={Container}>
                <Row>
                    <Col md={6}>
                        <FormControl
                            placeholder="New Requirement"
                            value={newRequire}
                            onChange={newRequireFunction}
                        />
                    </Col>
                    <Col md={1}>
                        <h4>Credits: </h4>
                    </Col>
                    <Col md={2}>
                        <FormControl
                            aria-label="Credits: "
                            type="number"
                            value={credits}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setCredits(parseInt(event.target.value))}
                        />
                    </Col>
                    <Col md={2}>
                        <Button
                            variant="outline-secondary"
                            onClick={manageNewRequire}
                            className="default-button"
                        >
                            Add Requirement
                        </Button>
                    </Col>
                </Row>
            </InputGroup>
        </div>
    );
}
