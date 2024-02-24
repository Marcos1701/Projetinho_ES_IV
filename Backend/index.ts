import * as docs from "./swagger.json";

Bun.serve({
    fetch: fetchApi,
    port: 3000
});

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Max-Age": "86400"
};

interface ResponseApi{
    by: string;
    valid_key: boolean;
    results: {
        temp: number;
        date: string;
        time: string;
        condition_code: string;
        description: string;
        currently: string;
        cid: string;
        city: string;
        img_id: string;
        humidity: number;
        cloudiness: number;
        rain: number;
        wind_speedy: string;
        wind_direction: number;
        wind_cardinal: string;
        sunrise: string;
        sunset: string;
        moon_phase: string;
        condition_slug: string;
        city_name: string;
        timezone: string;
        forecast: {
            date: string;
            weekday: string;
            max: number;
            min: number;
            cloudiness: number;
            rain: number;
            rain_probability: number;
            wind_speedy: string;
            description: string;
            condition: string;
        }[];
        cref: string;
    };
    execution_time: number;
    from_cache: boolean;
}

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
    if (url.pathname === "/") return new Response(`
    Seja Bem vindo a API! ;) 
    Para acessar a documentacao acesse /docs
    `, { headers: { "Content-Type": "text/plain" } });
    if (url.pathname === "/api") return await apiRequest(req);
    if (url.pathname === "/api/forecast") return await forecastRequest(req);
    if (url.pathname === "/api/current") return await currentRequest(req);
    if (url.pathname === "/api/sun") return await sunRequest(req);
    if (url.pathname === "/api/moon") return await moonRequest(req);
    if (url.pathname === "/api/city") return await cityRequest(req);
    if(url.pathname === "/docs"){
    
        return new Response(JSON.stringify(docs), {
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders
            }
        });
    }
    
    return new Response("Not found!", { status: 404 });
}

console.log("Server is running on http://localhost:3000");


// Especificando api e possíveis rotas
// A função Bun.serve() recebe um objeto com as seguintes propriedades:
// fetch: função que recebe um objeto Request e retorna um objeto Response.
// port: número da porta em que o servidor será iniciado.
// A função fetchApi() recebe um objeto Request e retorna um objeto Response. Ela é responsável por tratar as requisições e retornar as respostas adequadas. Neste caso, ela verifica se a rota é / ou /api e chama a função apiRequest() para tratar a requisição.
// A função apiRequest() recebe um objeto Request e retorna um objeto Response. Ela é responsável por fazer a requisição para a API externa e retornar a resposta para o cliente.
// O objeto ResponseApi é uma interface que representa o formato da resposta da API externa. Ela é utilizada para tipar a resposta da requisição para a API externa.
// O objeto corsHeaders é um objeto que contém os cabeçalhos necessários para habilitar o CORS. Ele é utilizado para adicionar os cabeçalhos à resposta da requisição para a API externa.
// O console.log() no final do arquivo imprime uma mensagem informando que o servidor está rodando na porta 3000.
// Possíveis rotas
// A rota / retorna uma mensagem de boas-vindas. => indica que o servidor está rodando.
// A rota /api faz uma requisição para a API externa e retorna a resposta. => retorna a resposta da API externa., mas poderia ser dividida nas rotas a seguir.
// A rota /api/forecast retorna a previsão do tempo para os próximos dias.
// A rota /api/current retorna a previsão do tempo atual.
// A rota /api/condition retorna a condição do tempo atual.
// A rota /api/sun retorna o horário do nascer e pôr do sol.
// A rota /api/moon retorna a fase da lua.
// A rota /api/city retorna informações sobre a cidade.


// função para /api/forecast
async function forecastRequest(req: Request): Promise<Response>
{
    const url = new URL(req.url);
    const apiKey = "45e3765d";
    const api = "https://api.hgbrasil.com/weather";
    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");
    if(!lat || !lon) return new Response("Latitude e longitude são obrigatórios!", { status: 400 });
    const apiUrl = `${api}?lat=${lat}&lon=${lon}&key=${apiKey}`;
    const data = await fetch(apiUrl, { method: "GET", headers: { "Content-Type": "application/json" }})
        .then(response => response.json())
        .then(data => data as ResponseApi);
    if(!data.results || !data.results.forecast) return new Response("Previsão do tempo não encontrada!", { status: 404 });
    const forecast = data.results.forecast;
    return new Response(
        JSON.stringify(forecast),
        {
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders
            }
        }
    );
}

