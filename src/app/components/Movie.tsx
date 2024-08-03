import Link from "next/link"
import { Movie } from "../types/types"

interface CardProps {
  movie: Movie
}

export function Card({ movie }: CardProps) {
  const { Title, Year, Released, Runtime, Genre, Plot, Poster, imdbID} = movie
  const genres = Genre.split(', ')
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg  bg-gray-800">
      <img className="w-full" src={Poster} alt={Title} loading="lazy"/>
      <div className="px-6 py-4">
        <Link href={`https://www.google.com/search?q=${encodeURIComponent(Title)}`} target="_blank" rel="noreferrer">
          <div className="flex gap-x-2 font-bold text-xl mb-2 text-yellow-400 hover:text-yellow-600">
            {Title}
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-external-link"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" /><path d="M11 13l9 -9" /><path d="M15 4h5v5" /></svg>
            </div>
          
        </Link>
          <p className="text-gray-500 font-bold text-base mb-2">
            {Year}
          </p>
          <p className="text-gray-300 text-base">
            {Plot}
          </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {
          genres.map( genre => (
            <span 
            key={genre}
            className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2 cursor-default"
            >#{genre}
            </span>
          ))
        }
      </div>
    </div>
  )
}
