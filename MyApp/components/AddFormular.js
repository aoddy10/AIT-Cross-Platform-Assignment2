import React from 'react';
import AddVariable from './AddVariable';
import {View, Text, StyleSheet} from 'react-native';
import {
  Title,
  Caption,
  Paragraph,
  TextInput,
  Subheading,
  Button,
} from 'react-native-paper';

class AddFormula extends React.Component {
  state = {
    name: '',
    description: '',
    equation: '',
    variables: [],
    valiableList: '',
  };

  onClickSave = () => {
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
      <View>
        <Title>Add New Formular</Title>
        <Subheading>Detail:</Subheading>
        <TextInput
          label="Formula name"
          id="name"
          value={this.state.text}
          onChangeText={text => this.setState({name: text})}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Description"
          id="Description"
          onChangeText={text => this.setState({description: text})}
          value={this.state.description}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Equation"
          id="equation"
          onChangeText={text => this.setState({equation: text})}
          value={this.state.equation}
          mode="outlined"
          style={styles.input}
        />

        <View
          style={{
            borderWidth: 1,
            padding: 8,
            borderColor: '#808080',
            marginBottom: 16,
          }}>
          <Subheading>Variables</Subheading>
          {this.state.variableList ? (
            <View>{this.state.variableList}</View>
          ) : null}

          <AddVariable onAddNewVariable={this.onAddNewVariable} />
        </View>

        <View>
          <Button
            mode="contained"
            onPress={() => this.onClickSave()}
            disabled={this.state.name === '' || this.state.equation === ''}
            style={styles.button}>
            Save
          </Button>

          <Button
            mode="contained"
            onPress={() => this.props.onAddNewFormula(null)}
            style={styles.button}>
            Cancel
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 8,
  },
  button: {
    marginBottom: 8,
  },
});

export default AddFormula;
