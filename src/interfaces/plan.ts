import { Semester } from "./semester";

export interface Plan {
    title: string;
    semesters: Semester[];
    id: number;
}
