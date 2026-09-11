import { glob } from 'tinyglobby';
import { match } from 'path-to-regexp';
import { runtime } from "../server";

let routes: any;
const pattern = /\[\s*(.*?)\s*\]/;

export async function generateRoutes() {
    const files = await glob("**/*.burfi", { cwd: "./src/pages" })

    const routes = [];

    for await (const file of files) {
        const name = file.replace("index.burfi", "");

        routes.push({
            name: name,
            path: file,
            dynamic: false,
            params: []
        });
    }

    routes.map((route) => {
        let cleanRouteName = route.name.match(pattern);

        route.path = route.path.replaceAll("\\", "/");
        route.path = `./src/pages/${route.path}`
        route.name = route.name.replaceAll("\\", "/");
        route.name = `/` + route.name;
        route.name = route.name.replaceAll("[", ":").replaceAll("]", "")
        if (route.name.endsWith("/")) route.name = route.name.slice(0, -1);
        if (route.name.includes("[")) {
            route.dynamic = true;
            route.params.push(cleanRouteName[1]);
        }
        if (route.name === "") route.name = "/";
    })

    await runtime.writeFile(".burfi/routes.manifest.json", JSON.stringify(routes, null, 2))
    return routes;
}

export async function loadRoutes() {
    const file = await runtime.readFile("./.burfi/routes.manifest.json");
    routes = JSON.parse(file)
    return routes;
}

export async function getRouteFile(pathname: string) {
    if (pathname.length > 1 && pathname.endsWith("/")) {
        pathname = pathname.slice(0, -1);
    }

    const normalRoute = getNormalRoute(pathname);

    if (normalRoute) {
        return normalRoute;
    }

    const dynamicRoute = getDynamicRoute(pathname);

    if (dynamicRoute) {
        return dynamicRoute;
    }

    return {
        path: "./src/pages/404/index.burfi",
        params: {}
    };
}

export function getNormalRoute(pathname: string) {

    const route = routes.find(
        (route: any) =>
            !route.dynamic &&
            route.name === pathname
    );

    if (!route) return null;

    return {
        path: route.path,
        params: route.params
    };
}

export function getDynamicRoute(pathname: string) {
    for (let i = 0; i < routes.length; i++) {
        const fn = match(routes[i].name);
        let result = fn(pathname)

        if (result) {
            return {
                path: routes[i].path,
                params: result.params
            }
        }

    }
    return null;
}

export function getResultByRoute(name: any) {
    return routes.find((route: any) => route.name === name);
}