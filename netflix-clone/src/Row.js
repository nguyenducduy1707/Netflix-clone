import React, { useEffect, useState } from 'react';
import axios from "./axios" ;
import "./Row.css";
import Youtube from "react-youtube"
import movieTrailer from "movie-trailer"

const base_url = "https://image.tmdb.org/t/p/original/"
function Row(props) {
    const {title, fetchUrl, isLargeRow} = props ;
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("")
    useEffect(() => {
        // run once when the rows load : []
        async function fetchData() {
            const request = await axios.get(fetchUrl) ;
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.source || movie?.original_name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search) 
                setTrailerUrl(urlParams.get('v')) 
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className={"row_posters"}>
                {movies.map((movie) => {
                    return <img
                        key={`${base_url}${movie.id}`}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}
                        onClick={() => handleClick(movie)}
                        >
                    </img>
                })}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
        </div>
    );
}

export default Row;