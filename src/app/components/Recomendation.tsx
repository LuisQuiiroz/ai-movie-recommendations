'use client'

import React, { useEffect, useState } from "react";
import { Card } from "./Movie";
import { Movie, SearchMovie } from "../types/types";
import { useDebounce } from "../hooks/useDebounde";
import Loading from "../loading";

export function Recomendation () {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchMovie[]>([]);
  const [result, setResult] = useState<Movie[]>([]);
  const [isloading, setIsloading] = useState(false);
  const [search, setSearch] = useState('');

  const debouncedQuery = useDebounce(query, 500)

  // funcion para generar recomendaciones desde el formulario
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if(query.trim()) await handleRecomendations(query)
  } 

    // funcion para obtener recomendaciones
  const handleRecomendations = async (query: string) =>  {
    setIsloading(true)
    setQuery('')
    setSuggestions([])
    try {
      const response = await fetch('/api/recomendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query})
      })

      if (!response.ok) throw new Error('Error fetching recommendations');
  
      const moviesNamesArray: string = await response.json()
  
      const recomendations = await fetchMovies(moviesNamesArray.split(','))
      setSearch(query)
      setResult(recomendations)
      setIsloading(false)
    } catch (error) {
      console.log(error)
    }
  }

  // funcion para obtener movies
  const fetchMovies = async (moviesNames: string[]) => {
    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({moviesNames})
      })
  
      if (!response.ok) throw new Error('Error fetching movies');
  
      const movies: Movie[] = await response.json()
      return movies 
  
    } catch (error) {
      console.log(error)
      return []
    }
  }

  // useEffect para obtener sugerencias
  useEffect(() => {
    if(debouncedQuery.length == 0) setSuggestions([])
    if(debouncedQuery && debouncedQuery.trim()){
      fetch(`/api/search?query=${debouncedQuery}`)
      .then(res => res.json())
      .then(data => {
        setSuggestions(data)
      })
    }
  }, [debouncedQuery]);

  return (
    <div className="mt-8">
      <h1 className="flex justify-center text-yellow-400 text-3xl font-bold mx-auto mb-8 ">
        What are you looking for?
      </h1>
      <form className="max-w-md mx-auto" autoComplete="off" onSubmit={handleGenerate}>   
        <label htmlFor="film-search" className="mb-2 text-sm font-medium sr-only text-white">Search</label>
        <div className="flex">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              value={query}
              onChange={e => setQuery(e.target.value)}
              type="search" 
              id="film-search" 
              className="block w-full p-4 ps-10 text-sm text-white border border-gray-600 rounded-l-lg bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              placeholder="The last of us, Vikings..." 
              required
              autoFocus
            />
          </div>
          <button 
            type="submit" 
            className="text-black text-sm focus:outline-none bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-400 font-medium rounded-r-lg px-5 py-2 dark:focus:ring-yellow-900"
          >
            Generate
          </button>
        </div>
      </form>

      {/* Lista de sugerencias */}
      <div className="max-w-md mx-auto">
        {suggestions.length > 0 && (
          <ul className="bg-gray-800 border border-gray-600 rounded-lg mt-2">
            {suggestions.map(({Title, Year, imdbID, Type}) => (
              <li 
                key={imdbID}
                className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
                onClick={() => handleRecomendations(Title)}
              >
                {Title}  <span className="text-xs text-gray-400">{Year}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {
        isloading && <Loading/>
      }
      { // lista de recomendaciones
        result.length > 0 && (
        <>
          <h2 className="text-center text-lg md:text-4xl py-8 font-medium">Since you enjoyed <span className="text-yellow-400">{search}</span>, you might likes... </h2> 
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto justify-center'>
          {
            result.map(movie => movie.imdbID && movie.Poster != 'N/A' && movie.Plot != 'N/A' && (
              <Card key={movie.imdbID} movie={movie}/>
            ))
          }
          </div>
          </>
        )
      }
    </div>
  )
}