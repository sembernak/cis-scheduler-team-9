import React from "react";
import { Button } from "react-bootstrap";

export function RecordControlsCourse({
    changeEditing
}: {
    changeEditing: () => void;
}): JSX.Element {
    return (
        <div>
            <Button
                className="edit-course-btn"
                size="sm"
                onClick={changeEditing}
            >
                &#9998; Edit Course
            </Button>
        </div>
    );
}
