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
                className="default-button"
                size="sm"
                onClick={changeEditing}
            >
                Edit Course
            </Button>
        </div>
    );
}
