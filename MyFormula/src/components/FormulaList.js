import React from "react";
import FormulaItem from "./FormulaItem";

const FormulaList = ({ formulas }) => {
    const formulaList = formulas.map((formula) => {
        return <FormulaItem formula={formula} />;
    });

    return <div>{formulaList}</div>;
};

export default FormulaList;
