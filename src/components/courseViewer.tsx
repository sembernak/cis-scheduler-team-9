import React from "react";
import { Col } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function courseViewer({
    course
}: {
    changeView: () => void;
    course: Course;
}): JSX.Element {
    const preRecs = course.prereq.join(", ");
    return (
        <>
            <Col>
                <h3>
                    {course.code} {" - "} {course.title}
                    <br></br>
                    {course.credits} {" credits"}
                    <br></br>
                    {course.description}
                    <br></br>
                    {preRecs.length === 0 ? "" : "Prerequisites: " + preRecs}
                </h3>
            </Col>
            <div></div>
        </>
    );
}
