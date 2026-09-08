export async function layoutWrapper(html: string) {
    const layout = Bun.file("./src/pages/layout.html");
    const layoutHtml = await layout.text();
    return layoutHtml.replace("{{children}}", html);
}