
import {SolverBase} from "shared/solve";

export type Input = {
    N: number[],
    K: number,
}

export type Output = {
    answer: number,
}

export class Solver extends SolverBase<Input, Output> {

    nCk(n: number, k: number) {
        if (n < k) {
            return 0;
        }
        if (k === 3) {
            return (((n*(n-1))/2)*(n-2))/3;
        } else if (k === 2) {
            return (n*(n-1))/2;
        } else if (k === 1) {
            return n;
        } else {
            return 1;
        }
    }

    solve({N, K}: Input): Output {
        let answer = 0;
        if (N.length < K) {
            return {answer};
        }

        let k = K;
        for (let i = 0; i < N.length && k > 0; i++) {
            if (N[i] === 0) {
                continue;
            }
            if (k > 0) {
                // when the digit is 0
                answer += this.nCk(N.length - i - 1, k) * Math.pow(9, k);
                // when the digit is not 0
                answer += (N[i] - 1) * this.nCk(N.length - i - 1, k - 1) * Math.pow(9, k - 1);
                k--;
            }
        }
        if (k === 0) {
            answer++; // add the number it self
        }
        return {answer};
    }
    parse(text: string) {
        const vals = text.split(/\s+/);
        const inputN = vals[0];
        const K = parseInt(vals[1]);

        const N = [];
        for (let i = 0; i < inputN.length; i++) {
            N.push(parseInt(inputN[i]));            
        }

        return {K, N};
    }
    print(output: Output) {
        console.log(output.answer);
    }
} 
