import React from 'react';
import FormulaItem from './FormulaItem';
import {View} from 'react-native';

const FormulaList = ({formulas, onSelectFormula}) => {
  const formulaList = formulas.map((formula, index) => {
    return (
      <FormulaItem
        key={index}
        formula={formula}
        onSelectFormula={onSelectFormula}
      />
    );
  });

  return <View>{formulaList}</View>;
};

export default FormulaList;
