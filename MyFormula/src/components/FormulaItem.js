import React from "react";

const FormulaItem = ({ formula }) => {
    return (
        <div className="card bg-white mb-2">
            <div className="card-header bg-primary text-white">
                {formula.name}
            </div>
            <div className="card-body">
                <h5 className="card-title">{formula.equation}</h5>
                <p className="card-text">{formula.description}</p>
            </div>
        </div>
    );
};

export default FormulaItem;
