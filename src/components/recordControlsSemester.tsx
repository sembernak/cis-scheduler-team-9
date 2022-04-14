import React from "react";
import { Button } from "react-bootstrap";

export function RecordControlsSemester({
    changeEditing
}: {
    changeEditing: () => void;
}): JSX.Element {
    return (
        <div>
            <Button className="float-right" size="sm" onClick={changeEditing}>
                Edit Semester
            </Button>
        </div>
    );
}
