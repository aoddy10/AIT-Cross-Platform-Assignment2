import React from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';

class FormulaVariable extends React.Component {
  state = {
    letter: this.props.variable.letter,
    meaning: this.props.variable.meaning,
    value: '',
  };

  handleValue = async value => {
    await this.setState({value: value});

    this.props.onUpdateVariable(this.state);
  };

  render() {
    return (
      <View style={{marginBottom: 8}}>
        <Text className="w-auto mb-2">
          {this.state.letter} : {this.state.meaning}
        </Text>

        <TextInput
          id="equation"
          onChangeText={text => this.handleValue(parseInt(text) || '')}
          value={this.state.equation}
          mode="outlined"
          keyboardType="number-pads"
        />
      </View>
    );
  }
}

export default FormulaVariable;
