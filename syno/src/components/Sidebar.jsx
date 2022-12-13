import React from 'react'
import styled from 'styled-components'
import Playlists from './Playlists'
import { useStateProvider } from '../utils/StateProvider'
import { CgProfile } from 'react-icons/cg'
import Search from './Search'

export default function Sidebar() {
    const [{ userInfo }] = useStateProvider();
    return (
        <Container>
            <div className="top_links" resizable='true'>
                <div className="logo">
                    <div className="img">
                        <img src="logo mid light.png" alt="SYNO logo" />
                    </div>
                </div>
                <div className="avatar">
                    <a href="#">
                        <CgProfile />
                        <span>{userInfo?.userName}</span>
                    </a>
                </div>
            </div>
            <Playlists />
        </Container>
    )
}

const Container = styled.div`
    background-color: #0C0A0D;
    overflow: auto;
    color: #74667D;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 15rem;
    &::-webkit-scrollbar{
            width: 0.7rem;
            &-thumb{
                background-color: #1F1B21;
            }
        }
    .top_links {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .logo {
            text-align: center;
            margin: 1rem 0;
            padding-top: 1rem;
            img {
                max-inline-size: 35%;
            }
        }
        .avatar {
            display: flex;
            width: 11rem;
            justify-content: center;
            align-items: center;
            background-color: #74667D;
            text-decoration: none;
            padding: .5rem;
            border-radius: 2rem;
            white-space: nowrap;
        }
        a {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color:rgba(31, 27, 33, 0.5);
            gap: 0.5rem;
            font-weight: bold;
            text-overflow: none;
            svg {
                font-size: 1.3rem;
            }
        }
    }
`