import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { CourseEditor } from "./courseEditor";
import { RecordControlsCourse } from "./recordControlsCourse";

export function CoursePoolView({
    course,
    editCourse,
    deletePoolCourse
}: //addCourse
{
    course: Course;
    deletePoolCourse: (code: string) => void;
    editCourse: (code: string, newCourse: Course, semesterId: string) => void;
    addCourse: (
        code: string,
        newCourse: Course,
        semesterId: string,
        oldSemesterId: string
    ) => void;
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
                deleteCourse={deletePoolCourse}
            ></CourseEditor>
        </>
    ) : (
        <div draggable="true">
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
            <div></div>
        </div>
    );
}
