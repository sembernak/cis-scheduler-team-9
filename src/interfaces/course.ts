export interface Course {
    code: string;
    title: string;
    prereq: string[];
    description: string;
    credits: string;
    semesterId: string;
    requirements: string[];
}
