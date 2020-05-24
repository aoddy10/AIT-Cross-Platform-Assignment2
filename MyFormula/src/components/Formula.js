import React from "react";
import FormulaVariable from "./FormulaVariable";

const Formula = ({ formula, onClose }) => {
    let answer = "?";

    const variableList = formula.variables.map((variable, index) => {
        return <FormulaVariable key={index} variable={variable} />;
    });

    return (
        <div className="card bg-white mb-3 shadow round">
            <h5 className="card-header bg-secondary text-white">
                {formula.name}
            </h5>
            <div className="card-body">
                <div>{formula.description}</div>
                <div className="mt-4 mb-4 bg-light p-2">
                    <span>Equation</span>
                    <h2>
                        {formula.equation} = {answer}
                    </h2>
                </div>

                <div>{variableList}</div>
            </div>
            <div className="btn btn-primary" onClick={onClose}>
                Close
            </div>
        </div>
    );
};

export default Formula;
