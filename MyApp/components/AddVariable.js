import React from 'react';
import {View, TextInput, Button} from 'react-native';

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
        <View className="d-flex flex-col mb-2">
          <TextInput
            id="letter"
            className="col-3 form-control"
            onChangeText={text => this.setState({letter: text})}
            value={this.state.letter}
            placeholder="Var"
          />
          <TextInput
            id="description"
            className="col-9 form-control"
            onChangeText={text => this.setState({meaning: text})}
            value={this.state.meaning}
            placeholder="Description"
          />
        </View>

        <Button
          className="btn btn-primary w-100"
          onPress={this.onClickAddVariable}
          title="Add Variable"
          disabled={this.state.letter === '' || this.state.meaning === ''}
        />
      </View>
    );
  }
}

export default AddVariable;
