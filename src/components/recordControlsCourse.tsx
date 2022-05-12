import React from "react";
import { Button, Col } from "react-bootstrap";

export function RecordControlsCourse({
    changeEditing
}: {
    changeEditing: () => void;
}): JSX.Element {
    return (
        <Col>
            <Button
                className="edit-course-btn"
                size="sm"
                onClick={changeEditing}
                data-testid="edit-course-btn"
            >
                &#9998; Edit Course
            </Button>
        </Col>
    );
}
