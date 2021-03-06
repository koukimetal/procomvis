import {SolverBase} from "shared/solve";
import { getSpaceIterator } from "contest/utils/generators";
import Long from 'long';
// TLE
export type Input = {
    N: number,
    K: number,
    A: number[],
}

export type Output = {
    answer: Long,
}

export class Solver extends SolverBase<Input, Output> {
    solve({N, K, A}: Input): Output {
        A.sort((a, b) => a - b);
        const BA = new Array<Long>(N);
        for (let i = 0; i < N; i++) {
            BA[i] = Long.fromNumber(A[i]);
        }

        let neg = 0, pos = 0, zer = 0;
        for (let i = 0; i < N; i++) {
            if (A[i] < 0) {
                neg++;
            } else if (A[i] > 0) {
                pos++;
            } else {
                zer++;
            }
        }

        const NC = neg * pos;
        const ZC = zer * (pos + neg) + (zer * (zer - 1)) / 2;

        const TWO = Long.fromNumber(2);
        // the highest number having less than K numbers
        let low = Long.fromString("-1000000000000000005");
        let high = Long.fromString("1000000000000000005");

        while (high.sub(low).gt(Long.ONE)) {
            const mid = high.add(low).divide(TWO);
            let count = 0; // how many numbers are less than mid.
            if (mid.lt(Long.ZERO)) {
                for (let i = 0; i < N; i++) {
                    if (A[i] >= 0) {
                        break;
                    }
                    let lowIndex = neg + zer - 1;
                    let highIndex = N;
                    while (highIndex - lowIndex > 1) {
                        const midIndex = (lowIndex + highIndex) / 2 | 0;
                        if (BA[i].multiply(BA[midIndex]).lt(mid)) {
                            highIndex = midIndex;
                        } else {
                            lowIndex = midIndex;
                        }
                    }
                    count += (N - highIndex);
                }
            } else if (mid.gt(Long.ZERO)) {
                count += NC + ZC;
                for (let i = 0; i < N; i++) {
                    if (A[i] < 0) {
                        let lowIndex = i;
                        let highIndex = neg;
                        while (highIndex - lowIndex > 1) {
                            let midIndex = (lowIndex + highIndex) / 2 | 0;
                            if (BA[i].multiply(BA[midIndex]).lt(mid)) {
                                highIndex = midIndex;
                            } else {
                                lowIndex = midIndex;
                            }
                        }
                        count += neg - highIndex;
                    } else if (A[i] > 0) {
                        let lowIndex = i;
                        let highIndex = N;
                        while (highIndex - lowIndex > 1) {
                            let midIndex = (lowIndex + highIndex) / 2 | 0;
                            if (BA[i].multiply(BA[midIndex]).lt(mid)) {
                                lowIndex = midIndex;
                            } else {
                                highIndex = midIndex;
                            }
                        }
                        count += lowIndex - i; 
                    }
                }
            } else {
                count = NC;
            }
            if (count < K) {
                low = mid;
            } else {
                high = mid;
            }
        }
        return {answer: low};
    }
    parse(text: string) {
        const it = getSpaceIterator(text, val => parseInt(val));
        const N = it.next().value;
        const K = it.next().value;
        const A = new Array<number>(N);
        for (let i = 0; i < N; i++) {
            A[i] = it.next().value;
        }
        return {N, K, A};
    }
    print(output: Output) {
        console.log(output.answer.toString());
    }
} 
