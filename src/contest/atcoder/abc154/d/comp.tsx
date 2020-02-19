import React from "react";
import {Solver, Input, Output} from "./solve";

const solver = new Solver();

type State = Input & Output & {
    input: string,
};

type Props = {
}

export class ProblemD extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            dice: [1],
            K: 1,
            answer: -1,
            input: '',
        };
    }

    solve = () => {
        const {dice, K} = this.state;
        const {answer} = solver.solve({dice, K});
        this.setState({
            answer
        });
    }

    updateK = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            K: parseInt(e.target.value)
        });
    }

    addDice = () => {
        this.setState(({dice}) => ({
            dice: [...dice, 1]
        }));
    }

    changeDice = (idx: number, value: number) => {
        this.setState(({dice}) => {
            dice = [...dice];
            dice[idx] = value;
            return {dice};
        });
    }

    updateInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            input: e.target.value
        });
    }

    parseInput = () => {
        const parsedData = solver.parse(this.state.input);
        console.log(parsedData);
        this.setState({...parsedData});
    }

    render() {
        const {dice, K, answer,input} = this.state;
        return(<div>
            <div>Answer: {answer} <button onClick={this.solve}>solve</button></div>
            <div><button onClick={this.addDice}>Add</button></div>
            <div>K:<input 
            type="number" min={1} max={dice.length} value={K}
            onChange={this.updateK}
            /></div>
            <div>
                {dice.map((die: number, idx: number) => (
                    <input type="number"
                    key={idx}value={die} min={1} max={1000}
                    onChange={(e) => this.changeDice(idx, parseInt(e.target.value))}
                    />
                ))}
            </div>
            <div>
            <div><textarea onChange={this.updateInput} value={input} /></div>
            <div><button onClick={this.parseInput}>parse</button></div>
            </div>
        </div>);
    }
}