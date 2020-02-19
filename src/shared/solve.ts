export abstract class SolverBase<Input, Output> {
    abstract parse(text: string): Input;
    abstract solve(input: Input): Output;
    abstract print(output: Output): void;
}