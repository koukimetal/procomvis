
import {SolverBase} from "shared/solve";
import { getSpaceIterator } from "contest/utils/generators";
import BigNumber from "bignumber.js";
// WA. This approach can't handle something like 2 2 -2 -2 3 -3 3 -3

export type Input = {
    N: number,
    K: number,
    A: number[],
}

export type Output = {
    answer: BigNumber,
}

export class Solver extends SolverBase<Input, Output> {

    mul(a: number, b: number) {
        const ba = new BigNumber(a);
        const bb = new BigNumber(b);
        return ba.multipliedBy(bb);
    }

    calcSums(A: number[]) {
        const N = A.length;
        const count = new Array<{pos: number, neg: number, zer: number}>(N);
        count[N - 1] = {pos: 0, neg: 0, zer: 0};
        for (let i = N - 2; i >= 0; i--) {
            const after = count[i + 1];
            count[i] = {...after};
            if (A[i + 1] > 0) {
                count[i].pos++;
            } else if (A[i + 1] < 0) {
                count[i].neg++;
            } else {
                count[i].zer++;
            }
        }
        const sums = new Array<{pos: number, neg: number, zer: number}>(N);
        for (let i = 0; i < N; i++) {
            sums[i] = {pos: 0, neg: 0, zer: 0};
            if (A[i] === 0) {
                sums[i].zer = N - i - 1;
            } else if (A[i] > 0) {
                sums[i].pos = count[i].pos;
                sums[i].neg = count[i].neg;
            } else {
                sums[i].pos = count[i].neg;
                sums[i].neg = count[i].pos;
            }
        }
        return sums;
    }

    solve({N, K, A}: Input): Output {
        A.sort((a, b) => Math.abs(a) - Math.abs(b));
        let sums = this.calcSums(A);

        const numNeg = sums.reduce((a, {neg}) => a + neg, 0);
        const numZer = sums.reduce((a, {zer}) => a + zer, 0);
        if (K <= numNeg) {

            let target = K;
            for (let i = N - 1; i >= 0; i--) {
                if (target <= sums[i].neg) {
                    const ai = A[i] < 0 ? -1 : 1;
                    for (let j = N - 1; j > i; j--) {
                        if (ai * A[j] < 0) {
                            target--;
                        }
                        if (target === 0) {
                            return {answer: this.mul(A[j], A[i])};
                        }
                    }
                } else {
                    target -= sums[i].neg;
                }
            }
        } else if (K <= numNeg + numZer) {
            return {answer: this.mul(0, 1)};
        } else {
            let target = K - numNeg - numZer;
            for (let i = 0; i < N; i++) {
                if (target <= sums[i].pos) {
                    const ai = A[i] < 0 ? -1 : 1;
                    for (let j = i + 1; j < N; j++) {
                        if (ai * A[j] > 0) {
                            target--;
                        }
                        if (target === 0) {
                            return {answer: this.mul(A[j], A[i])};
                        }
                    }
                } else {
                    target -= sums[i].pos;
                }
            }
        }
        return {answer: this.mul(111, 1)};
    }
    parse(text: string) {
        const it = getSpaceIterator(text, val => parseInt(val));
        const N = it.next().value;
        const K = it.next().value;
        const A: number[] = [];
        for (let i = 0; i < N; i++) {
            A.push(it.next().value);
        }
        return {N, K, A};
    }
    print(output: Output) {
        console.log(output.answer.toString());
    }
} 
