import React from "react";
import FormulaItem from "./FormulaItem";

const FormulaList = ({ formulas, onSelectFormula }) => {
    const formulaList = formulas.map((formula, index) => {
        return (
            <FormulaItem
                key={index}
                formula={formula}
                onSelectFormula={onSelectFormula}
            />
        );
    });

    return <div>{formulaList}</div>;
};

export default FormulaList;
