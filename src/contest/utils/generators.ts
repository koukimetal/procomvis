
export function* getSpaceIterator<T>(input: string, parse: (val: string) => T) {
    for (const val of input.split(/\s+/).map(chunk => parse(chunk))) {
        yield val;
    }
    return undefined as unknown as T;
}