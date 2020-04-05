import React from "react";
import {ProblemTemplate} from "shared/template";
import { DebugForm } from "contest/utils/debug_form";
import {Solver as DSolver} from "./d/solve";
export default { title: 'atcoder.abc161' };

export const D = () => (
    <ProblemTemplate
        description="https://atcoder.jp/contests/abc161/tasks/abc161_d"
        submit="https://atcoder.jp/contests/abc155/submissions/10393304"
    >
        <DebugForm solver={new DSolver()} />
    </ProblemTemplate>
);

