
import {SolverBase} from "shared/solve";
import {getSpaceIterator} from "../../../utils/generators";
// Compile error for some reason :(
type Test = {
    N: number,
    MX: number[][],
}

export type Input = {
    T: number,
    Ts: Test[],
}

type Answer = {
    t: number,
    rs: number,
    cs: number,
    tr: number,
}

export type Output = {
    answers: Answer[],
}

export class Solver extends SolverBase<Input, Output> {

    innerSolve({N, MX}: Test) {
        let rs = 0, cs = 0, tr = 0;
        for (let r = 0; r < N; r++) {
            const count = new Array<boolean>(N + 1);
            for (let c = 0; c < N; c++) {
                if (count[MX[r][c]]) {
                    rs++;
                    break;
                } else {
                    count[MX[r][c]] = true;
                }
            }
        }
        for (let c = 0; c < N; c++) {
            const count = new Array<boolean>(N + 1);
            for (let r = 0; r < N; r++) {
                if (count[MX[r][c]]) {
                    cs++;
                    break;
                } else {
                    count[MX[r][c]] = true;
                }
            }
        }
        for (let i = 0; i < N; i++) {
            tr += MX[i][i];
        }
        return {tr, rs, cs};
    }

    solve({T, Ts}: Input): Output {
        const answers: Answer[] = [];
        for (let t = 0; t < T; t++) {
            const test = Ts[t];
            const {tr, rs, cs} = this.innerSolve(test);
            answers.push({tr, rs, cs, t: t+1});
        }
        return {answers};
    }
    parse(text: string) {
        const it = getSpaceIterator(text, val => parseInt(val));
        const T = it.next().value;
        const Ts: Test[] = [];
        for (let t = 0; t < T; t++) {
            const N = it.next().value;
            const MX: number[][] = [];
            for (let r = 0; r < N; r++) {
                const row: number[] = [];
                for (let c = 0; c < N; c++) {
                    row.push(it.next().value);
                }
                MX.push(row);
            }
            Ts.push({N, MX});
        }
        return {
            T, Ts,
        };
    }
    print(output: Output) {
        for (const ans of output.answers) {
            console.log(`Case #${ans.t}: ${ans.tr} ${ans.rs} ${ans.cs}`);
        }
    }
} 
