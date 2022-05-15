import React, { useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { CourseView } from "./courseView";
import { InsertCourse } from "./insertCourse";
import { RecordControlsSemester } from "./recordControlsSemester";
import { SemestorEditor } from "./semesterEditor";

export function SemesterView({
    plan,
    semester,
    deleteSemester,
    deleteCourse,
    editCourse,
    editSemester,
    deleteAllCourses,
    resetCourse,
    addCourse,
    checkPreReq
}: {
    plan: Plan;
    semester: Semester;
    deleteSemester: (id: string) => void;
    deleteCourse: (code: string, semesterId: string) => void;
    deleteAllCourses: (semesterId: string) => void;
    editCourse: (code: string, newCourse: Course, semesterId: string) => void;
    editSemester: (id: string, newSemester: Semester) => void;
    resetCourse: (code: string, semesterId: string) => void;
    addCourse: (
        code: string,
        newCourse: Course,
        semesterId: string,
        oldSemesterId: string
    ) => void;
    checkPreReq: (reqList: string[], courseNeed: Course) => boolean;
}): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false); //whether or not the adding semester view is visible
    const [editing, setEditing] = useState<boolean>(false);

    //true means the addition screen is open
    function flipVisibility(): void {
        setVisible(!visible);
    }

    function changeEditing(): void {
        setEditing(!editing);
    }

    const cred1 = semester.courses.reduce(
        (currentCredits: number, course: Course) =>
            currentCredits + Number(course.credits.trim().charAt(0)),
        0
    );

    const cred2 = semester.courses.reduce(
        (currentCredits: number, course: Course) =>
            currentCredits +
            Number(
                course.credits.trim().charAt(course.credits.trim().length - 1)
            ),
        0
    );

    const newsemester = {
        ...semester,
        totalCredits:
            cred1 === cred2
                ? cred1.toString()
                : cred1.toString() + "-" + cred2.toString()
    };

    const [, setDragOver] = React.useState(false);
    const handleDragOverStart = () => setDragOver(true);
    const handleDragOverEnd = () => setDragOver(false);

    const handleDragStart = (
        event: React.DragEvent<HTMLDivElement>,
        course: Course
    ) => {
        event.dataTransfer.setData("text", JSON.stringify(course));
    };

    const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData("text");
        console.log(id);
        const newSemesterId = event.currentTarget as Element; //semester where the course was dropped
        const tempCourse = JSON.parse(event.dataTransfer.getData("text"));
        const courseSemesterId = tempCourse.semesterId;
        const newCourse = {
            ...tempCourse,
            semesterId: newSemesterId.id
        };

        addCourse(
            newCourse.code,
            newCourse,
            newSemesterId.id,
            courseSemesterId
        );

        setDragOver(false);
    };

    return editing ? (
        <>
            <SemestorEditor
                changeEditing={changeEditing}
                semester={semester}
                editSemester={editSemester}
                plan={plan}
            ></SemestorEditor>
        </>
    ) : (
        <Container className="semester-view">
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
                onDragOver={enableDropping}
                onDrop={handleDrop}
                onDragEnter={handleDragOverStart}
                onDragLeave={handleDragOverEnd}
                id={newsemester.id}
            >
                <h1>
                    {newsemester.season + " - " + newsemester.year}
                    <br></br>
                </h1>
                {newsemester.totalCredits} {" credits"}
                {"                       "}
                {newsemester.courses.map((course: Course) => (
                    <div
                        key={course.code}
                        draggable={true}
                        onDragStart={(event: React.DragEvent<HTMLDivElement>) =>
                            handleDragStart(event, course)
                        }
                        id={
                            course.code +
                            "&*" +
                            course.title +
                            "&*" +
                            course.description +
                            "&*" +
                            course.credits +
                            "&*" +
                            course.semesterId +
                            "&*" +
                            course.requirements.reduce(
                                (currentString: string, str: string) =>
                                    currentString + str + "%*",
                                ""
                            ) +
                            "&*" +
                            course.prereq.reduce(
                                (currentString: string, str: string) =>
                                    currentString + str + "%*",
                                ""
                            )
                        }
                    >
                        <CourseView
                            course={course}
                            deleteCourse={deleteCourse}
                            editCourse={editCourse}
                            resetCourse={resetCourse}
                            checkPreReq={checkPreReq}
                        ></CourseView>
                    </div>
                ))}
                <div>
                    <br></br>
                    <Col>
                        <RecordControlsSemester
                            changeEditing={changeEditing}
                        ></RecordControlsSemester>
                        <Button
                            onClick={() => deleteSemester(newsemester.id)}
                            variant="danger"
                            className="delete-sem-btn"
                        >
                            Delete Semester
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            onClick={flipVisibility}
                            variant="success"
                            className="insert-course-btn"
                        >
                            Insert Course
                        </Button>
                        <Button
                            onClick={() =>
                                deleteAllCourses(String(semester.id))
                            }
                            variant="danger"
                            className="delete-allcourse-btn"
                        >
                            Delete All Courses
                        </Button>
                    </Col>
                    {visible && (
                        <InsertCourse
                            semester={newsemester}
                            flipVisibility={flipVisibility}
                            editCourse={editCourse}
                            editSemester={editSemester}
                        ></InsertCourse>
                    )}
                </div>
            </div>
        </Container>
    );
}
