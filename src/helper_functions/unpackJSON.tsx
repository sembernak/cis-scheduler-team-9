import { Course } from "../interfaces/course";
import catalog from "../catalog.json";

export default function unloadJson(
    department: keyof typeof catalog,
    courseId: string
): Course {
    //Use this to access courses from catalog.json
    //for example department could be: 'ACCT"
    //and courseId would be: 'ACCT 166'
    const area = catalog[department];
    const please = courseId as keyof typeof area;
    const courseSpec = area[please];
    return {
        code: courseSpec["code"],
        title: courseSpec["name"],
        prereq: [courseSpec["preReq"]],
        description: courseSpec["descr"],
        credits: courseSpec["credits"],
        semesterId: "",
        requirements: []
    };
}
