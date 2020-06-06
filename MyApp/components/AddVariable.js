import React from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

class AddVariable extends React.Component {
  state = {
    letter: '',
    meaning: '',
    value: 0,
  };

  onClickAddVariable = () => {
    // send back variable
    this.props.onAddNewVariable(this.state);

    // reset variable
    this.setState({letter: '', meaning: '', value: 0});
  };

  render() {
    return (
      <View>
        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 8}}>
          <TextInput
            label="Variable"
            id="letter"
            onChangeText={text => this.setState({letter: text})}
            value={this.state.letter}
            mode="outlined"
            style={{flex: 0.3}}
          />

          <TextInput
            id="description"
            onChangeText={text => this.setState({meaning: text})}
            value={this.state.meaning}
            label="Description"
            mode="outlined"
            style={{flex: 0.7}}
          />
        </View>

        <Button
          mode="contained"
          onPress={this.onClickAddVariable}
          disabled={this.state.letter === '' || this.state.meaning === ''}>
          Add
        </Button>
      </View>
    );
  }
}

export default AddVariable;
