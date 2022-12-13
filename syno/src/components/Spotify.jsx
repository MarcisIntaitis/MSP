import React, { useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Body from './Body'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { useStateProvider } from '../utils/StateProvider'
import { reducerCases } from '../utils/Constants'
import Search from './Search'
import Album from './Album'

export default function Spotify() {
    const [{ token }, dispatch] = useStateProvider();
    useEffect(() => {
        const getUserInfo = async () => {
            const { data } = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                }
            });
            const userInfo = {
                userId: data.id,
                userName: data.display_name
            }
            dispatch({ type: reducerCases.SET_USER, userInfo });
        }
        getUserInfo();
    }, [token, dispatch])

    return (
        <Container>
            <div className="spotify_body">
                <Sidebar />
                <div className="body">
                    <Search />
                    <div className="body_contents">
                        <Body />
                        <Album />
                    </div>
                </div>
            </div>
            <div className="spotify_footer">
                <Footer />
            </div>
        </Container>
    )
}

const Container = styled.div`
    font-family: sans-serif;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: grid;
    grid-template-rows: 90vh 96.5px;
    .spotify_body {
        overflow-y: auto;
        display: grid;
        grid-template-columns: 15rem auto;
        height: 100%;
        width: 100%;
        background: linear-gradient(#1F1B21, #0C0A0D);
    }
    .body {
        height: 100%;
        width: 100%;
        overflow: auto;
        &::-webkit-scrollbar{
            width: 0.7rem;
            &-thumb{
                background-color: #1F1B21;
            }
        }
    }
`