import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("Make a new plan", () => {
    //Making sure that a new plan made by the user is at the very least usable
    beforeEach(() => render(<App />));
    test("App renders with welcome message", () => {
        expect(
            screen.queryAllByText(/Welcome to our course planner for UD!/)
                .length
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
        //make a new semester
        newSemester.click();
        const setSeason = screen.getByLabelText("Season:");
        const setYear = screen.getByLabelText("Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setYear);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Winter" })
        );
        userEvent.type(setYear, "2007");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Winter - 2007/i)).toBeInTheDocument; //initially semester is in the document
        screen
            .getAllByRole("button", { name: "Edit Semester", hidden: false })[0]
            .click();
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
        const setSeason = screen.getByLabelText("Season:");
        const setYear = screen.getByLabelText("Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setYear);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Summer" })
        );
        userEvent.type(setYear, "2022");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Summer - 2022/i)).toBeInTheDocument; //initially semester is in the document
        const deleteSem = screen.getAllByRole("button", {
            name: "Delete Semester",
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
        const setSeason = screen.getByLabelText("Season:");
        const setYear = screen.getByLabelText("Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setYear);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Winter" })
        );
        userEvent.type(setYear, "2021");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Winter - 2021/i)).toBeInTheDocument; //initially semester is in the document
        screen
            .getAllByRole("button", { name: "Edit Semester", hidden: false })[0]
            .click();
        //edit semester
        const setYear2 = screen.getByLabelText("Year:");
        userEvent.clear(setYear2);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Fall" })
        );
        userEvent.type(setYear2, "2015");
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
        const setSeason = screen.getByLabelText("Season:");
        const setYear = screen.getByLabelText("Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setYear);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Winter" })
        );
        userEvent.type(setYear, "2021");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Winter - 2021/i)).toBeInTheDocument; //initially semester is in the document
        screen
            .getAllByRole("button", { name: "Edit Semester", hidden: false })[0]
            .click();
        //edit semester
        const setYear2 = screen.getByLabelText("Year:");
        userEvent.clear(setYear2);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Fall" })
        );
        userEvent.type(setYear2, "2015");
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
        const setSeason = screen.getByLabelText("Season:");
        const setYear = screen.getByLabelText("Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setYear);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Winter" })
        );
        userEvent.type(setYear, "2021");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Winter - 2021/i)).toBeInTheDocument; //initially semester is in the document
        screen
            .getAllByRole("button", { name: "Edit Semester", hidden: false })[0]
            .click();
        //edit semester but click cancel and ensure change doesnt occur
        const setYear2 = screen.getByLabelText("Year:");
        userEvent.clear(setYear2);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Spring" })
        );
        userEvent.type(setYear2, "2015");
        screen.getByRole("button", { name: "Cancel", hidden: false }).click(); //cancel, so the semester should not change
        const editedSem = screen.queryAllByText(/Spring - 2015/);
        expect(editedSem[0]).not.toBeInTheDocument; //new edited semester is visible
    });
    test("Can delete all semesters", () => {
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 8");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 8");
        const newSemester = screen.getByTestId("InsertSemesterTest Plan 8");
        //make a new semester
        newSemester.click();
        const setSeason = screen.getByLabelText("Season:");
        const setYear = screen.getByLabelText("Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setYear);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Winter" })
        );
        userEvent.type(setYear, "2021");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Winter - 2021/i)).toBeInTheDocument; //initially semester is in the document
        const newSemester2 = screen.getByTestId("InsertSemesterTest Plan 8");
        newSemester2.click();
        //make a new semester
        const setSeason2 = screen.getByLabelText("Season:");
        const setYear2 = screen.getByLabelText("Year:");
        expect(setSeason2).toBeInTheDocument;
        expect(setYear2).toBeInTheDocument;
        userEvent.clear(setYear2);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Fall" })
        );
        userEvent.type(setYear2, "2021");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Fall - 2021/i)).toBeInTheDocument; //initially semester is in the document
        const deleteAllSem = screen.getByRole("button", {
            name: "Delete All Semesters",
            hidden: false
        });
        deleteAllSem.click();
        expect(
            screen.queryAllByRole("heading", {
                name: /Winter - 2021/,
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
        const setSeason = screen.getByLabelText("Season:");
        const setYear = screen.getByLabelText("Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setYear);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Spring" })
        );
        userEvent.type(setYear, "2023");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Spring - 2023/i)).toBeInTheDocument; //initially semester is in the document
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
        const setSeason = screen.getByLabelText("Season:");
        const setYear = screen.getByLabelText("Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setYear);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Winter" })
        );
        userEvent.type(setYear, "2022");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Winter - 2022/i)).toBeInTheDocument; //initially semester is in the document
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
        const editButton = screen.getAllByTestId("edit-course-btn");
        expect(editButton).toBeInTheDocument;
        editButton[editButton.length - 1].click();
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
        const setSeason = screen.getByLabelText("Season:");
        const setYear = screen.getByLabelText("Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setYear);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Summer" })
        );
        userEvent.type(setYear, "2001");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Summer - 2001/i)).toBeInTheDocument; //initially semester is in the document
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
        const editButton = screen.getAllByTestId("edit-course-btn");
        expect(editButton).toBeInTheDocument;
        editButton[editButton.length - 1].click();
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
        expect(screen.getByText(/✅/i)).toBeInTheDocument;
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
        //testing edit plan cancel button
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
        const setSeason = screen.getByLabelText("Season:");
        const setYear = screen.getByLabelText("Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setYear);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Winter" })
        );
        userEvent.type(setYear, "2021");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Winter - 2021/i)).toBeInTheDocument; //initially semester is in the document
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
    test("Can reset a course to default", () => {
        //add a course with a code matching one in the catalog
        //then hit reset to default button and ensure the course matches the catalog
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 17");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 17");
        const newSemesters = screen.getAllByTestId(
            "InsertSemesterTest Plan 17"
        );
        const newSemester = newSemesters[0]; //if the tests mysteriously break this is the reason
        //make a new semester
        newSemester.click();
        const setSeason = screen.getByLabelText("Season:");
        const setYear = screen.getByLabelText("Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setYear);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Winter" })
        );
        userEvent.type(setYear, "2026");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Winter - 2026/i)).toBeInTheDocument; //initially semester is in the document
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
        userEvent.type(setCode, "CHEM 331");
        userEvent.type(setTitle, "orgo");
        userEvent.type(setDes, "incorrect description");
        userEvent.type(setCredits[0], "17");
        const saveButton = screen.getAllByRole("button", {
            name: "Save",
            hidden: false
        });
        saveButton[saveButton.length - 1].click();
        // press reset to default button
        const defaultButton = screen.getAllByTestId("reset-btn");
        expect(defaultButton).toBeInTheDocument;
        defaultButton[defaultButton.length - 1].click();
        expect(screen.getAllByText(/3 credits/i)).toBeInTheDocument;
        expect(screen.getByText(/CHEM 331/i)).toBeInTheDocument;
        expect(screen.getByText(/Organic Chemistry/i)).toBeInTheDocument;
        //these are the default values for CHEM 331
    });
    test("Delete all semesters button works", () => {
        //make a new plan
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 18");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 18");
        const newSemesters = screen.getAllByTestId(
            "InsertSemesterTest Plan 18"
        );
        const newSemester = newSemesters[0]; //if the tests mysteriously break this is the reason
        //make a new semester
        newSemester.click();
        const setSeason = screen.getByLabelText("Season:");
        const setYear = screen.getByLabelText("Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setYear);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Winter" })
        );
        userEvent.type(setYear, "2021");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Winter - 2021/i)).toBeInTheDocument; //initially semester is in the document
        //add another semester
        newSemester.click();
        const setSeason2 = screen.getByLabelText("Season:");
        const setYear2 = screen.getByLabelText("Year:");
        expect(setSeason2).toBeInTheDocument;
        expect(setYear2).toBeInTheDocument;
        userEvent.clear(setYear2);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Spring" })
        );
        userEvent.type(setYear2, "2029");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Spring - 2029/i)).toBeInTheDocument; //initially semester is in the document
        //checked that both courses appeared- now can delete them
        screen
            .getAllByRole("button", {
                name: "Delete All Semesters",
                hidden: false
            })[0]
            .click();
        //after clicking delete all semesters button, neither semester should be present anymore
        expect(screen.queryByText(/Spring - 2029/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Winter - 2021/i)).not.toBeInTheDocument();
    });
    test("Can make and fulfill preRequisites", () => {
        //make a new plan
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 20");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 20");
        const newSemesters = screen.getAllByTestId(
            "InsertSemesterTest Plan 20"
        );
        const newSemester = newSemesters[0]; //if the tests mysteriously break this is the reason
        //make a new semester
        newSemester.click();
        const setSeason = screen.getByLabelText("Season:");
        const setYear = screen.getByLabelText("Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setYear);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Winter" })
        );
        userEvent.type(setYear, "2021");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Winter - 2021/i)).toBeInTheDocument; //initially semester is in the document
        //Add a course
        const insertButton = screen.queryAllByRole("button", {
            name: "Insert Course",
            hidden: false
        });
        expect(insertButton).toBeInTheDocument;
        insertButton[0].click();
        const setCode = screen.getByLabelText("Code:");
        userEvent.type(setCode, "CISC 100");
        const saveButton = screen.getAllByRole("button", {
            name: "Save",
            hidden: false
        })[0];
        saveButton.click();
        //add another semester
        newSemester.click();
        const setSeason2 = screen.getByLabelText("Season:");
        const setYear2 = screen.getByLabelText("Year:");
        expect(setSeason2).toBeInTheDocument;
        expect(setYear2).toBeInTheDocument;
        userEvent.clear(setYear2);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Spring" })
        );
        userEvent.type(setYear2, "2029");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Spring - 2029/i)).toBeInTheDocument;
        //Add second course
        const insertButton2 = screen.queryAllByRole("button", {
            name: "Insert Course",
            hidden: false
        });
        expect(insertButton2).toBeInTheDocument;
        insertButton[insertButton.length - 1].click();
        const setCode2 = screen.getByLabelText("Code:");
        const typePreReqs = screen.getAllByPlaceholderText("New PreReq")[0];
        const enterPreReqs = screen.getAllByText("Add PreReq")[0];
        userEvent.type(setCode2, "CHEM 331");
        userEvent.type(typePreReqs, "CISC 100");
        enterPreReqs.click();
        const saveButton2 = screen.getAllByRole("button", {
            name: "Save",
            hidden: false
        })[0];
        saveButton2.click();
        expect(/Met? ✅/i).toBeInTheDocument;
    });
    test("Can add course to course pool", () => {
        //make a new plan
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 19");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 19");
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByTestId("department-box"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "ART" })
        );
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByTestId("course-box"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "ART 117" })
        );
        const addBtn = screen.getAllByText("Add Course");
        addBtn[addBtn.length - 1].click();
        expect(screen.queryAllByText(/ART 117/i)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(/3 credits/i)[0]).toBeInTheDocument();
        expect(
            screen.getByText(/Research Studio: Practice and Product/i)
        ).toBeInTheDocument();
    });
    test("Can save data", () => {
        //make a new plan
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 21");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 21");
        const newSemesters = screen.getAllByTestId(
            "InsertSemesterTest Plan 21"
        );
        const newSemester = newSemesters[0]; //if the tests mysteriously break this is the reason
        //make a new semester
        newSemester.click();
        const setSeason = screen.getByLabelText("Season:");
        const setYear = screen.getByLabelText("Year:");
        expect(setSeason).toBeInTheDocument;
        expect(setYear).toBeInTheDocument;
        userEvent.clear(setYear);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Summer" })
    );
        userEvent.type(setYear, "2010");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        expect(screen.getAllByText(/Summer - 2010/i)).toBeInTheDocument; //initially semester is in the document
        screen
            .getAllByRole("button", { name: "Edit Semester", hidden: false })[0]
            .click();
        //edit semester
        const setYear2 = screen.getByLabelText("Year:");
        userEvent.clear(setYear2);
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByLabelText("Season:"),
            // Find and select the Ireland option, like a real user would.
            screen.getByRole("option", { name: "Fall" })
        );
        userEvent.type(setYear2, "2011");
        screen.getByRole("button", { name: "Save", hidden: false }).click();
        const editedSem = screen.queryAllByText(/Fall - 2011/);
        expect(editedSem[0]).toBeInTheDocument; //new edited semester is visible
        screen
            .getByRole("button", { name: "Save Data", hidden: false })
            .click(); //saving semester
        window.location.reload(); //refresh page
        expect(editedSem[0]).toBeInTheDocument; //semester still visible
      });
    test("Welcome message is pulled up when help button is pressed", () => {
        const closeButton = screen.getByRole("button", { name: /close/i });
        closeButton.click(); //close the welcome message
        expect(
            screen.queryByText(/Welcome to our course planner for UD!/i)
        ).not.toBeInTheDocument();
        const helpBtn = screen.getAllByText("Help");
        helpBtn[helpBtn.length - 1].click();
        expect(
            screen.getByText(/Welcome to our course planner for UD!/i)
        ).toBeInTheDocument();
    });
});
