export interface Runtime {
    name: string;

    readFile(path: string): Promise<string>;
    writeFile(path: string, data: string): Promise<void>;
    exists(path: string): Promise<boolean>;
    importModule(path: string): Promise<any>;

    listen(
        port: number,
        handler: (request: Request) => Promise<Response>
    ): unknown;
}