import React from "react";
export default { title: 'utils.simple_form' };
// change this to solver you want to debug
import {Solver} from 'compile/dummy';

class DebugForm extends React.Component<{}, {
    text: string
}> {

    solver: Solver;

    constructor(props: {}) {
        super(props);
        this.solver = new Solver();
        this.state = {
            text: ''
        };
    }

    changeText = (text: string) => {
        this.setState({text});
    }

    solve = () => {
        const input = this.solver.parse(this.state.text);
        const output = this.solver.solve(input);
        this.solver.print(output);
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

export const DebugFormStory = () => (
    <DebugForm />
);