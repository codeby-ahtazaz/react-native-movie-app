import axios from "axios"

import { apiKey, apiReadAccessToken } from "../constants"

// endpoints
const serverURL = `https://api.themoviedb.org/3/`
const trendingMoviesEndpoint = `${serverURL}trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${serverURL}movie/top_rated?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${serverURL}movie/upcoming?api_key=${apiKey}`


// dynamic endpoints
const movieDetailEndpoint = id => `${serverURL}movie/${id}?api_key=${apiKey}`
const movieCreditEndpoint = id => `${serverURL}movie/${id}/credits?api_key=${apiKey}`
const movieSimilarEndpoint = id => `${serverURL}movie/${id}/similar?api_key=${apiKey}`

const personDetailsEndpoint = id => `${serverURL}person/${id}?api_key=${apiKey}`
const personMoviesEndpoint = id => `${serverURL}person/${id}/movie_credits?api_key=${apiKey}`

const searchMovieEndpoint = `${serverURL}search/movie?api_key=${apiKey}`


export const fallbackPersonImage = `https://content.presentermedia.com/content/clipart/00030000/30276/person_watching_movie_800_clr.png`
export const fallbackMoviePoster = `https://thumbs.dreamstime.com/b/mockup-outdoor-movie-theater-giant-screen-landscape-movie-poster-mockup-modern-cinema-hall-editorial-photography-341846948.jpg`

export const image500 = path => path? `https://image.tmdb.org/t/p/w500/${path}` : null
export const image342 = path => path? `https://image.tmdb.org/t/p/w342/${path}` : null
export const image185 = path => path? `https://image.tmdb.org/t/p/w185/${path}` : null

const apiCall = async (endpoint, params) => {

    const options = {
        method: 'GET',
        url: endpoint,
        params: params
    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error', error)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint)
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint)
}

export const fetchTopRatedMovies = () => {
     return apiCall(topRatedMoviesEndpoint)
}

export const fetchMovieDetails = (id) => {
     return apiCall(movieDetailEndpoint(id))
}

export const fetchMovieCredits = (id) => {
     return apiCall(movieCreditEndpoint(id))
}

export const fetchSimilarMovies = (id) => {
     return apiCall(movieSimilarEndpoint(id))
}

export const fetchPersonDetail = (id) => {
     return apiCall(personDetailsEndpoint(id))
}

export const fetchPersonMovies = (id) => {
     return apiCall(personMoviesEndpoint(id))
}

export const searchMovies = (params) => {
     return apiCall(searchMovieEndpoint, params)
}