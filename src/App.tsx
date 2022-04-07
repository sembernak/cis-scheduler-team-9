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
            <div class="schedule">
                {/*The user's schedule would appear here*/}
            </div>
            <div class="control">
                {/*Import/export and other features would be here*/}
            </div>
        </div>
    );
}

export default App;
