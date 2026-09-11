import type { Runtime } from "../../types/runtime"
import { bunHandler } from "./handler/bunHandler"

export const BunRuntime: Runtime = {
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

    listen(port: number, handler: (request: Request) => Promise<Response>) {
        return bunHandler(port, handler)
    }
}