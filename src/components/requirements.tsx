import React, { useState } from "react";
import {
    Button,
    Container,
    Col,
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
        const compCred = plan.semesters.reduce(
            (total: number, semester: Semester) =>
                semester.courses.reduce(
                    (subTotal: number, course: Course) =>
                        course.requirements.includes(req)
                            ? parseInt(course.credits.trim()[0])
                            : 0,
                    0
                ),
            0
        );
        return compCred >= needCred;
    }
    return (
        <div>
            <FormLabel>Degree Requirements:</FormLabel>
            {requires.map(
                (req: Requirement): JSX.Element => (
                    <InputGroup key={req.name}>
                        <FormControl
                            readOnly
                            value={req.name}
                            /*onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => manageCurrentPR(event, prereq)}
                                    This works but is annoying to use ^*/
                        />
                        <p>Required Credits: {req.credits}</p>
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
                        <p>
                            Met?{" "}
                            {checkFulfilled(req.name, req.credits)
                                ? "Yes"
                                : "No"}
                        </p>
                    </InputGroup>
                )
            )}
            <InputGroup as={Container}>
                <Col md={5}>
                    <FormControl
                        placeholder="New Requirement"
                        value={newRequire}
                        onChange={newRequireFunction}
                    />
                </Col>
                <Col md={1}>
                    <FormLabel>Credits: </FormLabel>
                </Col>
                <Col>
                    <FormControl
                        aria-label="Credits: "
                        type="number"
                        value={credits}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setCredits(parseInt(event.target.value))}
                    />
                </Col>
                <Col>
                    <Button
                        variant="outline-secondary"
                        onClick={manageNewRequire}
                    >
                        Add Requirement
                    </Button>
                </Col>
            </InputGroup>
        </div>
    );
}
