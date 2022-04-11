import React from "react";
import { Button, Col } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function CourseView({
    course,
    deleteCourse
}: {
    //changeView: () => void;
    course: Course;
    deleteCourse: (code: string) => void;
}): JSX.Element {
    const preRecs = course.prereq.join(", ");
    return (
        <>
            <Col>
                <h3>
                    {course.code} {" - "} {course.title}
                </h3>
                {course.credits} {" credits"}
                <br></br>
                {course.description}
                <br></br>
                {preRecs.length === 0 ? "" : "Prerequisites: " + preRecs}
            </Col>
            <Button
                onClick={() => deleteCourse(course.code)}
                variant="danger"
                className="me-8"
            >
                Delete Course
            </Button>
            <div></div>
        </>
    );
}
