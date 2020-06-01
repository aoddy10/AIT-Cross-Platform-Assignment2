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
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <TextInput
          label="Variable"
          id="letter"
          onChangeText={text => this.setState({letter: text})}
          value={this.state.letter}
          mode="outlined"
          style={{width: 100}}
        />

        <TextInput
          id="description"
          onChangeText={text => this.setState({meaning: text})}
          value={this.state.meaning}
          label="Description"
          mode="outlined"
          style={{width: 'auto'}}
        />

        <Button
          mode="contained"
          onPress={this.onClickAddVariable}
          disabled={this.state.letter === '' || this.state.meaning === ''}
          style={{alignSelf: 'flex-end'}}>
          Add
        </Button>
      </View>
    );
  }
}

export default AddVariable;
