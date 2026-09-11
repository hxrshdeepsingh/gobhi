import type { Runtime } from "../../types/runtime"
import { denoHandler } from "./handler/denoHandler";

export const DenoRuntime: Runtime = {
    name: "deno",

    async readFile(path: string): Promise<string> {
        return await Deno.readTextFile(path);
    },

    async writeFile(path: string, data: string): Promise<void> {
        await Deno.writeTextFile(path, data);
    },

    async exists(path: string): Promise<boolean> {
        try {
            await Deno.stat(path);
            return true;
        } catch {
            return false;
        }
    },

    async importModule(path: string) {
        return import(path);
    },

    listen(port: number, handler: (request: Request) => Promise<Response>) {
        return denoHandler(port, handler);
    },
};