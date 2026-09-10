export async function executeServerCode(code: string, request: Request, params: any): Promise<Record<string, unknown>> {
    const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor

    const fn = new AsyncFunction("request", "params", code)

    const result = await fn(request, params)

    return result ?? {}
}