export async function GET(request: Request) {
  // Obtener el query de la URL
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  const apiKey = process.env.OMDB_API_KEY
  const urlMovie = 'https://www.omdbapi.com'
  
  try {
    const res = await fetch(`${urlMovie}?s=${query}&apikey=${apiKey}`)
    const data = await res.json()

    const serarch = data.Search.slice(0, 5)

    if (serarch.length === 0) {
      return Response.json({ error: 'No movies found' }, { status: 404 });
    }

    return Response.json(serarch, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Error fetching movies data' }, { status: 500 });
  }
}
