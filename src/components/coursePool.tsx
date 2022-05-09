import { Course } from "../interfaces/course";
import React, { useState } from "react";
import unpackJson from "../helper_functions/unpackJSON";
import catalog from "../catalog.json";
import { Button, Form } from "react-bootstrap";
import { CoursePoolView } from "./coursePoolView";

const DEPARTMENTS = ["hello"];
DEPARTMENTS.pop();

let g: keyof typeof catalog;
for (g in catalog) {
    DEPARTMENTS.push(String(g));
}

const COURSEPOOL = [
    //Complete list of every course in order of department (see catalog.json)
    {
        code: "test",
        title: "test",
        prereq: ["test"],
        description:
            "I couldn't figure out another way to type this variable properly",
        credits: "1",
        semesterId: "pool",
        requirements: [""]
    }
];
COURSEPOOL.pop();

let i: keyof typeof catalog;
for (i in catalog) {
    for (const j in catalog[i]) {
        COURSEPOOL.push(unpackJson(i, j));
    }
}

export function CoursePool({
    addCourse
}: {
    addCourse: (
        code: string,
        newCourse: Course,
        semesterId: string,
        oldSemesterId: string
    ) => void;
}): JSX.Element {
    function getDepCourses(department: string) {
        return COURSEPOOL.filter((course: Course): boolean =>
            course.code.includes(department)
        );
    }

    const [userPool, changePool] = useState<Course[]>([]);
    const [department, changeDepartment] = useState<string>(DEPARTMENTS[0]);
    const [shownCourse, changeCourse] = useState<string>(
        getDepCourses(department)[0].code
    );

    function depSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        changeDepartment(event.target.value);
        changeCourse(getDepCourses(event.target.value)[0].code);
    }

    function courseSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        changeCourse(event.target.value);
    }

    function deletePoolCourse(code: string) {
        changePool(
            userPool.filter((course: Course): boolean => course.code !== code)
        );
    }

    function editPoolCourse(
        code: string,
        newCourse: Course,
        semesterId: string
    ) {
        changePool(
            userPool.map(
                (course: Course): Course =>
                    course.code === code && course.semesterId === semesterId
                        ? newCourse
                        : course
            )
        );
    }

    return (
        <div>
            <Form.Group>
                <Form.Select value={department} onChange={depSelect}>
                    {DEPARTMENTS.map(
                        (department: string): JSX.Element => (
                            <option key={department} value={department}>
                                {department}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Select value={shownCourse} onChange={courseSelect}>
                    {getDepCourses(department).map(
                        (course: Course): JSX.Element => (
                            <option key={course.code} value={course.code}>
                                {course.code}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
            <Button
                onClick={() =>
                    changePool([
                        ...userPool,
                        COURSEPOOL.find(
                            (course: Course): boolean =>
                                course.code === shownCourse
                        ) as Course
                    ])
                }
            >
                Add Course
            </Button>
            <ul>
                {/*userPool.map(
                    (course: Course): JSX.Element => (
                        <li key={course.code}>{course.code}</li>
                    )
                    )*/}
            </ul>
            {userPool.map((course: Course) => (
                <div key={course.code}>
                    <CoursePoolView
                        course={course}
                        deletePoolCourse={deletePoolCourse}
                        editCourse={editPoolCourse}
                        addCourse={addCourse}
                    ></CoursePoolView>
                </div>
            ))}
        </div>
    );
}