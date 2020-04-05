import React from "react";
import {ProblemTemplate} from "shared/template";
import { DebugForm } from "contest/utils/debug_form";
import {Solver as AS} from "./a/solve";
import {Solver as BS} from "./b/solve";
export default { title: 'atcoder.update202004' };

export const A = () => (
    <ProblemTemplate
        description="https://atcoder.jp/contests/judge-update-202004/tasks/judge_update_202004_a"
        submit="https://atcoder.jp/contests/judge-update-202004/submissions/11587017"
    >
        <DebugForm solver={new AS()} />
    </ProblemTemplate>
);

export const B = () => (
    <ProblemTemplate
        description="https://atcoder.jp/contests/judge-update-202004/tasks/judge_update_202004_b"
        submit="https://atcoder.jp/contests/judge-update-202004/submissions/11589417"
    >
        <DebugForm solver={new BS()} />
    </ProblemTemplate>
);

