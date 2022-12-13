import React, { useEffect } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants';
import styled from 'styled-components';


export default function Album() {
    const [{ token, playlists}, dispatch] = useStateProvider();

    useEffect((albumId) => {
        const getAlbumData = async () => {
            const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                }
            });
            const { items } = response.data;
            const playlists = items.map(({ name, id }) => {
                return { name, id }
            })
        }
        getAlbumData();
    }, [token, dispatch])


    return (
        <Container>
            <ul>
            </ul>
        </Container>
    )
}

const Container = styled.div`
    height: 100%;
    overflow: hidden;
    ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        height: 90%;
        
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
            cursor: pointer;
            padding-left: 1rem;
            gap: 1rem;
            transition: 0.4s ease-in-out;
            font-size: 16px;
            &:hover{
                color: #AF9BBD;
            }
        }
    }
`