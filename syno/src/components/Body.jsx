import React, { useEffect } from 'react'
import styled from 'styled-components'
import { AiFillClockCircle } from 'react-icons/ai'
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

export default function Body() {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] = useStateProvider();

  const searchParams = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  }

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }
      })
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a") ? "" : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number
        }))
      }
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist })
    }
    getInitialPlaylist()
  }, [token, dispatch, selectedPlaylistId])
  const msToMin = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return (
      minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    )
  }
  const playTrack = async (id, name, artists, image, context_uri, track_number) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1
        },
        position_ms: 0
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 204) {
      const currentlyPlaying = {
        id, name, artists, image
      }
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying })
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true })
    } else dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true })
  }
return (
  <Container>
    {selectedPlaylist && (
      <>
        <div className="playlist">
          <div className="image">
            <img src={selectedPlaylist.image} alt="selectedPlaylist" />
          </div>
          <div className="details">
            <h1 className='title'>{selectedPlaylist.name}</h1>
            <p className='description'>{selectedPlaylist.description}</p>
          </div>
        </div>
        <div className="list">
          <div className="header_row">
            <div className="col">
              <span>Nr.</span>
            </div>
            <div className="col">
              <span>Title</span>
            </div>
            <div className="col">
              <span>Album</span>
            </div>
            <div className="col">
              <span><AiFillClockCircle /></span>
            </div>
          </div>
          <div className="tracks">
            {
              selectedPlaylist.tracks.map(({ id, name, artists, image, duration, album, context_uri, track_number }, index) => {
                return (
                  <div className="row" key={id} onClick={() => playTrack(id, name, artists, image, context_uri, track_number)}>
                    <div className="col">
                      <span>{index + 1}</span>
                    </div>
                    <div className="col detail">
                      <img src={image} alt="track" />
                      <div className="col info">
                        <span className='name'>{name}</span>
                        <span className='artists'>{artists}</span>
                      </div>
                    </div>
                    <div className="col">
                      <span>{album}</span>
                    </div>
                    <div className="col">
                      <span>{msToMin(duration)}</span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </>
    )
    }
  </Container>
)
}

const Container = styled.div`
  .playlist {
    border-radius: 3rem;
    background-color: #1F1B21;
    margin: 3rem;
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image{
      padding: 3rem;
      img{
        height: 15rem;
        border-radius: 1rem;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 24px;
      color: #74667D;
    }
  }

  .list {
    margin: 2rem;
    background: linear-gradient(#1F1B21, #0C0A0D);
    display: flex;
    flex-direction: column;
    border-radius: 2rem;
    .header_row {
      padding: 1rem 0 0 2.5rem;
      display: grid;
      grid-template-columns: 0.4fr 2fr 1.5fr 0.23fr;
      color: #74667D;
      font-size: 18px;
      font-weight: bold;
    }
  }

  .tracks {
    margin: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    .row {
      border-top: none;
      border-bottom: solid rgba(116, 102, 125, 0.1) 2px;
      color: white;
      display: grid;
      padding: 0.5rem 1rem;
      grid-template-columns: 0.3fr 6fr 4.5fr 0.3fr;
      &:last-child {
        border: none;
      }
      &:hover{
        color: rgba(255, 255, 255, 0.6);
      }
      .col{
        display: flex;
        align-items: center;
        cursor: pointer;
        img{
          height: 40px;
          border-radius: 0.1rem;
        }
      }
      .detail{
        display: flex;
        gap: 1.3rem;
        .info{
          align-items: start;
          display: flex;
          flex-direction: column;
          .artists{
            font-size: 12px;
            color: #a1a0a0;
          }
        }
      }
    }
  }
`