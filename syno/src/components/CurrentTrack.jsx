import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { reducerCases } from '../utils/Constants';
import { useStateProvider } from '../utils/StateProvider';

export default function CurrentTrack() {
    const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
    useEffect(() => {
        const getCurrentTrack = async () => {
            const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                }
            })
            if (response.data !== "") {
                const {item} = response.data
                const currentlyPlaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artist) => artist.name),
                    image: item.album.images[2].url
                }
                dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying})
            }
        }
        getCurrentTrack();
    }, [token, dispatch, currentlyPlaying])
    return (
        <Container>
            {currentlyPlaying && (
                <div className="track">
                    <div className="track_image">
                        <img src={currentlyPlaying.image} alt="Currently playing" />
                    </div>
                    <div className="track_info">
                        <h4>{currentlyPlaying.name}</h4>
                        <h6>{currentlyPlaying.artists.join(", ")}</h6>
                    </div>
                </div>
            )
            }
        </Container>
    )
}

const Container = styled.div`
    .track{
        color: white;
        display: flex;
        align-items: center;
        gap: 1rem;
        .track_image {
            img{
                height: 4rem;
            }
        }
    }
    .track_info {
        margin: 0;
        h4{
            margin: 0;
        }
        h6{
            margin: 0;
            color: #a1a0a0;
        }
    }
`