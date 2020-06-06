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
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from '@react-native-community/async-storage';

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
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('myFormula', jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('myFormula');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    await HttpService.get('/formula/all')
      .then(response => {
        console.log('load data from server...');
        this.setState({formulas: response.data});
        // save to local storage
        this.storeData(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    return;
  }

  onAddNewFormula = async newFormula => {
    // check if user click cancel in add new formular component
    if (!newFormula) {
      this.onShowFormulaList();
      return;
    }

    // add new formula
    let result = await HttpService.post('/formula/addNew', newFormula)
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

  onShowFormulaList = async () => {
    await this.setState({
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

  onDeleteFormula = async formula => {
    // delete in micro service server
    let deleteResult = await HttpService.post('/formula/delete', formula)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });

    if (deleteResult.isError === true) {
      alert(deleteResult.message);
      return;
    }
    // remove formula from state
    const i = this.state.formulas.findIndex(item => item === formula);
    const formulas = this.state.formulas;
    formulas.splice(i, 1);
    this.setState({formulas: formulas});
    // update to local strage
    this.storeData(this.state.formulas);
  };

  confirmToDeleteFormula = formula => {
    const text = 'Formula name: ' + formula.name;
    Alert.alert(
      'Pleaese confirm to delete',
      text,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.onDeleteFormula(formula)},
      ],
      {cancelable: true},
    );
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
      <KeyboardAvoidingView
        style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
        enabled
        keyboardVerticalOffset={20}>
        <ScrollView>
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
                  this.state.formulas.length
                    ? 'dots-horizontal'
                    : 'dots-vertical'
                }
              />
            </Appbar.Header>

            <View style={styles.container}>
              {this.state.showFormulaList ? (
                <FormulaList
                  formulas={this.state.formulas}
                  onSelectFormula={this.onSelectFormula}
                  onSelectDeleteFormula={this.confirmToDeleteFormula}
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
        </ScrollView>
      </KeyboardAvoidingView>
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
