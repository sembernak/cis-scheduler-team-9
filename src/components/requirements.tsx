import React, { useState } from "react";
import {
    Button,
    Container,
    Col,
    Row,
    InputGroup,
    FormControl,
    FormLabel
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
        let compCred = 0;
        //needed to use if statements otherwise code became very hard to read
        //If we deleted first plan, it caused a console error so we have to check if plan is undefined
        if (plan !== undefined) {
            compCred = plan.semesters.reduce(
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
        } else {
            compCred = 0;
        }
        return compCred >= needCred;
    }
    return (
        <div
            style={{
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
                requirement, once the appropriate amount of credits are met,
                will be marked as complete.
            </div>
            <br></br>
            {requires.map(
                (req: Requirement): JSX.Element => (
                    <Container key={req.name}>
                        <Row>
                            <Col md={8} className="display-requirement">
                                <FormControl readOnly value={req.name} />
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
                                    className="x-btn"
                                >
                                    X
                                </Button>
                            </Col>
                            <Col md={2}>
                                <p>Required Credits: {req.credits}</p>
                            </Col>
                            <Col className="met-req-display">
                                Met?{" "}
                                {checkFulfilled(req.name, req.credits)
                                    ? "✅"
                                    : "❌"}
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
                            className="enter-req"
                        />
                    </Col>
                    <Col md={2} className="credits-dropdown">
                        <FormLabel>Credits:</FormLabel>
                        <FormControl
                            aria-label="Credits: "
                            className="credits-form"
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
                            className="add-req-btn"
                        >
                            Add Requirement
                        </Button>
                    </Col>
                </Row>
            </InputGroup>
        </div>
    );
}
