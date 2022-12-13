import React from 'react'
import styled from "styled-components"

export default function Login() {
    const handleClick = () => {
        const clientId = 'f8382bbd6d9e4443bda6f340ab0e2334';
        const redirectUrl = 'http://localhost:3000/';
        const apiUrl = 'https://accounts.spotify.com/authorize';
        const scope = [
            'user-read-email',
            'user-read-private',
            'user-modify-playback-state',
            'user-read-playback-state',
            'user-read-currently-playing',
            'user-read-recently-played',
            'user-read-playback-position',
            'user-top-read'
        ]

        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(' ')}&response_type=token&show_daialog=true`;
    }

    return <Container>
        <img src='logo light.png'></img>
        <button onClick={handleClick}>Connect</button>
    </Container>
}

const Container = styled.div`
    overflow: auto;
    display: flex;
    padding: 0;
    margin: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #1F1B21;
    gap: 5rem;
    img {
        height: 15vw;
    }
    button {
        border: none;
        padding: 1rem 5rem;
        border-radius: 5rem;
        font-size: 1.4rem;
        font-weight: bold;
        background-color: #74667D;
        cursor: pointer;
    }
    body {
        padding: 0;
        margin: 0;
    }
`