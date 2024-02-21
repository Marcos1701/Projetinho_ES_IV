Bun.serve({
    fetch: fetchApi,
    port: 3000
});

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Max-Age": "86400"
};

// api => https://api.hgbrasil.com/weather?lat=-23.682&lon=-46.875&key=45e3765d
// api key => 45e3765d

async function apiRequest(req: Request): Promise<Response>
{
    const url = new URL(req.url);
    const apiKey = "45e3765d";
    const api = "https://api.hgbrasil.com/weather";
    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");
    const apiUrl = `${api}?lat=${lat}&lon=${lon}&key=${apiKey}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    return new Response(
        JSON.stringify(data),
        {
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders
            }
        }
    );
}

async function fetchApi(req: Request): Promise<Response>
{
    const url = new URL(req.url);
    if (url.pathname === "/") return new Response("Seja Bem vindo a API!", { status: 200 });
    if (url.pathname === "/api") return await apiRequest(req);

    return new Response("Not found!", { status: 404 });
}

console.log("Server is running on http://localhost:3000");