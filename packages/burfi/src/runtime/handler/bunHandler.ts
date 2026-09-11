export async function bunHandler(port: number, handler: any) {
    return Bun.serve({
        port,
        fetch: handler,
    })
}