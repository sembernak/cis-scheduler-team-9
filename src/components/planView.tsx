import React, { useState } from "react";
import { Semester } from "../interfaces/semester";
import { Button, Container, Col, Row } from "react-bootstrap";
import { SemesterView } from "./semesterView";
import { Plan } from "../interfaces/plan";
import { Course } from "../interfaces/course";
import { InsertSemester } from "./insertSemester";
import { PlanEditor } from "./planEditor";

export function PlanView({
    plan,
    deleteSemester,
    deletePlan,
    deleteCourse,
    editCourse,
    editPlan,
    editSemester,
    deleteAllCourses,
    deleteAllSemesters,
    resetCourse,
    addCourse
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
    resetCourse: (code: string, semesterId: string) => void;
    addCourse: (
        code: string,
        newCourse: Course,
        semesterId: string,
        oldSemesterId: string
    ) => void;
}): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false); //whether or not the adding semester view is visible
    //true means the addition screen is open
    const [editing, setEditing] = useState<boolean>(false);

    function changeEditing(): void {
        setEditing(!editing);
    }

    function flipVisibility(): void {
        setVisible(!visible);
    }

    return editing ? (
        <PlanEditor
            changeEditing={changeEditing}
            editPlan={editPlan}
            plan={plan}
        ></PlanEditor>
    ) : (
        <div>
            <h1>{plan.title}</h1>
            <Container>
                <Row lg={2} md={1}>
                    {plan.semesters.map((Semester: Semester) => (
                        <Col className={"row-equal"} key={Semester.id}>
                            <div
                                style={{
                                    overflowY: "scroll",
                                    height: "80vh",
                                    width: "auto",
                                    border: "solid",
                                    borderWidth: "1px",
                                    borderRadius: "8px",
                                    borderColor: "gray"
                                }}
                                className="background1"
                            >
                                <SemesterView
                                    plan={plan}
                                    semester={Semester}
                                    deleteSemester={deleteSemester}
                                    deleteCourse={deleteCourse}
                                    editCourse={editCourse}
                                    editSemester={editSemester}
                                    deleteAllCourses={deleteAllCourses}
                                    resetCourse={resetCourse}
                                    addCourse={addCourse}
                                ></SemesterView>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
            <br></br>
            <div
                style={{
                    height: "auto",
                    width: "auto",
                    border: "solid",
                    borderWidth: "1px",
                    borderRadius: "8px",
                    borderColor: "gray",
                    padding: "5px"
                }}
            >
                <h3>Plan and Semester Editing Tools:</h3>
                <Button
                    onClick={() => deletePlan(plan.id)}
                    variant="danger"
                    className="delete-plan-btn"
                >
                    Delete Plan
                </Button>
                <Button
                    onClick={changeEditing}
                    variant="primary"
                    className="edit-plan-btn"
                >
                    Edit Plan
                </Button>
                <Button
                    data-testid={"InsertSemester" + plan.title}
                    onClick={flipVisibility}
                    variant="success"
                    className="insert-sem-btn"
                >
                    Insert Semester
                </Button>
                <Button
                    onClick={() => deleteAllSemesters(String(plan.id))}
                    variant="danger"
                    className="delete-allsem-btn"
                >
                    Delete All Semesters
                </Button>
            </div>
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
