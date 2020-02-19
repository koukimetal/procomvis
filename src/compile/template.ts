import fs from "fs";
import {Solver} from "./dummy";

function execute(data: string) {
    const solver = new Solver();
    const input = solver.parse(data);
    const output = solver.solve(input);
    solver.print(output);
}

(() => {
    fs.readFile("/dev/stdin", "utf8", (err, data) => {
        execute(data);
    })
})();
