import { Course } from "./course";

export interface Semester {
    season: string;
    year: number;
    totalCredits: number;
    courses: Course[];
    id: number;
    planId: number;
}
