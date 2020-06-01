import React from 'react';
import {View, Text} from 'react-native';
import {
  Title,
  Caption,
  Paragraph,
  TextInput,
  Subheading,
  Button,
} from 'react-native-paper';
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

  onUpdateVariable = async varible => {
    // update value for variable
    let variables = this.state.variables;
    let i = await variables.findIndex(item => {
      return item.letter === varible.letter;
    });
    variables[i].value = varible.value;

    // create source for calulate
    let calSource = '{';
    await variables.forEach(item => {
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
      <View>
        <Title className="card-header bg-secondary text-white">
          {this.state.name}
        </Title>

        {this.state.description ? (
          <Paragraph style={{marginBottom: 8}}>
            {this.state.description}
          </Paragraph>
        ) : null}

        <View
          style={{
            backgroundColor: '#f0f0f0',
            padding: 8,
            marginBottom: 16,
            marginTop: 16,
          }}>
          <Subheading>Equation</Subheading>
          <Title style={{fontSize: 28}}>
            {this.state.equation} = {this.state.answer}
          </Title>
        </View>

        <View style={{marginBottom: 16}}>{this.state.variableList}</View>

        <Button
          mode="contained"
          onPress={() => {
            this.setState({variables: []});
            this.props.onClose();
          }}
          title="Close">
          Close
        </Button>
      </View>
    );
  }
}

export default Formula;
