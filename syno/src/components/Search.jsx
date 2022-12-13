import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios';
import { useStateProvider } from '../utils/StateProvider';
import Album from './Album';
import { reducerCases } from '../utils/Constants';

export default function Search() {
  const [searchInput, setSearchInput] = useState("")
  const [playlists, setPlaylist] = useState([])
  const [{token}, dispatch] = useStateProvider();
  
  async function search() {
    const playlistData = await axios.get(`https://api.spotify.com/v1/search?q=${searchInput}&type=playlist`,{
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
   setPlaylist(playlistData.data.playlists.items) 
  }
  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId })
  }
  return (
    <Container>
      <div className="search_bar">
        <FaSearch />
        <input type="text" placeholder='Search' onKeyDown={event => {if (event.key === "Enter") {search()}}} onChange={event => setSearchInput(event.target.value)}/>
      </div>
      <div>
        <ul className='searchResults'>
          {playlists?.map( (playlist, i) => {
            return (
              <li key={i} onClick={() => changeCurrentPlaylist(playlist.id)}><img src={playlist.images[0].url} alt="" />{playlist.name}</li>
            )
          })
          }
        </ul>
      </div>
    </Container>
  )
}

const Container = styled.div`
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  .search_bar {
    margin: 2rem 0 0 2rem;
    justify-content: space-between;
    align-items: center;
    top: 0;
    transition: 0.3s ease-in-out;
    background-color: none;
    color: rgba(31, 27, 33, 0.5);
    background-color: #74667D;
    width: 25rem;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      background-color: #74667D;
      font-size: 16px;
      border: none;
      height: 2rem;
      width: 100%;
      &:focus{
        outline: none;
      }
    }
    input::placeholder{
      -webkit-text-fill-color:rgba(31, 27, 33, 0.5);
    }
  }
  .searchResults {
    overflow-y: auto;
    height: auto;
    max-height: 10rem;
    color: #74667D;
    border-radius: 1rem;
    &::-webkit-scrollbar{
      width: 0.7rem;
      &-thumb{
          background-color: #1F1B21;
      }
    }
  }
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    width: 40rem;
    
    overflow-y: auto;
    &::-webkit-scrollbar{
        width: 0.7rem;
        &-thumb{
            background-color: #1F1B21;
        }
    }
    li {
        display: flex;
        font-family: sans-serif;
        justify-content: start;
        align-items: center;
        text-align: center;
        cursor: pointer;
        margin-left: 2rem;
        gap: 0.4rem;
        transition: 0.4s ease-in-out;
        font-size: 16px;
        &:hover{
            color: #AF9BBD;
        }
        img{
          width: 30px;
        }
    }
  }
`