import React from "react";

const FormulaVariable = ({ variable }) => {
    return (
        <div>
            <div>
                <span className="w-auto mb-2">
                    {variable.letter} : {variable.meaning}
                </span>
            </div>

            <input type="number" className="mb-2"></input>
        </div>
    );
};

export default FormulaVariable;
