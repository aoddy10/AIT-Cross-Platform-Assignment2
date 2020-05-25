import React from "react";
import FormulaList from "./FormulaList";
import AddFormula from "./AddFormular";
import Formula from "./Formula";
import HttpService from "./HttpService";
import { reactLocalStorage } from "reactjs-localstorage";

class App extends React.Component {
    APP_NAME = "MyFormula";

    state = {
        formulas: [],
        selectedFormula: "",
        showFormulaList: true,
        showAddFormula: false,
        showFormula: false,
    };

    async componentDidMount() {
        reactLocalStorage.clear();
        let result = await HttpService.get("/formula/all");
        // check response data
        if (result.status !== 200 || !result.data) return;
        this.setState({ formulas: result.data });

        // save to local storage
        reactLocalStorage.set("formulas", result.data);
    }

    onAddNewFormula = async (newFormula) => {
        // add new formula
        let result = await HttpService.post("/addNewFormula", newFormula)
            .then((response) => {
                return response;
            })
            .catch((error) => {
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
        this.setState({ formulas: tempFormulaArray });

        // save in local storage
        reactLocalStorage.set("formulas", this.state.formulas);

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

    onSelectFormula = async (formala) => {
        this.setState({ selectedFormula: formala });

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
            <div className="container-fluid">
                <h1 className="text-center mt-2">{this.APP_NAME}</h1>
                {this.state.showFormulaList ? (
                    <div>
                        <FormulaList
                            formulas={this.state.formulas}
                            onSelectFormula={this.onSelectFormula}
                        />
                        <button
                            type="button"
                            className="btn btn-success w-100 mt-2 mb-2 p-2"
                            variant="primary"
                            onClick={this.handleShowAddFormula}
                        >
                            <span className="mr-2">
                                <i className="far fa-plus-square"></i>
                            </span>
                            Add new formula
                        </button>
                    </div>
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
            </div>
        );
    }
}

export default App;
