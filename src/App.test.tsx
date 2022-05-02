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
        const enterId = screen.getByLabelText("Plan Title:");
        userEvent.type(enterId, "6"); //get rid of this when ids become automatic
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
        userEvent.type(enterTitle, "Test Plan 1");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 1");
        expect(screen.getByRole("option", { name: "Test Plan 1" }).ariaSelected)
            .toBeTruthy;
        expect(screen.queryAllByText("Test Plan 1").length).toBe(2);
    });
    test("Insert Semester works", () => {
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterId = screen.getByLabelText("Plan Title:");
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
        userEvent.type(enterTitle, "Test Plan 1");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 1");
        const newSemesters = screen.getAllByTestId("InsertSemesterTest Plan 1");
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
        userEvent.type(enterTitle, "Test Plan 1");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 1");
        const newSemesters = screen.getAllByTestId("InsertSemesterTest Plan 1");
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
        userEvent.type(enterTitle, "Test Plan 1");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 1");
        const newSemesters = screen.getAllByTestId("InsertSemesterTest Plan 1");
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
        userEvent.type(enterTitle, "Test Plan 1");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 1");
        const newSemesters = screen.getAllByTestId("InsertSemesterTest Plan 1");
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
    test("Can insert a course", () => {
        //NOTE: this one is not working yet
        //make a new plan
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        const enterTitle = screen.getByLabelText("Plan Title:");
        userEvent.type(enterTitle, "Test Plan 2");
        const save = screen.getByText("Save");
        save.click();
        const drop = screen.getByTestId("PlanSelect");
        userEvent.selectOptions(drop, "Test Plan 2");
        const newSemesters = screen.getAllByTestId("InsertSemesterTest Plan 2");
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
        //add course
        const insertButton = screen.queryAllByRole("button", {
            name: "Insert Course",
            hidden: false
        });
        expect(insertButton).toBeInTheDocument;
        insertButton[0].click();
        const setCode = screen.getByLabelText("Course Code: ");
        const setTitle = screen.getByLabelText("Course Title: ");
        const setDes = screen.getByLabelText("Course Description: ");
        const setCredits = screen.getByLabelText("Credits: ");
        userEvent.type(setCode, "CHEM331");
        userEvent.type(setTitle, "Organic Chemsitry");
        userEvent.type(setDes, "Introduction to organic chemistry principles");
        userEvent.type(setCredits, "3");
        //need to finish this test
        expect(screen.getByText("CHEM331")).toBeInTheDocument;
        expect(screen.getByText("Organic Chemsitry")).toBeInTheDocument;
        expect(screen.getByText("Introduction to organic chemistry principles"))
            .toBeInTheDocument;
        expect(screen.getAllByText("3 credits")).toBeInTheDocument;
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
