import React from 'react';
import {View, Text, TextInput} from 'react-native';

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
      <View>
        <Text className="w-auto mb-2">
          {this.state.letter} : {this.state.meaning}
        </Text>

        <TextInput
          id="description"
          className="mb-2"
          onChangeText={e => this.handleValue(parseInt(e) || '')}
          value={this.state.value}
          keyboardType="number-pad"
        />
      </View>
    );
  }
}

export default FormulaVariable;
