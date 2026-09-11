import { createServer } from "node:http";

export async function nodeHandler(port: number, handler: any) {
    const server = createServer(async (req, res) => {
        const response = await handler(
            new Request(`http://${req.headers.host}${req.url}`, {
                method: req.method,
                headers: req.headers as Record<string, string>,
            })
        );

        res.statusCode = response.status;

        response.headers.forEach((value: string, key: string) => {
            res.setHeader(key, value);
        });

        const body = await response.arrayBuffer();
        res.end(Buffer.from(body));
    });

    server.listen(port);
    return server;
}