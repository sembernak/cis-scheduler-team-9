import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { CourseEditor } from "./courseEditor";
import { RecordControlsCourse } from "./recordControlsCourse";

export function CourseView({
    course,
    deleteCourse,
    editCourse
}: {
    //changeView: () => void;
    course: Course;
    deleteCourse: (code: string) => void;
    editCourse: (code: string, newCourse: Course) => void;
}): JSX.Element {
    const preRecs = course.prereq.join(", ");
    const [editing, setEditing] = useState<boolean>(false);

    function changeEditing() {
        setEditing(!editing);
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
            <Col>
                <h3>
                    {course.code} {" - "} {course.title}
                </h3>
                {course.credits} {" credits"}
                <br></br>
                {course.description}
                <br></br>
                {preRecs.length === 0 ? "" : "Prerequisites: " + preRecs}
                <Col>
                    <RecordControlsCourse
                        changeEditing={changeEditing}
                    ></RecordControlsCourse>
                </Col>
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
