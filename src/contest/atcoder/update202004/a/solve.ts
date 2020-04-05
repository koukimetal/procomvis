import {SolverBase} from "shared/solve";
import { getSpaceIterator } from "contest/utils/generators";

export type Input = {
    S: number,
    L: number,
    R: number,
}

export type Output = {
    ans: number,
}

export class Solver extends SolverBase<Input, Output> {
    solve({S, L, R}: Input): Output {
        let ans = -1;
        if (S < L) {
            ans = L;
        } else if (R < S) {
            ans = R;
        } else {
            ans = S;
        }
        return {ans};
    }
    parse(text: string) {
        const it = getSpaceIterator(text, val => parseInt(val));
        const S = it.next().value;
        const L = it.next().value;
        const R = it.next().value;

        return {S, L, R};
    }
    print({ans}: Output) {
        console.log(ans);
    }
} 
