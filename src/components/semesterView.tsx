import React from "react";
import { Button, Container } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { CourseView } from "./courseView";
//import { SemesterViewer } from "./semesterViewer";

export function SemesterView({
    semester,
    deleteSemester,
    deleteCourse,
    editCourse
}: {
    semester: Semester;
    deleteSemester: (id: number) => void;
    deleteCourse: (code: string) => void;
    editCourse: (code: string, newCourse: Course) => void;
}): JSX.Element {
    /*function changeViewing() {
        setViewing(!viewing);
    }*/
    return (
        <div>
            <Container>
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
                    <Button
                        onClick={() => deleteSemester(semester.id)}
                        variant="danger"
                        className="me-8"
                    >
                        Delete semester
                    </Button>
                </div>
            </Container>
        </div>
    );
}
