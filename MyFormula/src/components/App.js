import React from "react";
import FormulaList from "./FormulaList";
import AddFormula from "./AddFormular";

class App extends React.Component {
    API_URL = "http://localhost:5000";
    APP_NAME = "MyFormula";
    APP_DES =
        "This app use for create your own equation that you can add variable as much as you prefer. Also, you can change/edit your equation anytime.";

    constructor(props) {
        super(props);

        this.state = {
            formulas: [],
            showFormulaList: true,
            showAddFormula: false,
        };

        this.handleShowAddFormula = this.handleShowAddFormula.bind(this);
    }

    componentDidMount() {
        fetch(this.API_URL + "/formula/all")
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        formulas: result,
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    onAddNewFormula = (newFormula) => {
        console.log("Add new formula", newFormula);
        this.setState({ showAddFormula: false, showFormulaList: true });
    };

    handleShowAddFormula = async () => {
        await this.setState({ showFormulaList: false, showAddFormula: true });
    };

    render() {
        return (
            <div className="container-fluid">
                <h1 className="text-center mt-2">{this.APP_NAME}</h1>
                <p>{this.APP_DES}</p>
                {this.state.showFormulaList ? (
                    <div>
                        <FormulaList formulas={this.state.formulas} />
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
            </div>
        );
    }
}

export default App;
