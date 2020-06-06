import React from 'react';
import FormulaItem from './FormulaItem';
import {View, Text} from 'react-native';

const FormulaList = ({formulas, onSelectFormula, onSelectDeleteFormula}) => {
  if (formulas.length > 0) {
    const formulaList = formulas.map((formula, index) => {
      return (
        <FormulaItem
          key={index}
          formula={formula}
          onSelectFormula={onSelectFormula}
          onSelectDeleteFormula={onSelectDeleteFormula}
        />
      );
    });
    return <View>{formulaList}</View>;
  } else {
    return (
      <View style={{alignSelf: 'center', marginTop: 42}}>
        <Text style={{fontSize: 20}}>Please add new formula</Text>
      </View>
    );
  }
};

export default FormulaList;
