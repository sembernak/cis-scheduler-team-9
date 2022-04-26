import React from "react";
import { Button } from "react-bootstrap";

export function RecordControlsSemester({
    changeEditing
}: {
    changeEditing: () => void;
}): JSX.Element {
    return (
        <Button className="edit-sem-btn" size="sm" onClick={changeEditing}>
            Edit Semester
        </Button>
    );
}
