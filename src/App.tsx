import React from "react";
import "./App.css";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript - Allie Platchek, Sam
                Bernal, and Anissa Spano
            </header>
            <p>
                Welcome to Team 9 schedule builder! This application has all the
                tools you need to create the perfect college course schedule. To
                get started, ----
            </p>
            <div className="schedule">
                <p>one</p>
                <p>two</p>
                <p>three</p>
            </div>
            <div className="control">
                <p>one</p>
                <p>two</p>
                <p>three</p>
            </div>
        </div>
    );
}

export default App;
