import React from "react";
import {ProblemTemplate} from "shared/template";
import { DebugForm } from "contest/utils/debug_form";
import {Solver as ASolver} from "./a/solve";
export default { title: 'gcj.2020q' };

export const A = () => (
    <ProblemTemplate
        description=""
        submit=""
    >
        <DebugForm solver={new ASolver()} />
    </ProblemTemplate>
);

