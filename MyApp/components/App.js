import React from 'react';
import {
  Appbar,
  Badge,
  DefaultTheme,
  Provider as PaperProvider,
  Avatar,
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
      showFormula: false,
    });
  };

  render() {
    return (
      <PaperProvider theme={this.theme}>
        <Appbar.Header>
          <Appbar.Content title={appName} />
          <Badge
            visible={
              this.state.formulas.length && this.state.formulas.length > 0
            }
            size={16}
            style={{position: 'absolute', top: 5, right: 5}}>
            {this.state.formulas.length}
          </Badge>
          <Appbar.Action
            icon={'plus'}
            onPress={() => this.handleShowAddFormula()}
          />
          <Appbar.Action
            icon={
              this.state.formulas.length ? 'dots-horizontal' : 'dots-vertical'
            }
          />
        </Appbar.Header>

        <View style={styles.container}>
          {this.state.showFormulaList ? (
            <FormulaList
              formulas={this.state.formulas}
              onSelectFormula={this.onSelectFormula}
            />
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

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  addSection: {},
});

export default App;
