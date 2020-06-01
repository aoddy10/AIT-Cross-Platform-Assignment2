import React from 'react';
import {
  Appbar,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import FormulaList from './FormulaList';
import AddFormula from './AddFormular';
import Formula from './Formula';
import HttpService from '../services/HttpService';

import {displayName as appName} from '../app.json';

class App extends React.Component {
  state = {
    formulas: [],
    selectedFormula: '',
    showFormulaList: true,
    showAddFormula: false,
    showFormula: false,
  };

  theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      accent: 'yellow',
    },
  };

  storeData = async value => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
    } catch (e) {
      // saving error
    }
  };

  async componentDidMount() {
    let result = await HttpService.get('/formula/all');
    // check response data
    if (result.status !== 200 || !result.data) return;
    this.setState({formulas: result.data});

    // save to local storage
    this.storeData(result.data);
  }

  onAddNewFormula = async newFormula => {
    // check if user click cancel in add new formular component
    if (!newFormula) {
      this.onShowFormulaList();
      return;
    }

    // add new formula
    let result = await HttpService.post('/addNewFormula', newFormula)
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
    // check if http request is successful
    if (result.status !== 200) {
      // TODO: display error toast
      return;
    }

    // update formula in state
    let tempFormulaArray = this.state.formulas;
    tempFormulaArray.push(newFormula);
    this.setState({formulas: tempFormulaArray});

    // save in local storage
    this.storeData(this.state.formulas);

    // refresh formula list
    this.onShowFormulaList();
  };

  onShowFormulaList = () => {
    this.setState({
      showFormulaList: true,
      showAddFormula: false,
      showFormula: false,
    });
  };

  onSelectFormula = async formula => {
    this.setState({selectedFormula: formula});

    this.setState({
      showFormula: true,
      showFormulaList: false,
    });
  };

  handleShowAddFormula = async () => {
    await this.setState({
      showFormulaList: false,
      showAddFormula: true,
    });
  };

  render() {
    return (
      <PaperProvider theme={this.theme}>
        <Appbar.Header>
          <Appbar.Content title="myFormula" />
        </Appbar.Header>

        <View style="container-fluid p-4">
          <Text>{appName}</Text>
          {this.state.showFormulaList ? (
            <View>
              <FormulaList
                formulas={this.state.formulas}
                onSelectFormula={this.onSelectFormula}
              />
              <Button
                onPress={this.handleShowAddFormula}
                title="Add new formula"
              />
            </View>
          ) : null}

          {this.state.showAddFormula ? (
            <AddFormula onAddNewFormula={this.onAddNewFormula} />
          ) : null}

          {this.state.showFormula ? (
            <Formula
              formula={this.state.selectedFormula}
              onClose={this.onShowFormulaList}
            />
          ) : null}
        </View>
      </PaperProvider>
    );
  }
}

export default App;