// função para /api/current

async function currentRequest(req: Request): Promise<Response>
{
    const url = new URL(req.url);
    const apiKey = "45e3765d";
    const api = "https://api.hgbrasil.com/weather";
    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");
    if(!lat || !lon) return new Response("Latitude e longitude são obrigatórios!", { status: 400 });
    const apiUrl = `${api}?lat=${lat}&lon=${lon}&key=${apiKey}`;
    const data = await fetch(apiUrl, { method: "GET", headers: { "Content-Type": "application/json" }})
        .then(response => response.json())
        .then(data => data as ResponseApi);
    if(!data.results) return new Response("Previsão do tempo não encontrada!", { status: 404 });
    const current = {
        temp: data.results.temp,
        date: data.results.date,
        time: data.results.time,
        condition_code: data.results.condition_code,
        description: data.results.description,
        currently: data.results.currently,
        cid: data.results.cid,
        city: data.results.city,
        img_id: data.results.img_id,
        humidity: data.results.humidity,
        cloudiness: data.results.cloudiness,
        rain: data.results.rain,
        wind_speedy: data.results.wind_speedy,
        wind_direction: data.results.wind_direction,
        wind_cardinal: data.results.wind_cardinal,
        sunrise: data.results.sunrise,
        sunset: data.results.sunset,
        moon_phase: data.results.moon_phase,
        condition_slug: data.results.condition_slug,
        city_name: data.results.city_name,
        timezone: data.results.timezone
    };

    return new Response(
        JSON.stringify(current),
        {
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders
            }
        }
    );
}

// função para /api/sun

async function sunRequest(req: Request): Promise<Response>
{
    const url = new URL(req.url);
    const apiKey = "45e3765d";
    const api = "https://api.hgbrasil.com/weather";
    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");
    if(!lat || !lon) return new Response("Latitude e longitude são obrigatórios!", { status: 400 });
    const apiUrl = `${api}?lat=${lat}&lon=${lon}&key=${apiKey}`;
    const data = await fetch(apiUrl, { method: "GET", headers: { "Content-Type": "application/json" }})
        .then(response => response.json())
        .then(data => data as ResponseApi);
    if(!data.results) return new Response("Previsão do tempo não encontrada!", { status: 404 });

    const sun = {
        sunrise: data.results.sunrise, // nascer do sol
        sunset: data.results.sunset // pôr do sol
    };
    return new Response(
        JSON.stringify(sun),
        {
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders
            }
        }
    );
}

// função para /api/moon
async function moonRequest(req: Request): Promise<Response>
{
    const url = new URL(req.url);
    const apiKey = "45e3765d";
    const api = "https://api.hgbrasil.com/weather";
    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");
    if(!lat || !lon) return new Response("Latitude e longitude são obrigatórios!", { status: 400 });
    const apiUrl = `${api}?lat=${lat}&lon=${lon}&key=${apiKey}`;
    const data = await fetch(apiUrl, { method: "GET", headers: { "Content-Type": "application/json" }})
        .then(response => response.json())
        .then(data => data as ResponseApi);
    if(!data.results) return new Response("Previsão do tempo não encontrada!", { status: 404 });
    const moon = {
        moon_phase: data.results.moon_phase // fase da lua
    };
    return new Response(
        JSON.stringify(moon),
        {
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders
            }
        }
    );
}

// função para /api/city
async function cityRequest(req: Request): Promise<Response>
{
    const url = new URL(req.url);
    const apiKey = "45e3765d";
    const api = "https://api.hgbrasil.com/weather";
    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");
    if(!lat || !lon) return new Response("Latitude e longitude são obrigatórios!", { status: 400 });
    const apiUrl = `${api}?lat=${lat}&lon=${lon}&key=${apiKey}`;
    const data = await fetch(apiUrl, { method: "GET", headers: { "Content-Type": "application/json" }})
        .then(response => response.json())
        .then(data => data as ResponseApi);
    if(!data.results) return new Response("Previsão do tempo não encontrada!", { status: 404 });
    const city = {
        city: data.results.city,
        timezone: data.results.timezone
    };
    return new Response(
        JSON.stringify(city),
        {
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders
            }
        }
    );
}