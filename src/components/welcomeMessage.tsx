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
                </Modal.Body>
            </Modal>
        </div>
    );
}
