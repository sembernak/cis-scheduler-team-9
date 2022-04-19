import React, { useState } from "react";
import { Semester } from "../interfaces/semester";
import { Button, Container, Col, Row } from "react-bootstrap";
import { SemesterView } from "./semesterView";
import { Plan } from "../interfaces/plan";
import { Course } from "../interfaces/course";
import { InsertSemester } from "./insertSemester";

export function PlanView({
    plan,
    deleteSemester,
    deletePlan,
    deleteCourse,
    editCourse,
    editPlan,
    editSemester,
    deleteAllCourses,
    deleteAllSemesters
}: {
    plan: Plan;
    deleteSemester: (id: string) => void;
    deletePlan: (id: string) => void;
    deleteCourse: (code: string, semesterId: string) => void;
    editCourse: (code: string, newCourse: Course, semesterId: string) => void;
    editPlan: (id: string, newPlan: Plan) => void;
    editSemester: (id: string, newSemester: Semester) => void;
    deleteAllCourses: (semesterId: string) => void;
    deleteAllSemesters: (planid: string) => void;
}): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false); //whether or not the adding semester view is visible
    //true means the addition screen is open
    function flipVisibility(): void {
        setVisible(!visible);
    }

    return (
        <div>
            <h3>{plan.title}</h3>
            <Container>
                <Row md={2} sm={1}>
                    {plan.semesters.map((Semester: Semester) => (
                        <Col className={"row-equal"} key={Semester.id}>
                            <div className="bg-light border m-2 p-2 contains-semester">
                                <SemesterView
                                    plan={plan}
                                    semester={Semester}
                                    deleteSemester={deleteSemester}
                                    deleteCourse={deleteCourse}
                                    //viewSemester={viewSemester}
                                    editCourse={editCourse}
                                    editSemester={editSemester}
                                    //viewing={viewing}
                                    //setViewing={setViewing}
                                    deleteAllCourses={deleteAllCourses}
                                ></SemesterView>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Button
                onClick={() => deletePlan(plan.id)}
                variant="danger"
                className="me-8"
            >
                Delete Plan
            </Button>
            <Button
                data-testid={"InsertSemester" + plan.title}
                onClick={flipVisibility}
                variant="success"
                className="me-8"
            >
                Insert Semester
            </Button>
            <Button
                onClick={() => deleteAllSemesters(String(plan.id))}
                variant="danger"
                className="me-8"
            >
                Delete All Semesters
            </Button>
            {visible && (
                <InsertSemester
                    flipVisibility={flipVisibility}
                    plan={plan}
                    editPlan={editPlan}
                    editSemester={editSemester}
                ></InsertSemester>
            )}
        </div>
    );
}
