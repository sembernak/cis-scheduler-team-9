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
    test("Clicking New Plan gives a form to enter a title", () => {
        const createNew = screen.getByTestId("NewPlan");
        createNew.click();
        expect(screen.getByLabelText("Plan Title:")).toBeInTheDocument();
        const enterId = screen.getByLabelText("Plan Id:");
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
        const enterId = screen.getByLabelText("Plan Id:");
        userEvent.type(enterId, "6"); //get rid of this when ids become automatic
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
