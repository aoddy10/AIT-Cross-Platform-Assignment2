import React from "react";

const FormulaItem = ({ formula, onSelectFormula }) => {
    return (
        <div
            className="card bg-white mb-3 shadow round"
            onClick={() => onSelectFormula(formula)}
        >
            <h5 className="card-header bg-primary text-white">
                {formula.name}
            </h5>
            <div className="card-body">
                <h3 className="card-title ">{formula.equation}</h3>
                <p className="card-text">{formula.description}</p>
            </div>
        </div>
    );
};

export default FormulaItem;
