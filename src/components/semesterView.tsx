import React from "react";
import { Button, Container } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { CourseView } from "./courseView";
//import { SemesterViewer } from "./semesterViewer";

export function SemesterView({
    semester
}: //deletesemester
{
    semester: Semester;
    //deletesemester: (id: number) => void;
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
                            <CourseView course={course}></CourseView>
                        </div>
                    ))}
                    <Button
                        //onClick={() => deletesemester(semester.id)}
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
