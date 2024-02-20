Bun.serve({
    fetch
});


function fetch(req: Request) {
    const url = new URL(req.url);
    const routes = {
        "/": "Home page!",
        "/blog": "Blog!",
    };
    if (url.pathname === "/") return new Response("Home page!");
    if (url.pathname === "/blog") return new Response("Blog!");
    return new Response(`Rotas disponíveis: ${Object.keys(routes).join(", ")}`);
}


console.log("Server is running on http://localhost:3000");