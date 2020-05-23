import React from "react";

class FormulaItem extends React.Component {
    render() {
        return (
            <div className="card bg-white mb-2">
                <div className="card-header bg-primary text-white">
                    Formula Name
                </div>
                <div className="card-body">
                    <h5 className="card-title">Formula</h5>
                    <p className="card-text">Description</p>
                </div>
            </div>
        );
    }
}

export default FormulaItem;
