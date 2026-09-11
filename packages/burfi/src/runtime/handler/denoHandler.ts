export function denoHandler(
    port: number,
    handler: (request: Request) => Promise<Response>
) {
    return Deno.serve(
        {
            port,
        },
        handler
    );
}