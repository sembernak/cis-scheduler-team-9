import unpackJson from "./unpackJSON";
import catalog from "../catalog.json";
import { Requirement } from "../interfaces/requirement";
import { Course } from "../interfaces/course";
export { examplePlan1, examplePlan2, defReq1 };

const COURSELIST = [
    //Complete list of every course in order of department (see catalog.json)
    {
        code: "test",
        title: "test",
        prereq: ["test"],
        description:
            "I couldn't figure out another way to type this variable properly",
        credits: "1",
        semesterId: "",
        requirements: [""]
    }
];
COURSELIST.pop();

let i: keyof typeof catalog;
for (i in catalog) {
    for (const j in catalog[i]) {
        COURSELIST.push(unpackJson(i, j));
    }
}
const findEGGG = COURSELIST.filter(
    (course: Course): boolean => course.code === "EGGG 101"
);

const course1 = {
    ...findEGGG[0],
    semesterId: "Fall2022Plan 1"
};

const findCISC108 = COURSELIST.filter(
    (course: Course): boolean => course.code === "CISC 108"
);

const course2 = {
    ...findCISC108[0],
    semesterId: "Fall2022Plan 1"
};

const MATH241 = COURSELIST.filter(
    (course: Course): boolean => course.code === "MATH 241"
);

const course3 = {
    ...MATH241[0],
    semesterId: "Fall2022Plan 1"
};

const findENGL = COURSELIST.filter(
    (course: Course): boolean => course.code === "ENGL 101"
);

const course0 = {
    ...findENGL[0],
    semesterId: "Fall2022Plan 1"
};

const find181 = COURSELIST.filter(
    (course: Course): boolean => course.code === "CISC 181"
);

const course4 = {
    ...find181[0],
    semesterId: "Spring2023Plan 1"
};

const find210 = COURSELIST.filter(
    (course: Course): boolean => course.code === "CISC 210"
);

const course6 = {
    ...find210[0],
    semesterId: "Spring2023Plan 1"
};

const find242 = COURSELIST.filter(
    (course: Course): boolean => course.code === "MATH 242"
);

const course7 = {
    ...find242[0],
    semesterId: "Spring2023Plan 1"
};

const course5 = {
    ...COURSELIST[433],
    semesterId: "Spring2023Plan 2"
};

const exampleSem2 = {
    season: "Fall",
    year: 2022,
    totalCredits: "15",
    courses: [course0, course1, course2, course3],
    id: "Spring2020Plan 1",
    planId: "Plan 1"
};

const exampleSem3 = {
    season: "Spring",
    year: 2023,
    totalCredits: "6",
    courses: [course4, course6, course7],
    id: "Winter2019Plan 1",
    planId: "Plan 1"
};

const exampleSem4 = {
    season: "Winter",
    year: 2019,
    totalCredits: "6",
    courses: [course5],
    id: "Winter2019Plan 2",
    planId: "Plan 2"
};

const examplePlan1 = {
    title: "Plan 1",
    semesters: [exampleSem2, exampleSem3],
    id: "Plan 1"
};

const examplePlan2 = {
    title: "Plan 2",
    semesters: [exampleSem4],
    id: "Plan 2"
};

const defReq1 = [
    { name: "ENGL 110", credits: 3 },
    { name: "First Year Seminar", credits: 1 },
    { name: "Discovery Learning Experience", credits: 3 },
    { name: "Multicultural", credits: 3 },
    { name: "Creative Arts and Humanities", credits: 3 },
    { name: "History and Cultural Change", credits: 3 },
    { name: "Social and Behavioral Sciences", credits: 3 },
    { name: "Mathematics, Natural Sciences, and Technology", credits: 3 },
    { name: "Capstonce Experience", credits: 1 }
] as Requirement[];
