import React from "react";
import {SolverBase} from "shared/solve";

export class DebugForm<I, O> extends React.Component<{
    solver: SolverBase<I, O>,
}, {
    text: string
}> {
    constructor(props: {solver: SolverBase<I, O>,}) {
        super(props);
        this.state = {
            text: ''
        };
    }

    changeText = (text: string) => {
        this.setState({text});
    }

    solve = () => {
        const {solver} = this.props;
        const input = solver.parse(this.state.text);
        const output = solver.solve(input);
        solver.print(output);
    }

    render() {
        return (
            <div>
                <textarea
                    onChange={(e) => this.changeText(e.target.value)}
                    value={this.state.text}
                >
                </textarea>
                <button onClick={this.solve}>Solve</button>
            </div>
        );
    }
}