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
                    <Modal.Title>WELCOME MESSAGE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <header>
                        Hello welcome to Christian and Pranavs Website it is
                        currently under construction
                    </header>
                </Modal.Body>
            </Modal>
        </div>
    );
}
