import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { CourseEditor } from "./courseEditor";
import { RecordControlsCourse } from "./recordControlsCourse";

export function CourseView({
    course,
    deleteCourse,
    editCourse,
    resetCourse
}: {
    course: Course;
    deleteCourse: (code: string, semesterId: string) => void;
    editCourse: (code: string, newCourse: Course, semesterId: string) => void;
    resetCourse: (code: string, semesterId: string) => void;
}): JSX.Element {
    const preRecs = course.prereq.join(", ");
    const requirements = course.requirements.join(", ");
    const [editing, setEditing] = useState<boolean>(false);
    function changeEditing() {
        setEditing(!editing);
    }

    function showDes() {
        const show = document.getElementById(
            course.code + course.semesterId + "description"
        );
        if (show === null) {
            return;
        } else if (show.style.display === "none") {
            show.style.display = "block";
        } else {
            show.style.display = "none";
        }
    }

    return editing ? (
        <>
            <CourseEditor
                changeEditing={changeEditing}
                course={course}
                editCourse={editCourse}
                deleteCourse={deleteCourse}
            ></CourseEditor>
        </>
    ) : (
        <>
            <Col id={course.semesterId}>
                <h3>
                    {course.code} {" - "} {course.title}
                </h3>
                {course.credits} {" credits"}{" "}
                <Button className="description-btn" onClick={showDes}>
                    &#10549;
                </Button>
                <br></br>
                <p id={course.code + course.semesterId + "description"}>
                    {course.description};
                </p>
                <br></br>
                {preRecs.length === 0 ? "" : "Prerequisites: " + preRecs}
                <br></br>
                {requirements.length === 0
                    ? ""
                    : "Degree Requirements: " + requirements}
                <Col>
                    <Row>
                        <RecordControlsCourse
                            changeEditing={changeEditing}
                        ></RecordControlsCourse>
                    </Row>
                    <Button
                        onClick={() =>
                            resetCourse(course.code, course.semesterId)
                        }
                        className="reset-course-btn"
                    >
                        &#8634; Reset
                    </Button>
                </Col>
            </Col>
            <div></div>
        </>
    );
}
