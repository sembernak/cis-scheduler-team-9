import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

/*test("renders the course name somewhere", () => {
    render(<App />);
    const linkElement = screen.getByText(/CISC275/i);
    expect(linkElement).toBeInTheDocument();
});*/
describe("Make a new plan", () => {
    //Making sure that a new plan made by the user is at the very least usable
    beforeEach(() => render(<App />));
    test("App renders with welcome message", () => {
        expect(
            screen.queryAllByText(/Welcome to Team 9 schedule builder!/).length
        ).toBe(1);
    });
    test("Clicking New Plan gives a form to enter a title", () => {
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        expect(screen.getByLabelText("Plan Title:")).toBeInTheDocument();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 1");
    });
    test("Clicking cancel gets rid of Create Plan prompt", () => {
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const cancel = screen.getByTestId("CancelPlan");
        cancel.click();
        expect(screen.queryAllByText(/"Plan Title:"/)).toStrictEqual([]);
    });
    test("Can set new plan title", () => {
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        expect(screen.getByLabelText("Plan Title:")).toBeInTheDocument();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 2");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 2");
        expect(screen.getByRole("option", { name: "Test Plan 2" }).ariaSelected)
            .toBeTruthy;
        expect(screen.queryAllByText("Test Plan 2").length).toBe(2);
    });
    test("Insert Semester works", () => {
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 3");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 3");
        const newSemesters = screen.getAllByTestId("InsertSemesterTest Plan 3");
        const newSemester = newSemesters[0]; //if the tests mysteriously break this is the reason
        newSemester.click();
        const setSeason = screen.getByLabelText("Semester Season:");
        const setYear = screen.getByLabelText("Semester Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setSeason);
        userEvent.clear(setYear);
        userEvent.type(setSeason, "Summer");
        userEvent.type(setYear, "2022");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(
            screen.getAllByRole("heading", {
                name: /Summer - 2022/,
                hidden: false
            })
        ).toBeInTheDocument;
    });
    test("Delete Semester Works", () => {
        //make a new plan
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 4");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 4");
        const newSemesters = screen.getAllByTestId("InsertSemesterTest Plan 4");
        const newSemester = newSemesters[0]; //if the tests mysteriously break this is the reason
        //make a new semester
        newSemester.click();
        const setSeason = screen.getByLabelText("Semester Season:");
        const setYear = screen.getByLabelText("Semester Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setSeason);
        userEvent.clear(setYear);
        userEvent.type(setSeason, "Summer");
        userEvent.type(setYear, "2022");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(
            screen.getAllByRole("heading", {
                name: /Summer - 2022/,
                hidden: false
            })
        ).toBeInTheDocument; //initially semester is in the document
        const deleteSem = screen.getAllByRole("button", {
            name: "Delete semester",
            hidden: false
        });
        deleteSem[deleteSem.length - 1].click();
        expect(
            screen.queryAllByRole("heading", {
                name: /Summer - 2022/,
                hidden: false
            })
        ).not.toBeInTheDocument;
    });
    test("Edit Semester Works", () => {
        //make a new plan
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 5");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 5");
        const newSemesters = screen.getAllByTestId("InsertSemesterTest Plan 5");
        const newSemester = newSemesters[0]; //if the tests mysteriously break this is the reason
        //make a new semester
        newSemester.click();
        const setSeason = screen.getByLabelText("Semester Season:");
        const setYear = screen.getByLabelText("Semester Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setSeason);
        userEvent.clear(setYear);
        userEvent.type(setSeason, "Winter");
        userEvent.type(setYear, "2020");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(
            screen.getAllByRole("heading", {
                name: /Winter - 2020/,
                hidden: false
            })
        ).toBeInTheDocument; //initially semester is in the document
        screen
            .getAllByRole("button", { name: "Edit Semester", hidden: false })[0]
            .click();
        //edit semester
        const editSeason = screen.getByLabelText("Semester Season:");
        const editYear = screen.getByLabelText("Semester Year:");
        expect(editSeason).toBeInTheDocument;
        expect(editYear).toBeInTheDocument;
        userEvent.clear(editSeason);
        userEvent.clear(editYear);
        userEvent.type(editSeason, "Fall");
        userEvent.type(setYear, "2015");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        const editedSem = screen.queryAllByText(/Fall - 2015/);
        expect(editedSem[0]).toBeInTheDocument; //new edited semester is visible
    });
    test("Edit Semester Works", () => {
        //make a new plan
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 6");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 6");
        const newSemesters = screen.getAllByTestId("InsertSemesterTest Plan 6");
        const newSemester = newSemesters[0]; //if the tests mysteriously break this is the reason
        //make a new semester
        newSemester.click();
        const setSeason = screen.getByLabelText("Semester Season:");
        const setYear = screen.getByLabelText("Semester Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setSeason);
        userEvent.clear(setYear);
        userEvent.type(setSeason, "Winter");
        userEvent.type(setYear, "2020");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(
            screen.getAllByRole("heading", {
                name: /Winter - 2020/,
                hidden: false
            })
        ).toBeInTheDocument; //initially semester is in the document
        screen
            .getAllByRole("button", { name: "Edit Semester", hidden: false })[0]
            .click();
        //edit semester
        const editSeason = screen.getByLabelText("Semester Season:");
        const editYear = screen.getByLabelText("Semester Year:");
        expect(editSeason).toBeInTheDocument;
        expect(editYear).toBeInTheDocument;
        userEvent.clear(editSeason);
        userEvent.clear(editYear);
        userEvent.type(editSeason, "Fall");
        userEvent.type(setYear, "2015");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        const editedSem = screen.queryAllByText(/Fall - 2015/);
        expect(editedSem[0]).toBeInTheDocument; //new edited semester is visible
    });
    test("Edit Semester cancel button works", () => {
        //make a new plan
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 7");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 7");
        const newSemesters = screen.getAllByTestId("InsertSemesterTest Plan 7");
        const newSemester = newSemesters[0]; //if the tests mysteriously break this is the reason
        //make a new semester
        newSemester.click();
        const setSeason = screen.getByLabelText("Semester Season:");
        const setYear = screen.getByLabelText("Semester Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setSeason);
        userEvent.clear(setYear);
        userEvent.type(setSeason, "Winter");
        userEvent.type(setYear, "2020");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(
            screen.getAllByRole("heading", {
                name: /Winter - 2020/,
                hidden: false
            })
        ).toBeInTheDocument; //initially semester is in the document
        screen
            .getAllByRole("button", { name: "Edit Semester", hidden: false })[0]
            .click();
        //edit semester
        const editSeason = screen.getByLabelText("Semester Season:");
        const editYear = screen.getByLabelText("Semester Year:");
        expect(editSeason).toBeInTheDocument;
        expect(editYear).toBeInTheDocument;
        userEvent.clear(editSeason);
        userEvent.clear(editYear);
        userEvent.type(editSeason, "Fall");
        userEvent.type(setYear, "2015");
        screen.getByRole("button", { name: "Cancel", hidden: false }).click(); //cancel, so the semester should not change
        const editedSem = screen.queryAllByText(/Fall - 2015/);
        expect(editedSem[0]).not.toBeInTheDocument; //new edited semester is visible
    });
    test("Can delete all semesters", () => {
        //does not work fully
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 8");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 8");
        const newSemester = screen.getByTestId("InsertSemesterTest Plan 8");
        newSemester.click();
        const setSeason = screen.getByLabelText("Semester Season:");
        const setYear = screen.getByLabelText("Semester Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setSeason);
        userEvent.clear(setYear);
        userEvent.type(setSeason, "Spring");
        userEvent.type(setYear, "2020");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(
            screen.getAllByRole("heading", {
                name: /Spring - 2020/,
                hidden: false
            })
        ).toBeInTheDocument;
        const newSemester2 = screen.getByTestId("InsertSemesterTest Plan 8");
        newSemester2.click();
        const setSeason2 = screen.getByLabelText("Semester Season:");
        const setYear2 = screen.getByLabelText("Semester Year:");
        expect(setSeason2).toBeInTheDocument;
        expect(setYear2).toBeInTheDocument;
        userEvent.clear(setSeason2);
        userEvent.clear(setYear2);
        userEvent.type(setSeason2, "Fall");
        userEvent.type(setYear2, "2021");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(
            screen.getAllByRole("heading", {
                name: /Fall - 2021/,
                hidden: false
            })
        ).toBeInTheDocument;
        const deleteAllSem = screen.getByRole("button", {
            name: "Delete All Semesters",
            hidden: false
        });
        deleteAllSem.click();
        expect(
            screen.queryAllByRole("heading", {
                name: /Spring - 2020/,
                hidden: false
            })
        ).not.toBeInTheDocument;
        expect(
            screen.queryAllByRole("heading", {
                name: /Fall - 2021/,
                hidden: false
            })
        ).not.toBeInTheDocument;
    });
    test("Can insert a course", () => {
        //NOTE: this one is not working yet
        //make a new plan
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 9");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 9");
        const newSemesters = screen.getAllByTestId("InsertSemesterTest Plan 9");
        const newSemester = newSemesters[0]; //if the tests mysteriously break this is the reason
        //make a new semester
        newSemester.click();
        const setSeason = screen.getByLabelText("Semester Season:");
        const setYear = screen.getByLabelText("Semester Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setSeason);
        userEvent.clear(setYear);
        userEvent.type(setSeason, "Winter");
        userEvent.type(setYear, "2020");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(
            screen.getAllByRole("heading", {
                name: /Winter - 2020/,
                hidden: false
            })
        ).toBeInTheDocument; //initially semester is in the document
        //add course
        const insertButton = screen.getByRole("button", {
            name: "Insert Course",
            hidden: false
        });
        expect(insertButton).toBeInTheDocument;
        insertButton.click();
        const setCode = screen.getByLabelText("Code:");
        const setTitle = screen.getByLabelText("Title:");
        const setDes = screen.getByLabelText("Description:");
        const setCredits = screen.getAllByLabelText("Credits:");
        userEvent.type(setCode, "CHEM 331");
        userEvent.type(setTitle, "Organic Chemistry");
        userEvent.type(setDes, "Introduction to organic chemistry principles");
        userEvent.type(setCredits[0], "3");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        //need to finish this test
        const linkElement = screen.getByText(/CHEM 331 - Organic Chemistry/i);
        expect(linkElement).toBeInTheDocument();
        const descriptionElement = screen.getByText(
            /Introduction to organic chemistry principles/i
        );
        expect(descriptionElement).toBeInTheDocument;
    });
    test("Can edit a course", () => {
        //not working for same reason as above -> insert button click()
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 10");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 10");
        const newSemesters = screen.getAllByTestId(
            "InsertSemesterTest Plan 10"
        );
        const newSemester = newSemesters[0]; //if the tests mysteriously break this is the reason
        //make a new semester
        newSemester.click();
        const setSeason = screen.getByLabelText("Semester Season:");
        const setYear = screen.getByLabelText("Semester Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setSeason);
        userEvent.clear(setYear);
        userEvent.type(setSeason, "Winter");
        userEvent.type(setYear, "2020");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(
            screen.getAllByRole("heading", {
                name: /Winter - 2020/,
                hidden: false
            })
        ).toBeInTheDocument; //initially semester is in the document
        //add course
        const insertButton = screen.queryAllByRole("button", {
            name: "Insert Course",
            hidden: false
        });
        expect(insertButton).toBeInTheDocument;
        insertButton[0].click();
        const setCode = screen.getByLabelText("Code:");
        const setTitle = screen.getByLabelText("Title:");
        const setDes = screen.getByLabelText("Description:");
        const setCredits = screen.getAllByLabelText("Credits:");
        userEvent.type(setCode, "CHEM331");
        userEvent.type(setTitle, "Organic Chemsitry");
        userEvent.type(setDes, "Introduction to organic chemistry principles");
        userEvent.type(setCredits[0], "3");
        const saveButton = screen.getAllByRole("button", {
            name: "Save",
            hidden: false
        });
        saveButton[saveButton.length - 1].click();
        // edit this course using edit course button
        const editButton = screen.getByRole("button", {
            name: "Edit Course"
        });
        expect(editButton).toBeInTheDocument;
        editButton.click();
        const newCredits = screen.getAllByLabelText("Credits:");
        const newTitle = screen.getByLabelText("Title:");
        const newDes = screen.getByLabelText("Description:");
        userEvent.type(newCredits[0], "2");
        userEvent.type(newTitle, "CHEM101");
        userEvent.type(newDes, "Not original course");
        const saveButton2 = screen.getAllByRole("button", {
            name: "Save",
            hidden: false
        });
        saveButton2[saveButton2.length - 1].click();
        expect(screen.getAllByText(/2 credits/i)).toBeInTheDocument;
        expect(screen.getByText(/CHEM101/i)).toBeInTheDocument;
        expect(screen.getByText(/Not original course/i)).toBeInTheDocument;
    });
    test("Can set and fulfill requirements", () => {
        //not working for same reason as above -> insert button click()
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 16");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 16");
        const newSemesters = screen.getAllByTestId(
            "InsertSemesterTest Plan 16"
        );
        const newSemester = newSemesters[0]; //if the tests mysteriously break this is the reason
        //make a new semester
        newSemester.click();
        const setSeason = screen.getByLabelText("Semester Season:");
        const setYear = screen.getByLabelText("Semester Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setSeason);
        userEvent.clear(setYear);
        userEvent.type(setSeason, "Winter");
        userEvent.type(setYear, "2020");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(
            screen.getAllByRole("heading", {
                name: /Winter - 2020/,
                hidden: false
            })
        ).toBeInTheDocument; //initially semester is in the document
        //add course
        const insertButton = screen.queryAllByRole("button", {
            name: "Insert Course",
            hidden: false
        });
        expect(insertButton).toBeInTheDocument;
        insertButton[0].click();
        const setCode = screen.getByLabelText("Code:");
        const setTitle = screen.getByLabelText("Title:");
        const setDes = screen.getByLabelText("Description:");
        const setCredits = screen.getAllByLabelText("Credits:");
        userEvent.type(setCode, "CHEM331");
        userEvent.type(setTitle, "Organic Chemsitry");
        userEvent.type(setDes, "Introduction to organic chemistry principles");
        userEvent.type(setCredits[0], "3");
        const saveButton = screen.getAllByRole("button", {
            name: "Save",
            hidden: false
        });
        saveButton[saveButton.length - 1].click();
        // edit this course using edit course button
        const editButton = screen.getByRole("button", {
            name: "Edit Course"
        });
        expect(editButton).toBeInTheDocument;
        editButton.click();
        const newCredits = screen.getAllByLabelText("Credits:");
        const newTitle = screen.getByLabelText("Title:");
        const newDes = screen.getByLabelText("Description:");
        const newReq = screen.getAllByPlaceholderText("New Requirement");
        userEvent.type(newCredits[0], "2");
        userEvent.type(newTitle, "CHEM101");
        userEvent.type(newDes, "Not original course");
        userEvent.type(newReq[0], "TestReq");
        const addReq = screen.getAllByText("Add Requirement");
        addReq[0].click();
        const saveButton2 = screen.getAllByRole("button", {
            name: "Save",
            hidden: false
        });
        saveButton2[saveButton2.length - 1].click();
        expect(screen.getAllByText(/2 credits/i)).toBeInTheDocument;
        expect(screen.getByText(/CHEM101/i)).toBeInTheDocument;
        expect(screen.getByText(/Not original course/i)).toBeInTheDocument;
        expect(screen.getByText(/TestReq/i)).toBeInTheDocument;
        const newGlobReq = screen.getAllByPlaceholderText("New Requirement");
        userEvent.type(newGlobReq[newGlobReq.length - 1], "TestReq");
        const credCount = screen.getAllByLabelText("Credits:");
        userEvent.type(credCount[credCount.length - 1], "3");
        const addGlobReq = screen.getAllByText("Add Requirement");
        addGlobReq[addGlobReq.length - 1].click();
        expect(screen.getByText(/Yes/i)).toBeInTheDocument;
    });
    test("Can edit a plan", () => {
        //testing edit plan button
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 11");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 11");
        const editButton = screen.getByRole("button", {
            name: "Edit Plan"
        });
        expect(editButton).toBeInTheDocument;
        editButton.click();
        const newTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(newTitle, "Plan is changed");
        const saveButton2 = screen.getAllByRole("button", {
            name: "Save",
            hidden: false
        });
        saveButton2[saveButton2.length - 1].click();
        expect(screen.getAllByText(/Plan is changed/i)).toBeInTheDocument;
    });
    test("Plan editor cancel button works", () => {
        //testing edit plan button
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 12");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 12");
        const editButton = screen.getByRole("button", {
            name: "Edit Plan"
        });
        expect(editButton).toBeInTheDocument;
        editButton.click();
        const newTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(newTitle, "Plan is changed");
        const saveButton2 = screen.getAllByRole("button", {
            name: "Cancel",
            hidden: false
        });
        saveButton2[saveButton2.length - 1].click();
        expect(screen.queryByText(/Plan is changed/i)).not.toBeInTheDocument; //cancel button was pushed so title should not change
    });
    test("Delete all courses button works", () => {
        //NOTE: this one is not working yet
        //make a new plan
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 13");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 13");
        const newSemesters = screen.getAllByTestId(
            "InsertSemesterTest Plan 13"
        );
        const newSemester = newSemesters[0]; //if the tests mysteriously break this is the reason
        //make a new semester
        newSemester.click();
        const setSeason = screen.getByLabelText("Semester Season:");
        const setYear = screen.getByLabelText("Semester Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setSeason);
        userEvent.clear(setYear);
        userEvent.type(setSeason, "Winter");
        userEvent.type(setYear, "2020");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(
            screen.getAllByRole("heading", {
                name: /Winter - 2020/,
                hidden: false
            })
        ).toBeInTheDocument; //initially semester is in the document
        //add course
        const insertButton = screen.getByRole("button", {
            name: "Insert Course",
            hidden: false
        });
        expect(insertButton).toBeInTheDocument;
        insertButton.click();
        const setCode = screen.getByLabelText("Code:");
        const setTitle = screen.getByLabelText("Title:");
        const setDes = screen.getByLabelText("Description:");
        const setCredits = screen.getAllByLabelText("Credits:");
        userEvent.type(setCode, "CHEM 331");
        userEvent.type(setTitle, "Organic Chemistry");
        userEvent.type(setDes, "Introduction to organic chemistry principles");
        userEvent.type(setCredits[0], "3");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        const insertButton1 = screen.getByRole("button", {
            name: "Insert Course",
            hidden: false
        });
        expect(insertButton1).toBeInTheDocument;
        insertButton.click();
        //add a second course
        const setCode2 = screen.getByLabelText("Code:");
        const setTitle2 = screen.getByLabelText("Title:");
        const setDes2 = screen.getByLabelText("Description:");
        const setCredits2 = screen.getAllByLabelText("Credits:");
        userEvent.type(setCode2, "CHEG 342");
        userEvent.type(setTitle2, "Heat and Mass Transfer");
        userEvent.type(setDes2, "Introduction to heat and mass transfer");
        userEvent.type(setCredits2[1], "4");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        const linkElement = screen.getByText(
            /CHEG 342 - Heat and Mass Transfer/i
        );
        expect(linkElement).toBeInTheDocument();
        const descriptionElement = screen.getByText(
            /Introduction to heat and mass transfer/i
        );
        expect(descriptionElement).toBeInTheDocument;
        //checked that both courses appeared- now can delete them
        screen
            .getAllByRole("button", {
                name: "Delete All Courses",
                hidden: false
            })[0]
            .click();
        expect(
            screen.queryByText(/CHEG 342 - Heat and Mass Transfer/i)
        ).not.toBeInTheDocument();
        expect(screen.queryByText(/CHEM331/i)).not.toBeInTheDocument();
    });
    /*test("Create Courses Manually", () => {
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterId = screen.getByLabelText("Plan Id:");
        userEvent.type(enterId, "6"); //get rid of this when ids become automatic
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 1");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 1");
        const newSemesters = screen.getAllByTestId("InsertSemesterTest Plan 1");
        const newSemester = newSemesters[0]; //if the tests mysteriously break this is the reason
        newSemester.click();
        const setSeason = screen.getByLabelText("Semester Season:");
        const setYear = screen.getByLabelText("Semester Year:");
        userEvent.clear(setSeason);
        userEvent.clear(setYear);
        userEvent.type(setSeason, "Summer");
        userEvent.type(setYear, "2022");
        const verifyCancel = screen.getByRole("button", {
            name: "Cancel",
            hidden: false
        });
        verifyCancel.click();
        expect(screen.queryAllByLabelText(/Semester Year:/)).toStrictEqual([]); //Making sure cancel insert semester still works
        screen.getByRole("button", { name: "Insert Course" }).click();
    });*/
});
