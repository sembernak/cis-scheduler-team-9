//import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { CourseView } from "./courseView";
import { InsertCourse } from "./insertCourse";
import { RecordControlsSemester } from "./recordControlsSemester";
import { SemestorEditor } from "./semesterEditor";
//import { SemesterViewer } from "./semesterViewer";

export function SemesterView({
    plan,
    semester,
    deleteSemester,
    deleteCourse,
    editCourse,
    editSemester,
    deleteAllCourses,
    resetCourse,
    addCourse
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

    //console.log(dragOver); //keep getting lint error if I remove this line

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData("text", event.currentTarget.id);
    };

    const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData("text");
        const courseInfo = id.split("&*");
        const courseCode = courseInfo[0];
        const courseTitle = courseInfo[1];
        const courseDescription = courseInfo[2];
        const courseCredits = courseInfo[3];
        const courseSemesterId = courseInfo[4]; //original semester the course is from

        const courseReq = courseInfo[5]; //list of reqs
        const newCourseReq = courseReq.split("%*");
        const finalCourseReq = newCourseReq.slice(0, newCourseReq.length - 1); //last digit will be a comma that we dont want

        const coursePre = courseInfo[6];
        const newCoursePre = coursePre.split("%*");
        const finalCoursePre = newCoursePre.slice(0, newCoursePre.length - 1); //last digit will be a comma that we dont want

        const newSemesterId = event.currentTarget as Element; //semester where the course was dropped

        const newCourse = {
            code: courseCode,
            title: courseTitle,
            prereq: finalCoursePre,
            description: courseDescription,
            credits: courseCredits,
            semesterId: newSemesterId.id,
            requirements: finalCourseReq
        };

        addCourse(courseCode, newCourse, newSemesterId.id, courseSemesterId);

        console.log("Somebody dropped an element with id:" + id);
        //const newSemesterId = event.target;
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
                onDragOver={enableDropping}
                onDrop={handleDrop}
                onDragEnter={handleDragOverStart}
                onDragLeave={handleDragOverEnd}
                id={newsemester.id}
            >
                <h3>
                    {newsemester.season + " - " + newsemester.year}
                    <br></br>
                </h3>
                {newsemester.totalCredits} {" credits"}
                {"                       "}
                {newsemester.courses.map((course: Course) => (
                    <div
                        key={course.code}
                        draggable={true}
                        onDragStart={handleDragStart}
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
                        ></CourseView>
                    </div>
                ))}
            </div>
            <div>
                <Button
                    onClick={() => deleteSemester(newsemester.id)}
                    variant="danger"
                    className="delete-sem-btn"
                >
                    Delete semester
                </Button>
                <Button
                    onClick={flipVisibility}
                    variant="success"
                    className="insert-course-btn"
                >
                    Insert Course
                </Button>
                <Button
                    onClick={() => deleteAllCourses(String(semester.id))}
                    variant="danger"
                    className="delete-allcourse-btn"
                >
                    Delete All Courses
                </Button>
                {visible && (
                    <InsertCourse
                        semester={newsemester}
                        flipVisibility={flipVisibility}
                        //editPlan={editPlan}
                        editCourse={editCourse}
                        editSemester={editSemester}
                    ></InsertCourse>
                )}
                <RecordControlsSemester
                    changeEditing={changeEditing}
                ></RecordControlsSemester>
            </div>
        </Container>
    );
}
