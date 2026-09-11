import { readFile, writeFile, access } from "node:fs/promises";
import { nodeHandler } from "./handler/nodeHandler";
import type { Runtime } from "../../types/runtime";

export const NodeRuntime: Runtime = {
    name: "node",

    async readFile(path: string): Promise<string> {
        return readFile(path, "utf-8");
    },

    async writeFile(path: string, data: string) {
        await writeFile(path, data, "utf-8");
    },

    async exists(path: string): Promise<boolean> {
        try {
            await access(path);
            return true;
        } catch {
            return false;
        }
    },

    async importModule(path: string) {
        return import(path);
    },

    listen(port: number, handler: (request: Request) => Promise<Response>) {
        return nodeHandler(port, handler);
    }
};