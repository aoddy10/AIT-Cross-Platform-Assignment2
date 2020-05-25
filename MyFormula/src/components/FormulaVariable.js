import React from "react";

class FormulaVariable extends React.Component {
    state = {
        letter: this.props.variable.letter,
        meaning: this.props.variable.meaning,
        value: "",
    };

    handleValue = async (value) => {
        await this.setState({ value: value });

        this.props.onUpdateVariable(this.state);
    };

    render() {
        return (
            <div>
                <div>
                    <span className="w-auto mb-2">
                        {this.state.letter} : {this.state.meaning}
                    </span>
                </div>

                <input
                    type="number"
                    className="mb-2"
                    onChange={(e) =>
                        this.handleValue(parseInt(e.target.value) || "")
                    }
                    value={this.state.value}
                />
            </div>
        );
    }
}

export default FormulaVariable;
