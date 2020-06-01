import React from 'react';
import FormulaItem from './FormulaItem';
import {View, Text} from 'react-native';

const FormulaList = ({formulas, onSelectFormula}) => {
  if (formulas.length > 0) {
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
  } else {
    return (
      <View>
        <Text>Please add new formula</Text>
      </View>
    );
  }

  return <View>{formulaList}</View>;
};

export default FormulaList;
