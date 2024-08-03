export async function POST(request: Request){
  const apiKey = process.env.OMDB_API_KEY
  const url = 'https://www.omdbapi.com'

  try {
    const { moviesNames } = await request.json()

    if(!Array.isArray(moviesNames)){
      return Response.json({error: 'movies names must be an array'}, { status: 400})
    }

    const requests = moviesNames.map(name => 
      fetch(`${url}?t=${encodeURIComponent(name)}&apikey=${apiKey}`)
    .then(response => response.json())
    )

    const results = await Promise.all(requests)
    
    return Response.json(results)
  } catch (error) {
    return Response.json({error: 'Error fetching movie data'}, {status: 500})
  }

}
