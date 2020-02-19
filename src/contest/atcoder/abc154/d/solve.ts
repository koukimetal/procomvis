
import {SolverBase} from "shared/solve";


export type Input = {
    dice: number[],
    K: number,
}

export type Output = {
    answer: number,
}

export class Solver extends SolverBase<Input, Output> {
    solve({dice, K}: Input): Output {
        let sum = 0;
        let answer = 0;
        for (let i = 0; i < dice.length; i++) {
            sum += dice[i];
            if (i >= K - 1) {
                const calc = (K + sum) / 2;
                answer = Math.max(calc, answer);
                sum -= dice[i - (K - 1)];
            }
        }
        return ({answer});
    }
    parse(text: string) {
        const vals = text.split(/\s+/).map(val => parseInt(val));
        const N = vals[0];
        const K = vals[1];
        const dice: number[] = [];
        for (let i = 0; i < N; i++) {
            dice.push(vals[2 + i]);
        }
        return {K, dice};
    }
    print(output: Output) {
        console.log(output.answer);
    }
} 
