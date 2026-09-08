import { renderGobhiFile } from "./render/render"
import { layoutWrapper } from "./template/layout"
import { getRouteFile, generateRoutes, loadRoutes } from "./routing/routing";


// -----------------------------------------

// routes project * gobhi
const projectRoot = process.cwd();
const gobhiRoot = `${import.meta.dir}/..`;
const config = await import(`${projectRoot}/gobhi.config.ts`);

// -----------------------------------------

// generate routes + load routes
await generateRoutes();
await loadRoutes();

// -----------------------------------------

const fetch = async (request: any) => {
    const url = new URL(request.url);

    if (url.pathname === "/htmx.js") {
        return new Response(
            Bun.file(`${gobhiRoot}/node_modules/htmx.org/dist/htmx.min.js`),
            {
                headers: {
                    "Content-Type": "application/javascript",
                },
            }
        );
    }
    if (url.pathname === "/alpine.js") {
        return new Response(
            Bun.file(`${gobhiRoot}/node_modules/alpinejs/dist/cdn.min.js`),
            {
                headers: {
                    "Content-Type": "application/javascript",
                },
            }
        );
    }
    if (
        url.pathname === "/favicon.ico" ||
        url.pathname.startsWith("/.well-known/")
    ) {
        return new Response(null, { status: 404 });
    }

    const { path, params } = await getRouteFile(url.pathname);
    const file = Bun.file(path);

    const html = await renderGobhiFile(path, request, params);
    const finalHtml = await layoutWrapper(html);

    if (await file.exists()) {
        return new Response(finalHtml, {
            headers: {
                "Content-Type": "text/html",
            },
        });
    }

    return new Response("404 - Page Not Found", {
        status: 404,
    });
}

config.default.runtime.listen(config.default.port, fetch);
console.log(`Gobhi running at http://localhost:${config.default.port}`);