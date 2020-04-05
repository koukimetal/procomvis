import {SolverBase} from "shared/solve";
import { getSpaceIterator } from "contest/utils/generators";

type Ball = {
    num: number,
    color: string,
}

export type Input = {
    N: number,
    balls: Ball[],
}

export type Output = {
    ans: number[],
}

export class Solver extends SolverBase<Input, Output> {
    solve({N, balls}: Input): Output {
        const R = balls.filter(b => b.color === 'R').map(b => b.num);
        const B = balls.filter(b => b.color === 'B').map(b => b.num);
        R.sort((a, b) => a - b);
        B.sort((a, b) => a - b);
        return {ans: [...R, ...B]};
    }
    parse(text: string) {
        const it = getSpaceIterator(text, (s) => s);
        const N = parseInt(it.next().value);
        const balls: Ball[] = [];
        for (let i = 0; i < N; i++) {
            const num = parseInt(it.next().value);
            const color = it.next().value;
            balls.push({num, color});
        }
        return {N, balls};
    }
    print({ans}: Output) {
        for (const num of ans) {
            console.log(num);
        }
    }
} 
