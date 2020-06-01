import React from 'react';
import {View, Text, Button} from 'react-native';
import FormulaVariable from './FormulaVariable';
var Parser = require('expr-eval').Parser;

class Formula extends React.Component {
  state = {
    name: '',
    description: '',
    equation: '',
    variables: [],
    answer: '?',
    variableList: [],
  };

  async componentDidMount() {
    await this.setState({
      name: this.props.formula.name,
      description: this.props.formula.description,
      equation: this.props.formula.equation,
      variables: this.props.formula.variables,
    });

    let variableList = this.state.variables.map((variable, index) => {
      return (
        <FormulaVariable
          key={index}
          variable={variable}
          onUpdateVariable={this.onUpdateVariable}
        />
      );
    });
    this.setState({variableList: variableList});
  }

  onUpdateVariable = varible => {
    // update value for variable
    let variables = this.state.variables;
    let i = variables.findIndex(item => {
      return item.letter === varible.letter;
    });
    variables[i].value = varible.value;

    // create source for calulate
    let calSource = '{';
    variables.forEach(item => {
      if (calSource !== '{') calSource += ',';
      calSource += '"' + item.letter + '":';
      if (item.value === '') calSource += 0;
      else calSource += item.value;
    });
    calSource += '}';
    calSource = JSON.parse(calSource);

    // calculate answer
    let answer = Parser.evaluate(this.state.equation, calSource);

    this.setState({variables: variables, answer: answer});
  };

  render() {
    return (
      <View className="card bg-white mb-3 shadow round">
        <Text className="card-header bg-secondary text-white">
          {this.state.name}
        </Text>

        <View className="card-body">
          <Text>{this.state.description}</Text>
          <View className="mt-4 mb-4 bg-light p-2">
            <Text>Equation</Text>
            <Text>
              {this.state.equation} = {this.state.answer}
            </Text>
          </View>
        </View>

        <View>{this.state.variableList}</View>

        <Button
          className="btn btn-primary"
          onPress={() => this.props.onClose()}
          title="Close"
        />
      </View>
    );
  }
}

export default Formula;
