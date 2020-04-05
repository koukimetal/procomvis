import {SolverBase} from "shared/solve";
import { getSpaceIterator } from "contest/utils/generators";

export type Input = {
    K: number,
}

export type Output = {
    answer: number[],
}

type Lunlun = {
    num: number[],
}

function rec(l: Lunlun, d: number) {
    if (l.num.length === d) {
        const newNum = new Array(l.num.length + 1);
        newNum.fill(0);
        newNum[newNum.length - 1] = 1;
        l.num = newNum;
    } else if (l.num.length - 1 === d) {// top digit
        if (l.num[d] === 9) { // top is over
            rec(l, d + 1);
        } else {
            l.num[d]++;
        }
    } else {
        if (l.num[d] < 9 && Math.abs((l.num[d] + 1) - l.num[d + 1]) <= 1) {//possible to add
            l.num[d]++;
        } else {
            rec(l, d + 1);
            l.num[d] = Math.max(0, l.num[d + 1] - 1); // smallest possible number to new next digit
        }
    }
}

export class Solver extends SolverBase<Input, Output> {
    solve({K}: Input): Output {
        const lunlun = {num: []};
        for (let k = 0; k < K; k++) {
            rec(lunlun, 0);
        }
        return {answer: lunlun.num};
    }
    parse(text: string) {
        const it = getSpaceIterator(text, val => parseInt(val));
        const K = it.next().value;
        return {K};
    }
    print({answer}: Output) {
        const out = answer.reverse().join('');
        console.log(out);
    }
} 
