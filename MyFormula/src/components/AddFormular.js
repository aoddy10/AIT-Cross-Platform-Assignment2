import React from "react";

class AddFormula extends React.Component {
    state = { name: "", description: "", equation: "" };

    handleName = (event) => this.setState({ name: event.target.value });
    handleDescription = (event) =>
        this.setState({ description: event.target.value });
    handleEquation = (event) => this.setState({ equation: event.target.value });

    onClickSave = (event) => {
        event.preventDefault();

        this.props.onAddNewFormula(this.state);
    };

    onClickCancel = (event) => {
        event.preventDefault();
        this.props.onAddNewFormula(null);
    };

    render() {
        return (
            <div className="card p-4 shadow">
                <h4>Add New Formular</h4>
                <form className="needs-validation" noValidate>
                    <div className="form-row">
                        <div className="mb-3">
                            <label htmlFor="name">Formular Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Formula name"
                                onChange={this.handleName}
                                value={this.state.name}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                placeholder="Description"
                                onChange={this.handleDescription}
                                value={this.state.description}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="equation">Equation</label>
                            <input
                                type="text"
                                className="form-control"
                                id="equation"
                                placeholder="Equation"
                                onChange={this.handleEquation}
                                value={this.state.equation}
                                required
                            />
                        </div>

                        <div className="mb-3 d-flex flex-column">
                            <button
                                type="button"
                                className="btn btn-success mt-2 mb-2 p-2"
                                variant="primary"
                                onClick={this.handleShowAddFormula}
                            >
                                <span className="mr-2">
                                    <i className="far fa-plus-square"></i>
                                </span>
                                Add variable
                            </button>

                            <div>Variable</div>

                            <div className="p-2"></div>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="col-6 p-1">
                            <button
                                className="btn btn-primary w-100"
                                onClick={this.onClickSave}
                                disabled={
                                    this.state.name === "" ||
                                    this.state.equation === ""
                                }
                            >
                                Save
                            </button>
                        </div>

                        <div className="col-6 p-1">
                            <button
                                className="btn btn-secondary w-100"
                                onClick={this.onClickCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddFormula;
