import React from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';

export default function Volume() {
    const [{ token }] = useStateProvider();
    const setVolume = async (e) => {
        await axios.put(
            `https://api.spotify.com/v1/me/player/volume`,
            {},
            {
                params: {
                    volume_percent: parseInt(e.target.value)
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
    }
    return (
        <Container>
            <input className='volumeSlider' type="range" min={0} max={100} onMouseUp={e => setVolume(e)} />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    margin-right: 4rem;
    justify-content: flex-end;
    align-content: center;
    input {
        width: 12rem;
        border-radius: 1rem;
        height: 0.5rem;
        -webkit-appearance: none;
        appearance: none;
        height: 0.7rem;
        background: #1F1B21;
        outline: none;
        opacity: 0.7; 
        -webkit-transition: .2s;
        transition: opacity .2s;
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 0.7rem;
            height: 0.7rem;
            background: #74667D;
            cursor: pointer;
            border-radius: 0.1rem;
        }
    }
`