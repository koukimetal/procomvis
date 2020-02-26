import React from "react";
import {ProblemD} from './d/comp';
import {ProblemTemplate} from "shared/template";
import { DebugForm } from "contest/utils/debug_form";
import {Solver as ESolver} from "./e/solve";
export default { title: 'atcoder.abc154' };

export const D = () => (
    <ProblemTemplate
        description="https://atcoder.jp/contests/abc154/tasks/abc154_d"
        submit="https://atcoder.jp/contests/abc154/submissions/10211499"
    >
        <ProblemD />
    </ProblemTemplate>
);

export const E = () => (
    <ProblemTemplate
        description="https://atcoder.jp/contests/abc154/tasks/abc154_e"
        submit="https://atcoder.jp/contests/abc154/submissions/10229051"
    >
        <DebugForm solver={new ESolver()} />
    </ProblemTemplate>
)
