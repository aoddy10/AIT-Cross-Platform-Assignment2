import React from "react";
import FormulaVariable from "./FormulaVariable";
var Parser = require("expr-eval").Parser;

class Formula extends React.Component {
    state = {
        name: "",
        description: "",
        equation: "",
        variables: [],
        answer: "?",
        variableList: "",
    };

    async componentDidMount() {
        await this.setState({
            name: this.props.formula.name,
            description: this.props.formula.description,
            equation: this.props.formula.equation,
            variables: this.props.formula.variables,
        });

        let variableList = this.state.variables.map((variable, index) => {
            return (
                <FormulaVariable
                    key={index}
                    variable={variable}
                    onUpdateVariable={this.onUpdateVariable}
                />
            );
        });
        this.setState({ variableList: variableList });
    }

    onUpdateVariable = (varible) => {
        // update value for variable
        let variables = this.state.variables;
        let i = variables.findIndex((item) => {
            return item.letter === varible.letter;
        });
        variables[i].value = varible.value;

        // create source for calulate
        let calSource = "{";
        variables.forEach((item) => {
            if (calSource !== "{") calSource += ",";
            calSource += '"' + item.letter + '":';
            if (item.value === "") calSource += 0;
            else calSource += item.value;
        });
        calSource += "}";
        calSource = JSON.parse(calSource);

        // calculate answer
        let answer = Parser.evaluate(this.state.equation, calSource);

        this.setState({ variables: variables, answer: answer });
    };

    render() {
        return (
            <div className="card bg-white mb-3 shadow round">
                <h5 className="card-header bg-secondary text-white">
                    {this.state.name}
                </h5>
                <div className="card-body">
                    <div>{this.state.description}</div>
                    <div className="mt-4 mb-4 bg-light p-2">
                        <span>Equation</span>
                        <h2>
                            {this.state.equation} = {this.state.answer}
                        </h2>
                    </div>

                    <div>{this.state.variableList}</div>
                </div>
                <div className="btn btn-primary" onClick={this.props.onClose}>
                    Close
                </div>
            </div>
        );
    }
}

export default Formula;
