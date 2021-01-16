import React, { useState, useEffect } from 'react';
import axios from "./axios"
import requests from './request';
import "./Banner.css"

// Add .. to long text
function truncate(str, n) {
    return str?.length > n ? str.substr(0, n -1) + "..." : str
}
function Banner(props) {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals)
            const randomMovieBanner = request.data.results;
            const aRandomMovie = randomMovieBanner[
                Math.floor(Math.random() * randomMovieBanner.length)
            ]
            setMovie(aRandomMovie)
            return request
        }
        fetchData()
    }, [])

    console.log(movie)

    return (
        <header 
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition: "top",
            }}
        >
            <div className="banner_contents">
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My list</button>
                </div>
                <h1 className="banner_description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            <div className="banner_fadeBottom"></div>
        </header>
    );
}

export default Banner;