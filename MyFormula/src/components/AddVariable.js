import React from "react";

class AddVariable extends React.Component {
    state = {
        letter: "",
        meaning: "",
        value: "",
    };

    // handle input text
    handleLetter = (event) => {
        this.setState({ letter: event.target.value });
    };
    handleDescription = (event) => {
        this.setState({ meaning: event.target.value });
    };

    onClickAddVariable = (event) => {
        event.preventDefault();

        // send back variable
        this.props.onAddNewVariable(this.state);

        // reset variable
        this.setState({ letter: "", meaning: "", value: "" });
    };

    render() {
        return (
            <div>
                <div className="d-flex flex-col mb-2">
                    <input
                        className="col-3 form-control"
                        type="text"
                        id="letter"
                        value={this.state.letter}
                        onChange={this.handleLetter}
                        placeholder="Var"
                    />
                    <input
                        className="col-9 form-control"
                        type="text"
                        id="description"
                        value={this.state.meaning}
                        onChange={this.handleDescription}
                        placeholder="Description"
                    />
                </div>
                <button
                    className="btn btn-primary w-100"
                    onClick={this.onClickAddVariable}
                    disabled={
                        this.state.letter === "" || this.state.meaning === ""
                    }
                >
                    Add Variable
                </button>
            </div>
        );
    }
}

export default AddVariable;
