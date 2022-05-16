import React from "react";
import { Modal } from "react-bootstrap";

export function WelcomeMessage({
    show,
    handleClose
}: {
    show: boolean;
    handleClose: () => void;
}): JSX.Element {
    return (
        <div>
            <Modal show={show} animation={false} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Welcome to our course planner for UD!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <header>
                        A default plan is shown. Edit the default plan or add
                        new plan to start from scratch. Add courses from the
                        course pool or create your own from scratch! Use the
                        save button to save your plan between working sessions.
                    </header>
                    <br></br>
                    <header>
                        Your current semesters are shown in chronological order
                        on the left column. Add a new semester and it will
                        automatically be sorted.
                    </header>
                    <br></br>
                    <header>
                        Degree requirements are the first box in the right
                        column. Once a requirment is fufilled by a course in
                        your plan, it will be checked off. If a course fufills a
                        requiremnt, click the edit course button then add the
                        name of the requirement.
                    </header>
                    <br></br>
                    <header>
                        The course pool is below the degree requirements. Add
                        courses from the UD catalog to the pool, then drag them
                        to the desired semester. Note: you cannot have the same
                        course twice in the same semester!
                    </header>
                    <br></br>
                    <header>
                        You can download your plan or reupload it during a new
                        session. Or, just press the save data button to save
                        your changes ever after refreshing the page.
                    </header>
                </Modal.Body>
            </Modal>
        </div>
    );
}
