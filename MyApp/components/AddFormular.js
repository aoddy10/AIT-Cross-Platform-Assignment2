import React from 'react';
import AddVariable from './AddVariable';
import {View, Text, TextInput, Button} from 'react-native';

class AddFormula extends React.Component {
  state = {
    name: '',
    description: '',
    equation: '',
    variables: [],
    valiableList: '',
  };

  onClickSave = event => {
    event.preventDefault();

    this.props.onAddNewFormula({
      name: this.state.name,
      description: this.state.description,
      equation: this.state.equation,
      variables: this.state.variables,
    });
  };

  onAddNewVariable = async variable => {
    // add new variable to formula
    let tempArray = this.state.variables;
    tempArray.push(variable);
    this.setState({variables: tempArray});

    // generate valiable list
    let tempVariableList = this.state.variables.map((variable, index) => {
      return (
        <Text key={index}>
          {variable.letter} : {variable.meaning}
        </Text>
      );
    });

    // update variable list
    this.setState({
      variableList: tempVariableList,
    });
  };

  render() {
    return (
      <View className="card p-4 shadow">
        <Text className="">Add New Formular</Text>
        <View className="form-row">
          <View className="mb-3">
            <Text>Formular Name</Text>
            <TextInput
              id="name"
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={text => this.setState({name: text})}
              value={this.state.name}
              placeholder="Formula name"
            />
          </View>
          <View className="mb-3">
            <Text>Description</Text>
            <TextInput
              className="form-control"
              style={{height: 100, borderColor: 'gray', borderWidth: 1}}
              onChangeText={text => this.setState({description: text})}
              value={this.state.description}
              placeholder="Description"
            />
          </View>

          <View className="mb-3">
            <Text>Equation</Text>
            <TextInput
              id="equation"
              className="form-control"
              onChangeText={text => this.setState({equation: text})}
              value={this.state.equation}
              placeholder="Equation"
            />
          </View>

          <View className="mb-3 d-flex flex-column">
            <Text>Variables</Text>

            <Text>{this.state.variableList}</Text>

            <AddVariable onAddNewVariable={this.onAddNewVariable} />
          </View>
        </View>

        <View className="d-flex">
          <View className="col-6 p-1">
            <Button
              className="btn btn-primary w-100"
              onPress={this.onClickSave}
              title="Save"
              disabled={this.state.name === '' || this.state.equation === ''}
            />
          </View>

          <View className="col-6 p-1">
            <Button
              className="btn btn-secondary w-100"
              onPress={() => this.props.onAddNewFormula(null)}
              title="Cancel"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default AddFormula;
