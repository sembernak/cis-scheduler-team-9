import { Course } from "./course";

export interface Semester {
    season: "spring" | "summer" | "fall" | "winter";
    year: number;
    totalCredits: number;
    courses: Course[];
}
