import { Course } from "./course";

export interface Semester {
    season: string;
    year: number;
    totalCredits: string;
    courses: Course[];
    id: string;
    planId: string;
}
