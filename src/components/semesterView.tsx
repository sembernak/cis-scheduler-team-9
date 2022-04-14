import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { CourseView } from "./courseView";
import { InsertCourse } from "./insertCourse";
//import { SemesterViewer } from "./semesterViewer";

export function SemesterView({
    semester,
    deleteSemester,
    deleteCourse,
    editCourse,
    editSemester
}: {
    semester: Semester;
    deleteSemester: (id: number) => void;
    deleteCourse: (code: string, semesterId: string) => void;
    editCourse: (code: string, newCourse: Course, semesterId: string) => void;
    editSemester: (id: number, newSemester: Semester) => void;
}): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false); //whether or not the adding semester view is visible
    //true means the addition screen is open
    function flipVisibility(): void {
        setVisible(!visible);
    }
    return (
        <Container className="semester-view">
            <div>
                <h3>
                    {semester.season} {" - "} {semester.year}
                    <br></br>
                </h3>
                {semester.totalCredits} {" credits"}
                {"                       "}
                {semester.courses.map((course: Course) => (
                    <div key={course.code}>
                        <CourseView
                            course={course}
                            deleteCourse={deleteCourse}
                            editCourse={editCourse}
                        ></CourseView>
                    </div>
                ))}
            </div>
            <div>
                <Button
                    onClick={() => deleteSemester(semester.id)}
                    variant="danger"
                    className="me-8"
                >
                    Delete semester
                </Button>
                <Button
                    onClick={flipVisibility}
                    variant="danger"
                    className="me-8"
                >
                    Insert Course
                </Button>
                {visible && (
                    <InsertCourse
                        semester={semester}
                        //editPlan={editPlan}
                        editCourse={editCourse}
                        editSemester={editSemester}
                    ></InsertCourse>
                )}
            </div>
        </Container>
    );
}
