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
                Edit <code>src/App.tsx</code> and save. This page will
                automatically reload.
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
