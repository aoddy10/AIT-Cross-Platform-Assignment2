import React from "react";
import "./App.css";
import FormulaList from "./FormulaList";

class App extends React.Component {
    API_URL = "http://localhost:5000";
    APP_NAME = "MyFormula";

    constructor(props) {
        super(props);
        this.state = {
            formulas: [],
        };
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

    render() {
        return (
            <div className="container-fluid">
                <h1 className="text-center">{this.APP_NAME}</h1>
                <FormulaList formulas={this.state.formulas} />
                <button
                    type="button"
                    className="btn btn-primary w-100 mt-2 mb-2 p-2"
                >
                    <span className="mr-2">
                        <i className="far fa-plus-square"></i>
                    </span>
                    Add new formula
                </button>
            </div>
        );
    }
}

export default App;
