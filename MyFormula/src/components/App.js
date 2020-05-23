import React from "react";
import "./App.css";
import FormulaList from "./FormulaList";

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <h1 className="text-center">iFormula</h1>
                <FormulaList />
                <button
                    type="button"
                    className="btn btn-primary w-100 mt-2 mb-2 p-2"
                >
                    <span className="mr-2">
                        <i className="far fa-plus-square"></i>
                    </span>
                    Add new formula
                </button>
            </div>
        );
    }
}

export default App;
