import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const FormulaItem = ({formula, onSelectFormula}) => {
  return (
    <TouchableOpacity
      className="card bg-white mb-3 shadow round"
      onPress={() => onSelectFormula(formula)}>
      <Text className="card-header bg-primary text-white">{formula.name}</Text>
      <View className="card-body">
        <Text className="card-title ">{formula.equation}</Text>
        <Text className="card-text">{formula.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FormulaItem;
