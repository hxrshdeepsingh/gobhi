export const BunRuntime = {
    name: "bun",

    async readFile(path: string): Promise<string> {
        return Bun.file(path).text()
    },

    async writeFile(path: string, data: string) {
        await Bun.write(path, data)
    },

    async exists(path: string): Promise<boolean> {
        return Bun.file(path).exists()
    },

    async importModule(path: string) {
        return import(path)
    },

    async listen(port: number, handler: any) {
        return Bun.serve({
            port,
            fetch: handler,
        })
    }
}